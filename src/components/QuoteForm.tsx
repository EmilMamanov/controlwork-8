import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import '../App.css';
import Header from "./Header";

interface QuoteFormProps {
    isEditing: boolean;
    categories: Category[];
}

interface Category {
    title: string;
    id: string;
}

interface Quote {
    author: string;
    text: string;
    category: string;
}

const QuoteForm: React.FC<QuoteFormProps> = ({ isEditing, categories }) => {
    const { id } = useParams<{ id?: string }>();
    const navigate = useNavigate();
    const [formData, setFormData] = useState<Quote>({ author: '', text: '', category: '' });

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('https://emil-s-quotes-app-js-20-default-rtdb.europe-west1.firebasedatabase.app/categories.json');
                if (response.data) {
                    const categoriesData: Category[] = Object.values(response.data);
                    setFormData((prevData) => ({ ...prevData, categories: categoriesData }));
                }
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        if (isEditing) {
            const fetchQuote = async () => {
                try {
                    const response = await axios.get(`https://emil-s-quotes-app-js-20-default-rtdb.europe-west1.firebasedatabase.app/quotes/${id}.json`);
                    if (response.data) {
                        setFormData(response.data);
                    }
                } catch (error) {
                    console.error('Error fetching quote:', error);
                }
            };

            (async () => {
                await fetchQuote();
            })();
        }

        (async () => {
            await fetchCategories();
        })();
    }, [id, isEditing]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            if (isEditing) {
                await axios.put(`https://emil-s-quotes-app-js-20-default-rtdb.europe-west1.firebasedatabase.app/quotes/${id}.json`, formData);
            } else {
                await axios.post('https://emil-s-quotes-app-js-20-default-rtdb.europe-west1.firebasedatabase.app/quotes.json', formData);
            }

            navigate('/');
        } catch (error) {
            console.error('Error submitting quote:', error);
        }
    };

    return (
        <div>
            <Header />
        <div className="form-container">
        <form onSubmit={handleSubmit}>
            <div className="inputs">
                <label htmlFor="author">Author:</label>
                <input
                    type="text"
                    id="author"
                    name="author"
                    value={formData.author}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="text">Quote text:</label>
                <textarea
                    id="text"
                    name="text"
                    value={formData.text}
                    onChange={handleInputChange}
                    required
                ></textarea>
            </div>
            <div>
                <label htmlFor="category">Category:</label>
                <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleSelectChange}
                    required
                >
                    <option value="" disabled>
                        Select category
                    </option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.title}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <button type="submit">{isEditing ? 'Save' : 'Create'}</button>
            </div>
        </form>
        </div>
        </div>
    );
};

export default QuoteForm;