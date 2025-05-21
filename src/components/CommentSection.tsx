"use client";

import { useState, useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
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
  const [error, setError] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [editingComment, setEditingComment] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');
  const replyInputRef = useRef<HTMLTextAreaElement>(null);
  const editInputRef = useRef<HTMLTextAreaElement>(null);

  // Fetch comments
  useEffect(() => {
    fetchComments();
  }, []);

  // Focus effects for reply and edit inputs
  useEffect(() => {
    if (replyingTo && replyInputRef.current) {
      replyInputRef.current.focus();
    }
  }, [replyingTo]);

  useEffect(() => {
    if (editingComment && editInputRef.current) {
      editInputRef.current.focus();
    }
  }, [editingComment]);

  const fetchComments = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/comments');
      if (!response.ok) throw new Error('Failed to fetch comments');
      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error('Error fetching comments:', error);
      setError('Failed to load comments. Please try again later.');
    } finally {
      setIsLoading(false);
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
      console.log('Attempting to post comment...');  // Debug log
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: newComment }),
      });
      
      console.log('Response status:', response.status);  // Debug log
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Server error:', errorData);  // Debug log
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

  // Update comment
  const handleUpdateComment = async (commentId: string) => {
    if (!editContent.trim()) return;

    setIsLoading(true);
    try {
      const response = await fetch(`/api/comments/${commentId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: editContent }),
      });

      if (!response.ok) throw new Error('Failed to update comment');

      const data = await response.json();
      
      setComments(comments.map(comment => 
        comment._id === commentId ? { ...comment, ...data } : comment
      ));
      
      setEditContent('');
      setEditingComment(null);
    } catch (error) {
      console.error('Error updating comment:', error);
      setError('Failed to update comment. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Delete comment
  const handleDelete = async (commentId: string) => {
    if (!window.confirm('Are you sure you want to delete this comment?')) {
      return;
    }
    
    try {
      const response = await fetch(`/api/comments/${commentId}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete comment');

      setComments(comments.filter(comment => comment._id !== commentId));
    } catch (error) {
      console.error('Error deleting comment:', error);
      setError('Failed to delete comment. Please try again.');
    }
  };

  // Delete reply
  const handleDeleteReply = async (commentId: string, replyId: string) => {
    if (!window.confirm('Are you sure you want to delete this reply?')) {
      return;
    }
    
    try {
      const response = await fetch(`/api/comments/${commentId}/replies/${replyId}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete reply');

      setComments(comments.map(comment => 
        comment._id === commentId 
          ? { 
              ...comment, 
              replies: (comment.replies || []).filter(reply => reply._id !== replyId) 
            } 
          : comment
      ));
    } catch (error) {
      console.error('Error deleting reply:', error);
      setError('Failed to delete reply. Please try again.');
    }
  };

  const startEditing = (comment: Comment) => {
    setEditingComment(comment._id);
    setEditContent(comment.content);
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

  const renderCommentActions = (comment: Comment) => {
    if (!session) return null;
    
    return (
      <div className="flex gap-3 mt-2 text-sm">
        <button
          onClick={() => setReplyingTo(comment._id)}
          className="text-blue-500 hover:text-blue-600 transition-colors"
        >
          Reply
        </button>
        
        {session?.user?.email === comment.userId && (
          <>
            <button
              onClick={() => startEditing(comment)}
              className="text-green-500 hover:text-green-600 transition-colors"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(comment._id)}
              className="text-red-500 hover:text-red-600 transition-colors"
            >
              Delete
            </button>
          </>
        )}
      </div>
    );
  };

  const renderReplyForm = (commentId: string) => {
    if (replyingTo !== commentId) return null;
    
    return (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="mt-3 ml-12"
      >
        <textarea
          ref={replyInputRef}
          value={replyContent}
          onChange={(e) => setReplyContent(e.target.value)}
          className="w-full p-2 rounded-lg border bg-transparent dark:border-gray-700 focus:ring-2 focus:ring-blue-500 transition-colors"
          placeholder="Write your reply..."
          rows={3}
        />
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
    );
  };

  const renderEditForm = (comment: Comment) => {
    if (editingComment !== comment._id) return null;
    
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mt-2"
      >
        <textarea
          ref={editInputRef}
          value={editContent}
          onChange={(e) => setEditContent(e.target.value)}
          className="w-full p-2 rounded-lg border bg-transparent dark:border-gray-700 focus:ring-2 focus:ring-blue-500 transition-colors"
          rows={3}
        />
        <div className="flex justify-end gap-2 mt-2">
          <button
            onClick={() => {
              setEditingComment(null);
              setEditContent('');
            }}
            className="px-3 py-1 rounded-lg text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => handleUpdateComment(comment._id)}
            disabled={isLoading || !editContent.trim()}
            className="px-3 py-1 rounded-lg bg-green-500 text-white hover:bg-green-600 disabled:bg-green-300 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </motion.div>
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
            className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800"
          >
            <div className="flex items-center gap-2">
              <Image
                src={reply.userImage || '/Default.jpg'}
                alt={reply.username}
                width={24}
                height={24}
                className="rounded-full"
              />
              <span className="font-medium">{reply.username}</span>
              <span className="text-sm text-gray-500">
                {formatDate(reply.createdAt)}
              </span>
            </div>
            <p className="mt-2">{reply.content}</p>
            {session?.user?.email === reply.userId && (
              <div className="flex gap-3 mt-2 text-sm">
                <button
                  onClick={() => handleDeleteReply(comment._id, reply._id)}
                  className="text-red-500 hover:text-red-600 transition-colors"
                >
                  Delete
                </button>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    );
  };

  return (
    <div className="mb-16">
      <h2 className="text-2xl font-bold mb-6">Comments</h2>
      
      {/* Comment Form */}
      <div className="mb-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder={session ? "Write a comment..." : "Please sign in to comment"}
            disabled={!session || isLoading}
            className="w-full p-3 rounded-lg border bg-transparent dark:border-gray-700 focus:ring-2 focus:ring-blue-500 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
            rows={4}
          />
          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isLoading || !newComment.trim() || !session}
              className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? 'Posting...' : 'Post Comment'}
            </button>
          </div>
        </form>
      </div>

      {/* Comments List */}
      <div className="space-y-6">
        {comments.map((comment) => (
          <motion.div
            key={comment._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-lg border dark:border-gray-700"
          >
            <div className="flex items-center gap-2">
              <Image
                src={comment.userImage || '/Default.jpg'}
                alt={comment.username}
                width={32}
                height={32}
                className="rounded-full"
              />
              <span className="font-medium">{comment.username}</span>
              <span className="text-sm text-gray-500">
                {formatDate(comment.createdAt)}
              </span>
              {comment.updatedAt !== comment.createdAt && (
                <span className="text-xs text-gray-500">(edited)</span>
              )}
            </div>
            
            {editingComment === comment._id ? (
              renderEditForm(comment)
            ) : (
              <p className="mt-2">{comment.content}</p>
            )}
            
            {renderCommentActions(comment)}
            {renderReplyForm(comment._id)}
            {renderReplies(comment)}
          </motion.div>
        ))}
      </div>
    </div>
  );
}