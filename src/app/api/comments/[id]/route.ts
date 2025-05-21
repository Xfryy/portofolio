// app/api/comments/[id]/route.ts
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import dbConnect from '@/lib/mongodb';
import Comment from '@/models/Comment';
import User from '@/models/User';

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

// GET a specific comment
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
    
    return NextResponse.json(comment, { status: 200 });
  } catch (error) {
    console.error('Error fetching comment:', error);
    return NextResponse.json(
      { error: 'Failed to fetch comment' },
      { status: 500 }
    );
  }
}

// DELETE a comment
export async function DELETE(req: Request, { params }: RouteParams) {
  try {
    const resolvedParams = await params;
    const { id } = resolvedParams;
    const session = await getServerSession();
    
    // Check if user is authenticated
    if (!session || !session.user || !session.user.email) {
      return NextResponse.json(
        { error: 'You must be signed in to delete a comment' },
        { status: 401 }
      );
    }
    
    await dbConnect();
    
    // Find the user
    const user = await User.findOne({ email: session.user.email });
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    
    // Find the comment
    const comment = await Comment.findById(id);
    
    if (!comment) {
      return NextResponse.json(
        { error: 'Comment not found' },
        { status: 404 }
      );
    }
    
    // Check if the user is the owner of the comment
    if (comment.userId.toString() !== user._id.toString()) {
      return NextResponse.json(
        { error: 'You are not authorized to delete this comment' },
        { status: 403 }
      );
    }
    
    // Delete the comment and all its replies
    await Comment.findByIdAndDelete(id);
    
    return NextResponse.json(
      { message: 'Comment deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting comment:', error);
    return NextResponse.json(
      { error: 'Failed to delete comment' },
      { status: 500 }
    );
  }
}

// PATCH to update a comment
export async function PATCH(req: Request, { params }: RouteParams) {
  try {
    const resolvedParams = await params;
    const { id } = resolvedParams;
    const { content } = await req.json();
    const session = await getServerSession();
    
    // Check if user is authenticated
    if (!session || !session.user || !session.user.email) {
      return NextResponse.json(
        { error: 'You must be signed in to update a comment' },
        { status: 401 }
      );
    }
    
    if (!content || content.trim() === '') {
      return NextResponse.json(
        { error: 'Comment cannot be empty' },
        { status: 400 }
      );
    }
    
    await dbConnect();
    
    // Find the user
    const user = await User.findOne({ email: session.user.email });
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    
    // Find the comment
    const comment = await Comment.findById(id);
    
    if (!comment) {
      return NextResponse.json(
        { error: 'Comment not found' },
        { status: 404 }
      );
    }
    
    // Check if the user is the owner of the comment
    if (comment.userId.toString() !== user._id.toString()) {
      return NextResponse.json(
        { error: 'You are not authorized to update this comment' },
        { status: 403 }
      );
    }
    
    // Update the comment
    const updatedComment = await Comment.findByIdAndUpdate(
      id,
      { content, updatedAt: new Date() },
      { new: true }
    );
    
    return NextResponse.json(updatedComment, { status: 200 });
  } catch (error) {
    console.error('Error updating comment:', error);
    return NextResponse.json(
      { error: 'Failed to update comment' },
      { status: 500 }
    );
  }
}