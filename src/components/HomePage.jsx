import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = ({ onOpenBlogPopup }) => {
    // Default genres
    const genres = [
        'Art',
        'Music',
        'Fashion',
        'Travel',
        'Food',
        'Technology',
        'Health',
        'Sports',
        'Books',
        'Movies',
        'Gaming',
        'Photography',
        'Science',
        'Lifestyle',
        'Education'
    ];

    return (
        <div className="flex-1 p-6">
            <h2 className="text-2xl font-bold">Genres</h2>
            <div className="grid grid-cols-3 gap-4 mt-6">
                {genres.length > 0 ? (
                    genres.map((genre, index) => (
                        <Link to={`/genre/${genre.toLowerCase()}`} key={index}>
                            <div className="bg-gray-800 p-4 rounded-lg text-center">
                                <h3 className="text-xl font-bold">{genre}</h3>
                            </div>
                        </Link>
                    ))
                ) : (
                    <div className="text-gray-400">No genres available</div>
                )}
            </div>
            <button onClick={onOpenBlogPopup} className="mt-6 bg-blue-600 px-4 py-2 rounded-lg">Add Blog</button>
        </div>
    );
};

export default HomePage;