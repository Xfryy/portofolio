"use client";

import { useState, useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface Reply {
  _id: string;
  content: string;
  userId: string;
  username: string;
  userImage: string;
  createdAt: string;
  updatedAt: string;
}

interface Comment {
  _id: string;
  content: string;
  userId: string;
  username: string;
  userImage: string;
  createdAt: string;
  updatedAt: string;
  replies?: Reply[];
}

export default function CommentSection() {
  const { data: session } = useSession();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [commentLoading, setCommentLoading] = useState(false);
  const [error, setError] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const replyInputRef = useRef<HTMLTextAreaElement>(null);
  const commentInputRef = useRef<HTMLTextAreaElement>(null);

  // Fetch comments
  useEffect(() => {
    fetchComments();
  }, []);

  // Focus effects for reply input
  useEffect(() => {
    if (replyingTo && replyInputRef.current) {
      replyInputRef.current.focus();
    }
  }, [replyingTo]);

  const fetchComments = async () => {
    try {
      setCommentLoading(true);
      const response = await fetch('/api/comments');
      if (!response.ok) throw new Error('Failed to fetch comments');
      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error('Error fetching comments:', error);
      setError('Failed to load comments. Please try again later.');
    } finally {
      setCommentLoading(false);
    }
  };

  // Post new comment
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) {
      setError('Please sign in to comment');
      return;
    }
    if (!newComment.trim()) return;

    setIsLoading(true);
    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: newComment }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Server error:', errorData);
        throw new Error(errorData.error || 'Failed to post comment');
      }

      const data = await response.json();
      setComments([data, ...comments]);
      setNewComment('');
      setError('');  // Clear any previous errors
    } catch (error) {
      console.error('Error posting comment:', error);
      setError('Failed to post comment. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Post reply to comment
  const handleReplySubmit = async (commentId: string) => {
    if (!session) {
      setError('Please sign in to reply');
      return;
    }
    if (!replyContent.trim()) return;

    setIsLoading(true);
    try {
      const response = await fetch(`/api/comments/${commentId}/replies`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: replyContent }),
      });

      if (!response.ok) throw new Error('Failed to post reply');

      const data = await response.json();
      
      setComments(comments.map(comment => 
        comment._id === commentId 
          ? { 
              ...comment, 
              replies: [...(comment.replies || []), data] 
            } 
          : comment
      ));
      
      setReplyContent('');
      setReplyingTo(null);
    } catch (error) {
      console.error('Error posting reply:', error);
      setError('Failed to post reply. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTimeAgo = (dateString: string) => {
    const now = new Date();
    const commentDate = new Date(dateString);
    const diffInSeconds = Math.floor((now.getTime() - commentDate.getTime()) / 1000);
    
    if (diffInSeconds < 60) {
      return 'just now';
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    } else if (diffInSeconds < 604800) {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days} ${days === 1 ? 'day' : 'days'} ago`;
    } else {
      return formatDate(dateString);
    }
  };

  const renderCommentActions = (comment: Comment) => {
    if (!session) return null;
    
    return (
      <div className="flex gap-3 mt-2 text-sm">
        <button
          onClick={() => setReplyingTo(comment._id)}
          className="flex items-center gap-1 text-blue-500 hover:text-blue-600 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
          </svg>
          Reply
        </button>
      </div>
    );
  };

  const renderReplyForm = (commentId: string) => {
    if (replyingTo !== commentId) return null;
    
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="mt-3 ml-12"
        >
          <div className="relative">
            <textarea
              ref={replyInputRef}
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              className="w-full p-3 rounded-lg border bg-transparent dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              placeholder="Write your reply..."
              rows={3}
            />
            <div className="absolute right-2 bottom-2 text-xs text-gray-400">
              {replyContent.length > 0 ? `${replyContent.length} characters` : ''}
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-2">
            <button
              onClick={() => setReplyingTo(null)}
              className="px-3 py-1 rounded-lg text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => handleReplySubmit(commentId)}
              disabled={isLoading || !replyContent.trim()}
              className="px-3 py-1 rounded-lg bg-blue-500 text-white hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? 'Posting...' : 'Post Reply'}
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    );
  };

  const renderReplies = (comment: Comment) => {
    if (!comment.replies || comment.replies.length === 0) return null;
    
    return (
      <div className="ml-12 mt-3 space-y-3">
        {comment.replies.map((reply: Reply) => (
          <motion.div
            key={reply._id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-3 rounded-lg border transition-all duration-300"
            style={{
              backgroundColor: 'var(--card-bg)',
              borderColor: 'var(--card-border)',
              color: 'var(--text-primary)',
            }}
          >
            <div className="flex items-center gap-2">
              <Image
                src={reply.userImage || '/Default.jpg'}
                alt={reply.username}
                width={24}
                height={24}
                className="rounded-full"
              />
              <span className="font-medium" style={{ color: 'var(--text-primary)' }}>{reply.username}</span>
              <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                {getTimeAgo(reply.createdAt)}
              </span>
            </div>
            <p className="mt-2 break-words" style={{ color: 'var(--text-secondary)' }}>{reply.content}</p>
          </motion.div>
        ))}
      </div>
    );
  };

  return (
    <div className="mb-16 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
        </svg>
        Comments
      </h2>
      
      {/* Comment Form */}
      <div className="mb-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <textarea
              ref={commentInputRef}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder={session ? "Write a comment..." : "Please sign in to comment"}
              disabled={!session || isLoading}
              className="w-full p-4 rounded-lg border bg-transparent dark:border-gray-700 focus:ring-2 focus:ring-blue-500 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
              rows={4}
            />
            <div className="absolute right-2 bottom-2 text-xs text-gray-400">
              {newComment.length > 0 ? `${newComment.length} characters` : ''}
            </div>
          </div>
          
          {error && (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 text-sm p-2 bg-red-50 dark:bg-red-900/20 rounded"
            >
              {error}
            </motion.p>
          )}
          
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isLoading || !newComment.trim() || !session}
              className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Posting...
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  Post Comment
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Comments List */}
      {commentLoading ? (
        <div className="flex justify-center items-center py-10">
          <svg className="animate-spin h-8 w-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      ) : comments.length === 0 ? (
        <div className="text-center py-10 text-gray-500 dark:text-gray-400 border-2 border-dashed rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto mb-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
          </svg>
          <p className="text-lg font-medium">No comments yet</p>
          <p>Be the first to share your thoughts!</p>
        </div>
      ) : (
        <div className="space-y-6">
          {comments.map((comment) => (
            <motion.div
              key={comment._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-lg border dark:border-gray-700 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-2">
                <Image
                  src={comment.userImage || '/Default.jpg'}
                  alt={comment.username}
                  width={36}
                  height={36}
                  className="rounded-full"
                />
                <div>
                  <span className="font-medium">{comment.username}</span>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <span>{getTimeAgo(comment.createdAt)}</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-3 break-words">
                {comment.content}
              </div>
              
              {renderCommentActions(comment)}
              {renderReplyForm(comment._id)}
              {renderReplies(comment)}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}