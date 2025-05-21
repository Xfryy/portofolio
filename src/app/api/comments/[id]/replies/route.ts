// app/api/comments/[id]/replies/route.ts
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import dbConnect from '@/lib/mongodb';
import Comment from '@/models/Comment';
import Reply from '@/models/Reply';
import User from '@/models/User';

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

// GET all replies for a specific comment
export async function GET(req: Request, { params }: RouteParams) {
  try {
    const resolvedParams = await params;
    const { id } = resolvedParams;
    
    await dbConnect();
    
    const comment = await Comment.findById(id).populate('replies');
    
    if (!comment) {
      return NextResponse.json(
        { error: 'Comment not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(comment.replies, { status: 200 });
  } catch (error) {
    console.error('Error fetching replies:', error);
    return NextResponse.json(
      { error: 'Failed to fetch replies' },
      { status: 500 }
    );
  }
}

// POST a new reply to a comment
export async function POST(req: Request, { params }: RouteParams) {
  try {
    const resolvedParams = await params;
    const { id } = resolvedParams;
    const session = await getServerSession();
    
    // Check if user is authenticated
    if (!session || !session.user || !session.user.email) {
      return NextResponse.json(
        { error: 'You must be signed in to reply' },
        { status: 401 }
      );
    }
    
    // Get the content from request body
    const { content } = await req.json();
    
    if (!content || content.trim() === '') {
      return NextResponse.json(
        { error: 'Reply cannot be empty' },
        { status: 400 }
      );
    }
    
    await dbConnect();
    
    // Find the comment
    const comment = await Comment.findById(id);
    
    if (!comment) {
      return NextResponse.json(
        { error: 'Comment not found' },
        { status: 404 }
      );
    }
    
    // Find the user to get their username and image
    const user = await User.findOne({ email: session.user.email });
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    
    // Create a new reply
    const newReply = await Reply.create({
      content,
      userId: user._id,
      username: user.username,
      userImage: user.image || '/Default.jpg',
      commentId: comment._id
    });
    
    // Add the reply to the comment's replies array
    comment.replies.push(newReply._id);
    await comment.save();
    
    return NextResponse.json(newReply, { status: 201 });
  } catch (error) {
    console.error('Error creating reply:', error);
    return NextResponse.json(
      { error: 'Failed to create reply' },
      { status: 500 }
    );
  }
}