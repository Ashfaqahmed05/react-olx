import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../Config/firebase/DB';
import './style.css';
import toast from 'react-hot-toast';

export function Profile({ user }) {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const [phone, setPhone] = useState('');
  const [bio, setBio] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [profilePictureUrl, setProfilePictureUrl] = useState(null);

  useEffect(() => {
    fetchingUser();
  }, [id]);

  async function fetchingUser() {
    const docRef = doc(db, "users", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setProfile(docSnap.data());
      setProfilePic(docSnap.data().profile_pic);
      setPhone(docSnap.data().phone || '')
      setBio(docSnap.data().bio || '')
    } else {
      console.log("No such document!");
    }
  }

  function handlePhoneChange(value) {
    setPhone(value);
  }

  function handleBioChange(value) {
    setBio(value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
  
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
  }


  

  return (
    <div className="main">
      <div className="profile-container container">
        <h1>Profile Page</h1>
        <div className="user-details">
          <div className='profile-div'>
            <img className='profile-img' src={profilePic? profilePic :"https://as1.ftcdn.net/v2/jpg/03/53/11/00/1000_F_353110097_nbpmfn9iHlxef4EDIhXB1tdTD0lcWhG9.jpg"} alt="checking" />
          </div>
          <p>
            <strong>Name:</strong> {profile?.username}
          </p>
          <p>
            <strong>Email:</strong> {profile?.email}
          </p>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Phone"
              value={phone}
              onChange={(e) => handlePhoneChange(e.target.value)}
            />
            <textarea
              placeholder="Write a bio"
              value={bio}
              onChange={(e) => handleBioChange(e.target.value)}
            ></textarea>
            <input
              type="file"
              accept=".jpg, .jpeg, .png"
              onChange={(e) => setProfilePicture(e.target.files[0])}
            />
            <button type="submit">Update Profile</button>
          </form>
        </div>
       
      </div>
    </div>
  );
}
