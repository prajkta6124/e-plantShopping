import React, { useState } from 'react';
import './ProductList.css';
import CartItem from './CartItem';
import { useDispatch } from 'react-redux';
import { addItem } from '../features/cart/CartSlice'; // Adjust this path based on your folder structure

function ProductList({ onHomeClick }) {
    const dispatch = useDispatch();  // Added useDispatch hook
    const [showCart, setShowCart] = useState(false);
    const [showPlants, setShowPlants] = useState(false);
    const [addedToCart, setAddedToCart] = useState({}); // using object to track by plant name

    const plantsArray = [
        {
            category: "Air Purifying Plants",
            plants: [
                {
                    name: "Snake Plant",
                    image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg",
                    description: "Produces oxygen at night, improving air quality.",
                    cost: "$15"
                },
                {
                    name: "Spider Plant",
                    image: "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg",
                    description: "Filters formaldehyde and xylene from the air.",
                    cost: "$12"
                },
            ]
        },
    ];

    const styleObj = {
        backgroundColor: '#4CAF50',
        color: '#fff!important',
        padding: '15px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '20px',
    };

    const styleA = {
        color: 'white',
        fontSize: '30px',
        textDecoration: 'none',
    };

    const handleHomeClick = (e) => {
        e.preventDefault();
        onHomeClick();
    };

    // Handle Add to Cart
    const handleAddToCart = (plant) => {
        // Dispatch action to add item to Redux store
        dispatch(addItem(plant));

        // Update the addedToCart state to disable button
        setAddedToCart(prev => ({
            ...prev,
            [plant.name]: true
        }));
    };

    return (
        <div>
            <div style={styleObj}>
                <a href="/" style={styleA} onClick={handleHomeClick}>Home</a>
                <h2>Our Plants</h2>
            </div>

            <div className="product-grid">
                {plantsArray.map((categoryObj, catIndex) => (
                    <div key={catIndex}>
                        <h3>{categoryObj.category}</h3>
                        <div className="product-category">
                            {categoryObj.plants.map((plant, plantIndex) => (
                                <div key={plantIndex} className="product-card">
                                    <img src={plant.image} alt={plant.name} className="product-image" />
                                    <h4>{plant.name}</h4>
                                    <p>{plant.description}</p>
                                    <p className="product-cost">{plant.cost}</p>
                                    <button
                                        className="add-to-cart-btn"
                                        onClick={() => handleAddToCart(plant)}
                                        disabled={addedToCart[plant.name]}  // Disable button if already added
                                    >
                                        {addedToCart[plant.name] ? 'Added' : 'Add to Cart'}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductList;
