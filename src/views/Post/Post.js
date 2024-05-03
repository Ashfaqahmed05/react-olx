import React, { useState } from "react";
import { setDoc, doc, } from "firebase/firestore";
import { db } from "../../Config/firebase/DB";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth } from "../../Config/firebase/DB";
import "./style.css";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const PostPage = () => {
  const [productTitle, setProductTitle] = useState("");
  const [category, setCategory] = useState('' || 'others');
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
    const selectedFiles = Array.from(e.target.files);
    setSelectedFile(selectedFiles);
  };

  const handlePostClick = async (e) => {
    e.preventDefault();
    try {
      const urls = [];
      if (!productTitle || !price || !selectedFile.length) {
        toast.error("Please fill in all required fields and choose at least one file.");
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
      const productId = userUid + Date.now();
      await setDoc(doc(db, "Post", productId), {
        Title: productTitle,
        category: category,
        Description: description,
        Price: price,
        Discount: discount,
        FileURL: urls,
        Product_ID: productId,
        User_ID: userUid,
      });

      toast.success("Your post with file added!");
      setProductTitle('');
      setCategory('');
      setDescription('');
      setPrice('');
      setFile(null);
      navigate('/product')

    } catch (error) {
      console.error(error);
      toast.error("Error adding post with file");
    }


  };

  console.log(category)
  return (
    <div>
      <h1 className="postHeading">Post Page</h1>

      <form className="postContainer" onSubmit={handlePostClick}>
        <div className="input-container">
          <input
            type="text"
            id="productTitle"
            maxLength={40}
            placeholder="Product Title"
            value={productTitle}
            onChange={(e) => setProductTitle(e.target.value)}
            required
          />
        </div>

        <div className="input-container">
          <label htmlFor="category"> Category: 
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="other">Other</option>
            <option value="car">Vehicle</option>
            <option value="bike">Bike</option>
            <option value="cloth">Cloth</option>
            <option value="property">Property</option>
            <option value="mobile">Mobile</option>
          </select>
          </label>
        </div>

        <div className="input-container">
          <textarea
            id="description"
            placeholder="Description"
            value={description}
            rows={6}
            cols={50}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="input-container">
          <input
            type="tel"
            maxLength={7}
            id="price"
            placeholder="Price"
            value={price}
            onChange={(e) => {
              const onlyNumbers = e.target.value.replace(/[^0-9]/g, '');
              setPrice(onlyNumbers);
            }}
            required
          />
        </div>

        <div className="input-container">
          <input
            type="tel"
            id="discount"
            maxLength={2}
            placeholder="Discount"
            value={discount}
            onChange={(e) => {
              const onlyNumbers = e.target.value.replace(/[^0-9]/g, '');
              setDiscount(onlyNumbers);
            }}
            required
          />
        </div>

        <div className="input-container">
          <input
            type="text"
            id="location"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>

        <div className="input-container">
          <input
            type="text"
            id="contact"
            maxLength={11}
            minLength={11}
            placeholder="Contact"
            value={contact}
            onChange={(e) => {
              const onlyNumbers = e.target.value.replace(/[^0-9]/g, '');
              setContact(onlyNumbers);
            }}
            required
          />
        </div>

        <div className="input-container">
          <input
            type="file"
            id="file"
            accept=".jpg, .jpeg, .png"
            multiple
            onChange={handleFileChange}
            required
          />
        </div>

        <div>
          <button type="submit" >
            Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostPage;