import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = ({ blogs, genreImages, onOpenBlogPopup }) => {
    const genres = Object.keys(genreImages);

    return (
        <div className="flex-1 p-6">
            <h2 className="text-2xl font-bold">Genres</h2>
            <div className="grid grid-cols-3 gap-4 mt-6">
                {genres.length > 0 ? (
                    genres.map((genre, index) => (
                        <Link to={`/genre/${genre}`} key={index}>
                            <div className="bg-gray-800 rounded-lg text-center">
                                <img src={genreImages[genre]} alt={genre} className="w-full h-48 object-cover rounded-t-lg" />
                                <h3 className="text-xl font-bold p-4">{genre.charAt(0).toUpperCase() + genre.slice(1)}</h3>
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