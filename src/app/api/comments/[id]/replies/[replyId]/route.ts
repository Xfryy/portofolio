// app/api/comments/[id]/replies/[replyId]/route.ts
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import dbConnect from '@/lib/mongodb';
import Reply from '@/models/Reply';
import User from '@/models/User';

interface RouteParams {
  params: Promise<{
    id: string;
    replyId: string;
  }>;
}

// PATCH to update a reply
export async function PATCH(req: Request, { params }: RouteParams) {
  try {
    const resolvedParams = await params;
    const { replyId } = resolvedParams;
    const { content } = await req.json();
    const session = await getServerSession();
    
    // Check if user is authenticated
    if (!session || !session.user || !session.user.email) {
      return NextResponse.json(
        { error: 'You must be signed in to update a reply' },
        { status: 401 }
      );
    }
    
    if (!content || content.trim() === '') {
      return NextResponse.json(
        { error: 'Reply cannot be empty' },
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
    
    // Find the reply
    const reply = await Reply.findById(replyId);
    
    if (!reply) {
      return NextResponse.json(
        { error: 'Reply not found' },
        { status: 404 }
      );
    }
    
    // Check if the user is the owner of the reply
    if (reply.userId.toString() !== user._id.toString()) {
      return NextResponse.json(
        { error: 'You are not authorized to update this reply' },
        { status: 403 }
      );
    }
    
    // Update the reply
    const updatedReply = await Reply.findByIdAndUpdate(
      replyId,
      { content, updatedAt: new Date() },
      { new: true }
    );
    
    return NextResponse.json(updatedReply, { status: 200 });
  } catch (error) {
    console.error('Error updating reply:', error);
    return NextResponse.json(
      { error: 'Failed to update reply' },
      { status: 500 }
    );
  }
}