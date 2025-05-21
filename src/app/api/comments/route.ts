// app/api/comments/route.ts
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import dbConnect from '@/lib/mongodb';
import Comment from '@/models/Comment';
import User from '@/models/User';
import '@/models/Reply';  
// Handler for GET requests - retrieves all comments with their replies
export async function GET() {
  try {
    await dbConnect();
      const comments = await Comment.find()
      .sort({ createdAt: -1 }) // Sort by newest first
      .populate({
        path: 'replies',
        model: 'Reply',
        select: 'content userId username userImage createdAt updatedAt'
      })
      .limit(100);
    
    return NextResponse.json(comments, { status: 200 });
  } catch (error) {
    console.error('Error fetching comments:', error);
    return NextResponse.json(
      { error: 'Failed to fetch comments' },
      { status: 500 }
    );
  }
}

// Handler for POST requests - creates a new comment
export async function POST(req: Request) {
  try {
    const session = await getServerSession();
    
    // Check if user is authenticated
    if (!session || !session.user || !session.user.email) {
      return NextResponse.json(
        { error: 'You must be signed in to comment' },
        { status: 401 }
      );
    }
    
    // Get the content from request body
    const { content } = await req.json();
    
    if (!content || content.trim() === '') {
      return NextResponse.json(
        { error: 'Comment cannot be empty' },
        { status: 400 }
      );
    }
    
    await dbConnect();
    
    // Find the user to get their username and image
    const user = await User.findOne({ email: session.user.email });
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    
    // Create a new comment
    const newComment = await Comment.create({
      content,
      userId: user._id,
      username: user.username,
      userImage: user.image || '/Default.jpg',
      replies: []
    });
    
    return NextResponse.json(newComment, { status: 201 });
  } catch (error) {
    console.error('Error creating comment:', error);
    return NextResponse.json(
      { error: 'Failed to create comment' },
      { status: 500 }
    );
  }
}