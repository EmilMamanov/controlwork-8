import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const Header: React.FC = () => {
    const categories = [
        { title: 'All quotes', id: '' },
        { title: 'Star Wars', id: 'star-wars' },
        { title: 'Famous people', id: 'famous-people' },
        { title: 'Naruto', id: 'naruto' },
        { title: 'Saying', id: 'saying' },
        { title: 'Humour', id: 'humour' },
        { title: 'Motivational', id: 'motivational' },
    ];

    return (
        <header className="header">
            <Link to="/">Home</Link>
            <Link to="/quotes/add">Submit new quote</Link>
            <nav className="nav">
                {categories.map((category) => (
                    <Link key={category.id} to={`/quotes/${category.id}`}>
                        {category.title}
                    </Link>
                ))}
            </nav>
        </header>
    );
};

export default Header;