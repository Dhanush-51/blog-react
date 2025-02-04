import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const BlogDetail = () => {
    const location = useLocation();
    const { blog } = location.state || { blog: null };
    const [comments, setComments] = useState('');
    const [storedComments, setStoredComments] = useState([]);
    const [showCommentPopup, setShowCommentPopup] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const [viewCount, setViewCount] = useState(0);

    useEffect(() => {
        if (blog) {
            // Load comments from local storage
            const savedComments = JSON.parse(localStorage.getItem(`comments_${blog.title}`)) || [];
            setStoredComments(savedComments);

            // Increment view count
            const currentViewCount = parseInt(localStorage.getItem(`views_${blog.title}`)) || 0;
            setViewCount(currentViewCount + 1);
            localStorage.setItem(`views_${blog.title}`, currentViewCount + 1);
        }
    }, [blog]);

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        const newComment = { text: comments, date: new Date().toLocaleDateString() };
        const updatedComments = [...storedComments, newComment];
        setStoredComments(updatedComments);
        localStorage.setItem(`comments_${blog.title}`, JSON.stringify(updatedComments));
        setComments('');
        setShowCommentPopup(false);
    };

    const handleLike = () => {
        setLikeCount(likeCount + 1);
    };

    if (!blog) {
        return <div>Blog not found!</div>;
    }

    return (
        <div className="flex-1 p-6 ">
            <div className="max-w-3xl mx-auto bg-gray-800 p-6 rounded-lg">
                <h2 className="text-3xl font-bold">{blog.title}</h2>
                <p className="text-gray-400 mt-2">By {blog.author} | Published on {blog.date}</p>
                <p className="text-gray-400 mt-2">Views: {viewCount}</p>
                <img src={blog.image} className="mt-4 rounded-lg" alt="Blog" />
                <p className="mt-4 text-gray-300">{blog.content}</p>

                {/* Like and Comment Section */}
                <div className="mt-6 flex justify-between items-center">
                    <div className="flex items-center">
                        <button onClick={handleLike} className="bg-blue-500 px-4 py-2 rounded-lg">Like</button>
                        <span className="ml-2 text-gray-300">{likeCount} Likes</span>
                    </div>
                    <button onClick={() => setShowCommentPopup(true)} className="bg-blue-500 px-4 py-2 rounded-lg">Comment</button>
                </div>

                {/* Comments Section */}
                <div className="mt-6">
                    <h3 className="text-xl font-bold">Comments</h3>
                    <div className="mt-4">
                        {storedComments.map((comment, index) => (
                            <div key={index} className="border-b border-gray-600 py-2">
                                <p className="text-gray-300">{comment.text}</p>
                                <p className="text-gray-500 text-sm">{comment.date}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Comment Popup */}
            {showCommentPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-gray-800 p-6 rounded-lg">
                        <h2 className="text-2xl font-bold">Add a Comment</h2>
                        <form onSubmit={handleCommentSubmit} className="mt-2">
                            <textarea
                                value={comments}
                                onChange={(e) => setComments(e.target.value)}
                                className="w-full p-2 bg-gray-700 rounded"
                                placeholder="Add a comment..."
                                rows="3"
                            ></textarea>
                            <button type="submit" className="mt-2 bg-blue-600 px-4 py-2 rounded-lg">Submit</button>
                            <button type="button" onClick={() => setShowCommentPopup(false)} className="mt-2 bg-red-600 px-4 py-2 rounded-lg">Cancel</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BlogDetail;