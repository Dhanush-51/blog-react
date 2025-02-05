import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const BlogDetail = ({ blogs, updateBlog, deleteBlog, genreImages }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const blog = location.state?.blog; // Get the blog from the state

    const [comments, setComments] = useState('');
    const [storedComments, setStoredComments] = useState([]);
    const [showCommentPopup, setShowCommentPopup] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const [viewCount, setViewCount] = useState(0);
    const [isEditing, setIsEditing] = useState(false);
    const [editedBlog, setEditedBlog] = useState({ ...blog }); // Initialize with a copy of the blog

    useEffect(() => {
        if (blog) {
            const savedComments = JSON.parse(localStorage.getItem(`comments_${blog.title}`)) || [];
            setStoredComments(savedComments);
            const currentViewCount = parseInt(localStorage.getItem(`views_${blog.title}`)) || 0;
            setViewCount(currentViewCount + 1);
            localStorage.setItem(`views_${blog.title}`, currentViewCount + 1);

            const savedLikeCount = parseInt(localStorage.getItem(`likes_${blog.title}`)) || 0;
            setLikeCount(savedLikeCount);
        }
    }, [blog]);

    const handleLike = () => {
        const newLikeCount = likeCount + 1;
        setLikeCount(newLikeCount);
        localStorage.setItem(`likes_${blog.title}`, newLikeCount);
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleDelete = () => {
        deleteBlog(blog.title);
        navigate('/');
    };

    const handleSaveEdit = () => {
        updateBlog(editedBlog);
        setIsEditing(false);
    };

    const handleCommentSubmit = (e) => {
        e.preventDefault(); // Prevent the default form submission
        const newComment = { text: comments, date: new Date().toLocaleDateString() };
        const updatedComments = [...storedComments, newComment];
        setStoredComments(updatedComments);
        localStorage.setItem(`comments_${blog.title}`, JSON.stringify(updatedComments)); // Save comments to local storage
        setComments(''); // Clear the comment input
        setShowCommentPopup(false); // Close the comment popup
    };

    if (!blog) {
        return <div>Blog not found!</div>;
    }

    return (
        <div className="flex-1 p-6">
            <div className="max-w-3xl mx-auto bg-gray-800 p-6 rounded-lg">
                {isEditing ? (
                    <div>
                        <h2 className="text-3xl font-bold">Edit Blog</h2>
                        <input
                            type="text"
                            value={editedBlog.title}
                            onChange={(e) => setEditedBlog({ ...editedBlog, title: e.target.value })}
                            className="mt-2 p-2 w-full bg-gray-700 rounded"
                        />
                        <textarea
                            value={editedBlog.content}
                            onChange={(e) => setEditedBlog({ ...editedBlog, content: e.target.value })}
                            className="mt-2 p-2 w-full bg-gray-700 rounded"
                            rows="4"
                        />
                        <button onClick={handleSaveEdit} className="mt-4 bg-blue-600 px-4 py-2 rounded-lg">Save</button>
                        <button onClick={() => setIsEditing(false)} className="mt-4 bg-red-600 px-4 py-2 rounded-lg">Cancel</button>
                    </div>
                ) : (
                    <div>
                        <h2 className="text-3xl font-bold">{editedBlog.title}</h2> {/* Use editedBlog for immediate update */}
                        <p className="text-gray-400 mt-2">By {editedBlog.author} | Published on {editedBlog.date}</p>
                        <p className="text-gray-400 mt-2">Views: {viewCount}</p>
                        <img src={editedBlog.image || genreImages[editedBlog.genre]} className="mt-4 rounded-lg w-full h-96 object-cover" alt="Blog" />
                        <p className="mt-4 text-gray-300">{editedBlog.content}</p> {/* Use editedBlog for immediate update */}
                        <div className="mt-6 flex justify-between items-center">
                            <div className="flex items-center">
                                <button onClick={handleLike} className="bg-blue-500 px-4 py-2 rounded-lg">Like</button>
                                <span className="ml-2 text-gray-300">{likeCount} Likes</span>
                            </div>
                            <div>
                                <button onClick={handleEdit} className="bg-yellow-500 px-4 py-2 rounded-lg">Edit</button>
                                <button onClick={handleDelete} className="bg-red-500 px-4 py-2 rounded-lg ml-2">Delete</button>
                            </div>
                            <button onClick={() => setShowCommentPopup(true)} className="bg-blue-500 px-4 py-2 rounded-lg">Comment</button>
                        </div>

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
                )}
            </div>

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