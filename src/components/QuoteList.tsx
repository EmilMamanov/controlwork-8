import React, { useEffect, useState, useCallback } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

interface Quote {
    id: string;
    author: string;
    category: string;
    text: string;
}

const QuoteList: React.FC = () => {
    const [quotes, setQuotes] = useState<Quote[]>([]);
    const { pathname } = useLocation();
    const { category: categoryParam } = useParams();

    const fetchQuotes = useCallback(async () => {
        try {
            let url = 'https://emil-s-quotes-app-js-20-default-rtdb.europe-west1.firebasedatabase.app/quotes.json';

            if (categoryParam) {
                url += `?orderBy="category"&equalTo="${categoryParam}"`;
            }

            const response = await axios.get(url);

            if (response.data) {
                const quotesData: Record<string, Quote> = response.data;
                const quotesArray = Object.keys(quotesData).map((quoteId) => ({
                    ...quotesData[quoteId],
                    id: quoteId,
                }));
                setQuotes(quotesArray);
            }
        } catch (error) {
            console.error('Error fetching quotes:', error);
        }
    }, [categoryParam]);

    const handleDelete = async (id: string) => {
        try {
            await axios.delete(
                `https://emil-s-quotes-app-js-20-default-rtdb.europe-west1.firebasedatabase.app/quotes/${id}.json`
            );
            setQuotes((prevQuotes) => prevQuotes.filter((quote) => quote.id !== id));
        } catch (error) {
            console.error('Error deleting quote:', error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            await fetchQuotes();
        };

        (async () => {
            await fetchData();
        })();
    }, [fetchQuotes, pathname, categoryParam]);

    return (
        <div>
            {quotes.map((quote) => (
                <div className="quote-div" key={quote.id}>
                    <h3>{quote.author}</h3>
                    <p>{quote.text}</p>
                    <p>Category: {quote.category}</p>
                    <Link to={`/quotes/${quote.id}/edit`}>Edit</Link>
                    <button className="delete-btn" onClick={() => handleDelete(quote.id)}>Delete</button>
                </div>
            ))}
        </div>
    );
};

export default QuoteList;