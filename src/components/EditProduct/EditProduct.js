import React, { useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { db, storage } from '../../Config/firebase/DB';
import { uploadBytes, getDownloadURL, ref } from 'firebase/storage';
import toast from 'react-hot-toast';

export function EditProduct({ product }) {
    const { Product_ID, Title, Price, Description } = product

    const [title, setTitle] = useState(Title || '');
    const [price, setPrice] = useState(Price || '');
    const [description, setDescription] = useState(Description || '');
    const [images, setImages] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            let imageUrl = null;

            if (images) {
                imageUrl = await uploadImage(images);
                console.log("image url: ", imageUrl);
            }

            const postRef = doc(db, 'Post', Product_ID);
            const updateData = {
                Title: title,
                Price: price,
                Description: description,
            };

            if (imageUrl) {
                updateData.FileURL = imageUrl;
            }

            await updateDoc(postRef, updateData, { merge: true });
            toast.success('Product updated successfully!');
            setTitle('');
            setPrice('');
            setDescription('');
            setImages(null);
        } catch (error) {
            console.error('Error updating product:', error);
            toast.error('Error updating product. Please try again later.');
        }
    };

    const uploadImage = async (images) => {
        const uploadTasks = images.map(async (item) => {
            const storageRef = ref(storage, `images/${item.name}`);
            const snapshot = await uploadBytes(storageRef, item);
            const url = await getDownloadURL(snapshot.ref);
            return url;
        });
        return Promise.all(uploadTasks);
    };

    const handleFileChange = (e) => {
        const file = Array.from(e.target.files);
        setImages(file);
    };

    return (
        <>
            <div>
                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#editProductModal${Product_ID}`}>
                    Edit
                </button>

                <div className="modal fade" id={`editProductModal${Product_ID}`} tabIndex="-1" aria-labelledby={`editProductModalLabel${Product_ID}`} aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id={`editProductModalLabel${Product_ID}`}>Edit Product</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor={`title${Product_ID}`} className="col-form-label">Title</label>
                                        <input type="text" className="form-control" id={`title${Product_ID}`} value={title} onChange={(e) => setTitle(e.target.value)} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor={`price${Product_ID}`} className="col-form-label">Price</label>
                                        <input type="text" className="form-control" id={`price${Product_ID}`} value={price} onChange={(e) => setPrice(e.target.value)} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor={`image${Product_ID}`} className="col-form-label">Upload Image</label>
                                        <input type="file" multiple className="form-control" id={`image${Product_ID}`} onChange={handleFileChange} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor={`description${Product_ID}`} className="col-form-label">Description:</label>
                                        <textarea className="form-control" id={`description${Product_ID}`} value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        <button type="submit" className="btn btn-primary">Save Changes</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
