import React, { useState } from "react";
import { setDoc, doc, } from "firebase/firestore";
import { db } from "../../Config/firebase/DB";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth } from "../../Config/firebase/DB";
import "./style.css";
import { useNavigate } from "react-router-dom";
import MyMap from "../../components/Map";
const PostPage = () => {
  const [productTitle, setProductTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [file, setFile] = useState(null);
  const [selectedFile, setSelectedFile] = useState([]);
  const [location, setLocation] = useState('')
  const [contact, setContact] = useState('')

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
      if (!productTitle || !category || !price || !selectedFile.length) {
        alert("Please fill in all required fields and choose at least one file.");
        return;
      }
      await Promise.all(
        selectedFile.map(async (item) => {
          const storageRef = ref(storage, `images/${item.name}`);
          const snapshot = await uploadBytes(storageRef, item);
          const url = await getDownloadURL(snapshot.ref);
          urls.push(url);

        })
      );
      console.log(urls)
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
      setProductTitle('');
      setCategory('');
      setDescription('');
      setPrice('');
      setFile(null);
      navigate('/product')

    } catch (error) {
      console.error(error);
      alert("Error adding post with file");
    }

   
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
            placeholder="something@"
            value={productTitle}
            onChange={(e) => setProductTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            value={category || 'car'}
            onChange={(e) => setCategory(e.target.value)}
            
          >
            <option  value="car">Vehicle</option>
            <option value="bike">Bike</option>
            <option value="cloth">Cloth</option>
            <option value="property">Property</option>
            <option value="mobile">Mobile</option>
            <option value="other">Other</option>

          </select>
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            placeholder="Write about your product"
            value={description}
            rows={6}
            cols={50}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="price">Price:</label>
          <input
            type="text"
            id="price"
            placeholder="100"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="discount">Discount: (%)</label>
          <input
            type="text"
            id="discount"
            placeholder="Optional"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            placeholder="Karachi, pakistan"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <MyMap/>
        
        <div>

          <label htmlFor="contact">Contact:</label>
          <input
            type="number"
            id="contact"
            pattern="[0-9]{11}"
            placeholder="03123456789"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="file">Choose Multiple Files:</label>
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