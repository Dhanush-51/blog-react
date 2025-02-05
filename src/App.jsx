import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HomePage from './components/HomePage';
import GenrePage from './components/GenrePage';
import BlogDetail from './components/BlogDetail';

const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [newBlog, setNewBlog] = useState({ title: '', author: '', date: '', image: '', content: '', genre: '' });

    useEffect(() => {
        const storedBlogs = JSON.parse(localStorage.getItem('blogs')) || [];
        if (storedBlogs.length === 0) {
            // Initialize with sample blogs if none exist
            const sampleBlogs = [
                { title: 'The Beauty of Art', author: 'Alice', date: '2023-01-01', image: 'https://via.placeholder.com/300', content: 'Art is a diverse range of human activities...', genre: 'art' },
                { title: 'Top 10 Music Albums', author: 'Bob', date: '2023-01-02', image: 'https://via.placeholder.com/300', content: 'Music has the power to evoke emotions...', genre: 'music' },
                // Add more sample blogs with lowercase genres
            ];
            localStorage.setItem('blogs', JSON.stringify(sampleBlogs));
            setBlogs(sampleBlogs);
        } else {
            setBlogs(storedBlogs);
        }
    }, []);

    const handleOpenBlogPopup = () => {
        setIsPopupOpen(true);
    };

    const handleCloseBlogPopup = () => {
        setIsPopupOpen(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewBlog({ ...newBlog, [name]: value });
    };

    const handleAddBlog = () => {
        const blogWithDate = { ...newBlog, date: new Date().toLocaleDateString(), genre: newBlog.genre.toLowerCase() }; // Normalize genre to lowercase
        const updatedBlogs = [...blogs, blogWithDate];
        setBlogs(updatedBlogs);
        localStorage.setItem('blogs', JSON.stringify(updatedBlogs));
        setNewBlog({ title: '', author: '', date: '', image: '', content: '', genre: '' });
        handleCloseBlogPopup();
    };

    return (
        <Router>
            <div className="flex h-screen bg-black text-white">
                <div className="w-64 bg-gray-900 p-4 flex flex-col justify-between">
                    <div>
                        <h1 className="text-xl font-bold">tumblr</h1>
                        <nav className="mt-6">
                            <ul>
                                <li className="py-2"><Link to="/" className="hover:text-gray-400">Home</Link></li>
                                <li className="py-2"><Link to="/activity" className="hover:text-gray-400">Activity</Link></li>
                                <li className="py-2"><Link to="/messages" className="hover:text-gray-400">Messages</Link></li>
                            </ul>
                        </nav>
                    </div>
                    <div>
                        <button className="w-full bg-blue-600 p-2 rounded-lg">Sign in</button>
                        <button className="w-full bg-blue-500 p-2 rounded-lg mt-2" onClick={handleOpenBlogPopup}>Add Blog</button>
                    </div>
                </div>

                <div className="flex-1 p-6 overflow-auto">
                    <Routes>
                        <Route path="/" element={<HomePage onOpenBlogPopup={handleOpenBlogPopup} />} />
                        <Route path="/genre/:genre" element={<GenrePage blogs={blogs} />} />
                        <Route path="/blog/:id" element={<BlogDetail />} />
                    </Routes>
                </div>

                {isPopupOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-gray-800 p-6 rounded-lg">
                            <h2 className="text-2xl font-bold">Add a Blog</h2>
                            <input type="text" name="title" placeholder="Title" value={newBlog.title} onChange={handleInputChange} className="mt-2 p-2 w-full bg-gray-700 rounded" />
                            <input type="text" name="author" placeholder="Author" value={newBlog.author} onChange={handleInputChange} className="mt-2 p-2 w-full bg-gray-700 rounded" />
                            <input type="text" name="image" placeholder="Image URL" value={newBlog.image} onChange={handleInputChange} className="mt-2 p-2 w-full bg-gray-700 rounded" />
                            <textarea name="content" placeholder="Content" value={newBlog.content} onChange={handleInputChange} className="mt-2 p-2 w-full bg-gray-700 rounded" rows="4"></textarea>
                            <input type="text" name="genre" placeholder="Genre" value={newBlog.genre} onChange={handleInputChange} className="mt-2 p-2 w-full bg-gray-700 rounded" />
                            <button onClick={handleAddBlog} className="mt-4 bg-blue-600 px-4 py-2 rounded-lg">Add Blog</button>
                            <button onClick={handleCloseBlogPopup} className="mt-2 bg-red-600 px-4 py-2 rounded-lg">Cancel</button>
                        </div>
                    </div>
                )}
            </div>
        </Router>
    );
};

export default App;