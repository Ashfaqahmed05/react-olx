import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../Config/firebase/DB';
import './profile.css';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';

export function Profile({ user }) {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const [phone, setPhone] = useState('');
  const [bio, setBio] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [profilePictureUrl, setProfilePictureUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchingUser();
  }, [id]);

  async function fetchingUser() {
    setLoading(true);
    const docRef = doc(db, "users", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setProfile(docSnap.data());
      setProfilePic(docSnap.data().profile_pic);
      setPhone(docSnap.data().phone || '');
      setBio(docSnap.data().bio || '');
    } else {
      console.log("No such document!");
    }
    setLoading(false);
  }

  function handlePhoneChange(value) {
    setPhone(value);
  }

  function handleBioChange(value) {
    setBio(value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      let imageUrl = profilePic ? profilePictureUrl : profilePic;

      if (profilePicture) {
        const storageRef = ref(storage, `user_profile/${profilePicture.name}`);
        const snapshot = await uploadBytes(storageRef, profilePicture);
        imageUrl = await getDownloadURL(snapshot.ref);
        setProfilePictureUrl(imageUrl);
      }

      const userRef = doc(db, "users", id);
      await updateDoc(userRef, {
        phone: phone,
        bio: bio,
        ...(profilePicture && { profile_pic: imageUrl })
      }, { merge: true });

      toast.success('Profile update successfully!');
    } catch (error) {
      toast.error(`Error updating profile: ${error}`);
    }
    setLoading(false);
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="main">
      <div className="profile-container container">
        <h1>Profile</h1>
        <div className="user-details">
          <div className="top">

          <div className='profile-div'>
            <img className='profile-img' src={profilePic ? profilePic : "https://as1.ftcdn.net/v2/jpg/03/53/11/00/1000_F_353110097_nbpmfn9iHlxef4EDIhXB1tdTD0lcWhG9.jpg"} alt="checking" />
            <input
              id="file-input"
              type="file"
              accept=".jpg, .jpeg, .png"
              onChange={(e) => setProfilePicture(e.target.files[0])}
              style={{ display: 'none' }}
            />
            <label htmlFor="file-input" className="camera-icon">
              <box-icon type='solid' name='camera'></box-icon>
            </label>
            
          </div>
          <button
              className='myProduct-btn'
              onClick={() => navigate(`/myproducts/${id}`)}>
              My Products
            </button>
          </div>
          <p>
            <strong>Name:</strong> {profile?.username}
          </p>
          <p>
            <strong>Email:</strong> {profile?.email}
          </p>
          <form onSubmit={handleSubmit}>
            <label htmlFor="phone">Contact: </label>
            <input
              type="text"
              name='phone'
              placeholder="Phone"
              value={phone}
              onChange={(e) => handlePhoneChange(e.target.value)}
            />
            <label htmlFor="bio">Bio: </label>
            <textarea
              placeholder="Write a bio"
              name='bio'
              value={bio}
              onChange={(e) => handleBioChange(e.target.value)}
            ></textarea>

            <button type="submit">Update Profile</button>
          </form>
        </div>

      </div>
    </div>
  );
}
