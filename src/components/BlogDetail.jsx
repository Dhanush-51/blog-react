import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Heart, Edit, Trash, MessageCircle } from 'lucide-react'; // Import Lucide icons

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
    const [isLiked, setIsLiked] = useState(false); // State to track if the blog is liked

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
        const newLikeCount = isLiked ? likeCount - 1 : likeCount + 1;
        setLikeCount(newLikeCount);
        setIsLiked(!isLiked); // Toggle the like state
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
        e.preventDefault();
        const newComment = { text: comments, date: new Date().toLocaleDateString() };
        const updatedComments = [...storedComments, newComment];
        setStoredComments(updatedComments);
        localStorage.setItem(`comments_${blog.title}`, JSON.stringify(updatedComments));
        setComments('');
        setShowCommentPopup(false);
    };

    if (!blog) {
        return <div>Blog not found!</div>;
    }

    return (
        <div className="flex-1 p-6 bg-white">
            <div className="max-w-3xl mx-auto bg-gray-100 p-6 rounded-lg"> 
                {isEditing ? (
                    <div>
                        <h2 className="text-3xl font-bold text-black">Edit Blog</h2> 
                        <input
                            type="text"
                            value={editedBlog.title}
                            onChange={(e) => setEditedBlog({ ...editedBlog, title: e.target.value })}
                            className="mt-2 p-2 w-full bg-gray-200 rounded" 
                        />
                        <textarea
                            value={editedBlog.content}
                            onChange={(e) => setEditedBlog({ ...editedBlog, content: e.target.value })}
                            className="mt-2 p-2 w-full bg-gray-200 rounded" 
                            rows="4"
                        />
                        <button onClick={handleSaveEdit} className="mt-4 bg-blue-600 px-4 py-2 rounded-lg">Save</button>
                        <button onClick={() => setIsEditing(false)} className="mt-4 bg-red-600 px-4 py-2 rounded-lg">Cancel</button>
                    </div>
                ) : (
                    <div>
                        <h2 className="text-3xl font-bold text-black">{editedBlog.title}</h2> 
                        <p className="text-gray-600 mt-2">By {editedBlog.author} | Published on {editedBlog.date}</p> 
                        <p className="text-gray-600 mt-2">Views: {viewCount}</p> 
                        <img src={editedBlog.image || genreImages[editedBlog.genre]} className="mt-4 rounded-lg w-full h-96 object-cover" alt="Blog" />
                        <p className="mt-4 text-gray-800">{editedBlog.content}</p> 
                        <div className="mt-6 flex justify-between items-center">
                            <div className="flex items-center">
                                <button onClick={handleLike} className="flex items-center">
                                    <Heart className={`mr-2 ${isLiked ? 'text-red-500' : 'text-gray-500'}`} />
                                    <span>{likeCount} Likes</span>
                                </button>
                            </div>
                            <div className="flex items-center">
                                <button onClick={handleEdit} className="px-4 py-2 rounded-lg">
                                    <Edit className="text-gray-500" />
                                </button>
                                <button onClick={handleDelete} className="px-4 py-2 rounded-lg ml-2">
                                    <Trash className="text-gray-500" />
                                </button>
                            </div>
                            <button onClick={() => setShowCommentPopup(!showCommentPopup)} className="px-4 py-2 rounded-lg">
                                <MessageCircle className="text-gray-500" />
                            </button>
                        </div>

                        {showCommentPopup && (
                            <div className="mt-4">
                                <h3 className="text-xl font-bold text-black">Add a Comment</h3> 
                                <form onSubmit={handleCommentSubmit} className="mt-2">
                                    <textarea
                                        value={comments}
                                        onChange={(e) => setComments(e.target.value)}
                                        className="w-full p-2 bg-gray-200 rounded" 
                                        placeholder="Add a comment..."
                                        rows="3"
                                    ></textarea>
                                    <button type="submit" className="mt-2 bg-blue-600 px-4 py-2 rounded-lg">Submit</button>
                                    <button type="button" onClick={() => setShowCommentPopup(false)} className="mt-2 bg-red-600 px-4 py-2 rounded-lg">Cancel</button>
                                </form>
                            </div>
                        )}

                        <div className="mt-6">
                            <h3 className="text-xl font-bold text-black">Comments</h3> 
                            <div className="mt-4">
                                {storedComments.map((comment, index) => (
                                    <div key={index} className="border-b border-gray-600 py-2">
                                        <p className="text-gray-800">{comment.text}</p> 
                                        <p className="text-gray-500 text-sm">{comment.date}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BlogDetail;