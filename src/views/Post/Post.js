import React, { useState } from "react";
import { setDoc, doc, } from "firebase/firestore";
import { db } from "../../Config/firebase/DB";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { auth } from "../../Config/firebase/DB";
import "./style.css";
import { useNavigate } from "react-router-dom";

const PostPage = () => {
  const [productTitle, setProductTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [file, setFile] = useState(null);
  const [selectedFile, setSelectedFile] = useState([]);

  const storage = getStorage();
  const navigate = useNavigate()


  const user = auth.currentUser;
  if (!user) {
    
    return <div>loading</div>;
  }
  const userUid = user.uid;

  const handleFileChange = (e) => {
    console.log(e.target.files);

    const selectedFiles = Array.from(e.target.files);
    setSelectedFile(selectedFiles);
  };

  const handlePostClick = async (e) => {
    e.preventDefault();
    try {
      const urls = [];
      if (!selectedFile) return;
      await Promise.all(
        selectedFile.map(async (item) => {
          const storageRef = ref(storage, `images/${item.name}`);
          const snapshot = await uploadBytes(storageRef, item);
          const url = await getDownloadURL(snapshot.ref);
          urls.push(url);
        })
      );
      const userID = userUid + Date.now();
      await setDoc(doc(db, "Post", userID), {
        Title: productTitle,
        category: category,
        Description: description,
        Price: price,
        Discount: discount,
        FileURL: urls,
        UserId: userID,
      });

      alert("Your post with file added!");
      navigate('/product')
    } catch (error) {
      console.error(error);
      alert("Error adding post with file");
    }

    setProductTitle('');
    setCategory('');
    setDescription('');
    setPrice('');
    setFile(null);
  };

  return (
    <div>
      <h1 className="postHeading">Post Page</h1>
      <form className="postContainer">
        <div>
          <label htmlFor="productTitle">Product Title:</label>
          <input
            type="text"
            id="productTitle"
            value={productTitle}
            onChange={(e) => setProductTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="category">Category:</label>
          <input
            type="text"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="price">Price:</label>
          <input
            type="text"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="price">Discount:</label>
          <input
            type="text"
            id="discount"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="file">Choose File:</label>
          <input
            type="file"
            id="file"
            accept=".jpg, .jpeg, .png"
            multiple
            onChange={handleFileChange}
          />
        </div>
        <div>
          <button type="button" onClick={handlePostClick}>
            Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostPage;