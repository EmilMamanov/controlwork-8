import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import QuoteForm from './components/QuoteForm';
import QuoteList from './components/QuoteList';
import './App.css';

const App: React.FC = () => {
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
        <Router>
            <Routes>
                <Route path="/" element={<Layout categories={categories} />}>
                    <Route index element={<QuoteList />} />
                </Route>
                <Route path="/quotes" element={<Layout categories={categories} />}>
                    <Route index element={<QuoteList />} />
                </Route>
                <Route path="/quotes/add" element={<QuoteForm isEditing={false} categories={categories} />} />
                <Route path="/quotes/:category" element={<QuoteList />} />
                <Route path="/quotes/:id/edit" element={<QuoteForm isEditing categories={categories} />} />
            </Routes>
        </Router>
    );
};

export default App;