import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { EditProduct } from '../../components/EditProduct/EditProduct';
import { DeleteProduct } from '../../components/DeleteProduct/DeleteProduct';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../../Config/firebase/DB';

export function MyProducts() {
    const [products, setProducts] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        let unsubscribe;
        const fetchProducts = async () => {
            try {
                const productRef = collection(db, 'Post');
                const q = query(productRef, where('User_ID', '==', id));
                unsubscribe = onSnapshot(q, (querySnapshot) => {
                    const fetchedProducts = [];
                    querySnapshot.forEach((doc) => {
                        fetchedProducts.push({ id: doc.id, ...doc.data() });
                    });
                    setProducts(fetchedProducts);
                });
            } catch (error) {
                console.log(error.message);
            }
        };

        fetchProducts();

        return () => {
            if (unsubscribe) {
                unsubscribe();
            }
        };
    }, [id]);

    

    return (
        <div className="container d-flex flex-wrap">
            {products.length === 0 ? (
                <div style={{ height: '70vh', width: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    Your items not found
                </div>
            ) : (
                products.map((product, index) => (
                    <div key={index} className="card m-2" style={{ width: '300px', position: 'relative' }}>
                        {product.FileURL && product.FileURL[0] && (
                            <img
                                className="card-img-top"
                                style={{ height: '200px' }}
                                src={product.FileURL[0]}
                                alt={product.Title}
                            />
                        )}
                        <div className="card-body">
                            <h5 className="card-title">Rs. {product.Price}</h5>
                            {product.Discount && <p className="discount">{product.Discount}% OFF</p>}
                            <p className="card-text">{product.Description}</p>
                            <div className="card-last">
                                <h6 style={{ textTransform: 'capitalize' }}>{product.category}</h6>
                            </div>
                            <EditProduct product={product} />
                            <DeleteProduct product={product} />
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}
