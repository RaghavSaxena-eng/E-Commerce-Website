import axios from 'axios';
import { Header } from '../../Components/Header'
import './HomePage.css';
import { useEffect, useState } from 'react';
import { ProductsGrid } from './ProductsGrid';

export function HomePage({cart, loadCart}) {
    const [products, setProducts] = useState([]);
    

    useEffect ( () => {
        const getHomeData = async () => {
            const response = await axios.get('https://e-commerce-website-yw07.onrender.com/')
            setProducts(response.data);
        };
        getHomeData();
    }, [])

    return(
        <>
            <Header cart={cart}/>

            <link rel="icon" type="image/svg+xml" href="/images/home-favicon.png" />

            <title>Ecommerce Project</title>

            <div className="home-page">
            <ProductsGrid products={products} loadCart={loadCart}/>
            </div>
        </>
    );
}