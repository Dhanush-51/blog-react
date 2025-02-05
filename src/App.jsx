import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HomePage from './components/HomePage';
import GenrePage from './components/GenrePage';
import BlogDetail from './components/BlogDetail';

const genreImages = {
    art: 'https://wallpapercave.com/wp/wp1900664.jpg',
    music: 'https://th.bing.com/th/id/OIP.eiXeespppHc5FOMbMuyqfQHaE8?w=252&h=180&c=7&r=0&o=5&pid=1.7',
    fashion: 'https://th.bing.com/th/id/OIP.Vv84JLMExs70720WvWEKyQHaEK?w=299&h=180&c=7&r=0&o=5&pid=1.7',
    travel: 'https://th.bing.com/th/id/OIP.oXWAkddSP1tgfUb82vaz6gHaEK?w=305&h=180&c=7&r=0&o=5&pid=1.7',
    food: 'https://th.bing.com/th/id/OIP.MMtOF9wWJhowGcUwb8r5YgHaEK?w=289&h=180&c=7&r=0&o=5&pid=1.7',
    technology: 'https://th.bing.com/th/id/OIP.89uvk8TA6-reQ7koKTfAwwHaEX?w=275&h=180&c=7&r=0&o=5&pid=1.7',
    health: 'https://th.bing.com/th/id/OIP.PJBJPKGY-8bRfgIWHuqdIAHaER?w=312&h=180&c=7&r=0&o=5&pid=1.7',
    sports: 'https://th.bing.com/th/id/OIP.M2PHtZFpR7B3Rsu32I7ICAHaFW?w=247&h=180&c=7&r=0&o=5&pid=1.7',
    books: 'https://th.bing.com/th/id/OIP.XHxHkV3iucoWMdUIxacQcwHaFJ?w=264&h=184&c=7&r=0&o=5&pid=1.7',
    movies: 'https://th.bing.com/th/id/OIP.W0Mc5XM9FVPTt78O_BFBLgHaFP?w=235&h=180&c=7&r=0&o=5&pid=1.7',
    gaming: 'https://th.bing.com/th/id/OIP.0_MWMMvpJf623d_ee5gB8QHaEK?w=332&h=187&c=7&r=0&o=5&pid=1.7',
    photography: 'https://th.bing.com/th/id/OIP.S16MwWFznloeMQVbOE-bugHaEp?w=248&h=180&c=7&r=0&o=5&pid=1.7',
    science: 'https://th.bing.com/th/id/OIP.dvtHbZ-MngXgh3Ei9Mx71QHaE8?w=275&h=184&c=7&r=0&o=5&pid=1.7',
    lifestyle: 'https://th.bing.com/th/id/OIP.odJW0tWjazqbkaIMp-gnYQHaEc?w=307&h=184&c=7&r=0&o=5&pid=1.7',
    education: 'https://th.bing.com/th/id/OIP.wKd9PXo89gKPZMprR9FRqAHaE8?w=257&h=180&c=7&r=0&o=5&pid=1.7',
};

const genres = Object.keys(genreImages); 

const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [newBlog, setNewBlog] = useState({ title: '', author: '', date: '', image: '', content: '', genre: '' });

    useEffect(() => {
        const storedBlogs = JSON.parse(localStorage.getItem('blogs')) || [];
        setBlogs(storedBlogs);
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
        const blogWithDate = { ...newBlog, date: new Date().toLocaleDateString(), genre: newBlog.genre.toLowerCase() };
        const updatedBlogs = [...blogs, blogWithDate];
        setBlogs(updatedBlogs);
        localStorage.setItem('blogs', JSON.stringify(updatedBlogs));
        setNewBlog({ title: '', author: '', date: '', image: '', content: '', genre: '' });
        handleCloseBlogPopup();
    };

    const updateBlog = (updatedBlog) => {
        const updatedBlogs = blogs.map(blog => (blog.title === updatedBlog.title ? updatedBlog : blog));
        setBlogs(updatedBlogs);
        localStorage.setItem('blogs', JSON.stringify(updatedBlogs));
    };

    const deleteBlog = (blogTitle) => {
        const updatedBlogs = blogs.filter(blog => blog.title !== blogTitle);
        setBlogs(updatedBlogs);
        localStorage.setItem('blogs', JSON.stringify(updatedBlogs));
    };

    return (
        <Router>
            <div className="flex h-screen bg-white ">
                <div className="w-64 bg-gray-900 p-4 flex flex-col justify-between text-white">
                    <div>
                        <h1 className="text-2xl font-bold pl-4 pt-4">T R U E B L O G</h1>
                        <nav className="mt-6">
                            <ul>
                                <li className="py-2 pl-4 mt-2 text-xl"><Link to="/" className="hover:text-gray-400">Home</Link></li>
                                <li className="py-2 pl-4 mt-2 text-xl"><Link to="/activity" className="hover:text-gray-400">Activity</Link></li>
                                <li className="py-2 pl-4 mt-2 text-xl"><Link to="/messages" className="hover:text-gray-400">Messages</Link></li>
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
                        <Route path="/" element={<HomePage blogs={blogs} genreImages={genreImages} onOpenBlogPopup={handleOpenBlogPopup} />} />
                        <Route path="/genre/:genre" element={<GenrePage blogs={blogs} genreImages={genreImages} />} />
                        <Route path="/blog/:id" element={<BlogDetail blogs={blogs} updateBlog={updateBlog} deleteBlog={deleteBlog} genreImages={genreImages} />} />
                    </Routes>
                </div>

                {isPopupOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-transparent bg-opacity-50">
                        <div className="bg-[#BFBEC6] p-6 rounded-lg">
                            <h2 className="text-2xl text-black font-bold">Add a Blog</h2>
                            <input type="text" name="title" placeholder="Title" value={newBlog.title} onChange={handleInputChange} className="mt-2 p-2 w-full bg-gray-700 rounded" />
                            <input type="text" name="author" placeholder="Author" value={newBlog.author} onChange={handleInputChange} className="mt-2 p-2 w-full bg-gray-700 rounded" />
                            <input type="text" name="image" placeholder="Image URL" value={newBlog.image} onChange={handleInputChange} className="mt-2 p-2 w-full bg-gray-700 rounded" />
                            <textarea name="content" placeholder="Content" value={newBlog.content} onChange={handleInputChange} className="mt-2 p-2 w-full bg-gray-700 rounded" rows="4"></textarea>
                            
                            <select 
                                name="genre" 
                                value={newBlog.genre} 
                                onChange={handleInputChange} 
                                className="mt-2 p-2 w-full bg-gray-700 rounded"
                            >
                                <option value="">Select Genre</option>
                                {genres.map((genre, index) => (
                                    <option key={index} value={genre}>{genre.charAt(0).toUpperCase() + genre.slice(1)}</option>
                                ))}
                            </select>

                            <button onClick={handleAddBlog} className="mt-4 bg-blue-600 px-4 py-2 rounded-lg mr-5">Add Blog</button>
                            <button onClick={handleCloseBlogPopup} className="mt-2 bg-blue-600 px-4 py-2 rounded-lg">Cancel</button>
                        </div>
                    </div>
                )}
            </div>
        </Router>
    );
};

export default App;

