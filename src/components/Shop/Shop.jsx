import React, { useEffect, useState } from 'react';
import { addToDb, deleteShoppingCart, getShoppingCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([])

    useEffect(() => {
        fetch('products.json')
            .then(response => response.json())
            .then(data => setProducts(data))
    }, [])

    useEffect(() => {
        const storedCart = getShoppingCart();
        let savedCart = [];

        // Step 01: Get ID of the addedProduct
        for (const id in storedCart) {
            // Step 02: Get the product by using ID
            const addedProduct = products.find(product => product.id === id)
            if (addedProduct) {
                // Step 03: Get quantity of the product
                const quantity = storedCart[id];
                addedProduct.quantity = quantity;
                // Step 04: Push the addedProduct to the savedCart
                savedCart.push(addedProduct);
            }
        }
        // Step 05: Set the cart
        setCart(savedCart);
    }, [products])

    const handleAddToCart = (product) => {
        const newCart = [...cart, product];
        setCart(newCart);
        addToDb(product.id);
    }

    const handleClearCart = () => {
        setCart([]);
        deleteShoppingCart();
    }

    return (
        <div className='shop-container'>
            <div className='products-container'>
                {
                    products.map(product => <Product
                        key={product.id}
                        product={product}
                        handleAddToCart={handleAddToCart}
                    ></Product>)
                }
            </div>
            <div className='cart-container'>
                <Cart
                    cart={cart}
                    handleClearCart={handleClearCart}
                >
                    <Link className='proceed-link' to='/orders'>
                        <button className='btn-proceed'>
                            <span>Review Order</span>
                            <FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon>
                            </button>
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;