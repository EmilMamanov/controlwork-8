import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import '../App.css';

interface Category {
    title: string;
    id: string;
}

interface LayoutProps {
    categories: Category[];
}

const Layout: React.FC<LayoutProps> = ({ categories }) => {
    return (
        <div>
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
            <main>
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
