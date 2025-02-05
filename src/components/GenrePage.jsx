import React from 'react';
import { Link, useParams } from 'react-router-dom';

const GenrePage = ({ blogs, genreImages }) => {
    const { genre } = useParams();
    const filteredBlogs = blogs.filter(blog => blog.genre === genre);

    return (
        <div className="flex-1 p-6">
            <h2 className="text-2xl font-bold">{genre.charAt(0).toUpperCase() + genre.slice(1)} Blogs</h2>
            {filteredBlogs.length > 0 ? (
                <div className="grid grid-cols-3 gap-4 mt-6">
                    {filteredBlogs.map((blog, index) => (
                        <Link to={`/blog/${index}`} state={{ blog }} key={index}>
                            <div className='relative bg-gray-800 rounded-lg overflow-hidden h-80 flex items-center justify-center'>
                                <img 
                                    src={blog.image || genreImages[blog.genre]} 
                                    className='absolute inset-0 w-full h-full object-cover' 
                                    alt={blog.title} 
                                />
                                <div className='p-4 absolute bottom-0 bg-black bg-opacity-50 w-full text-center text-white font-bold'>
                                    {blog.title} <br />
                                    <span className="text-gray-300">Views: {localStorage.getItem(`views_${blog.title}`) || 0}</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="text-gray-400 mt-4">No blogs available in this genre.</div>
            )}
        </div>
    );
};

export default GenrePage;