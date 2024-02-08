import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { doc,getDoc, } from 'firebase/firestore'
import { db } from '../../Config/firebase/DB'
import "./style.css"

export function Profile({ user }) {

    const {id} = useParams()
const [profile, setProfile] = useState (null)


    useEffect(() => {
        const fetchingUser = async () => {
          try {
            const docRef = doc(db, 'users', id);
            const docSnapshot = await getDoc(docRef);
    
            if (docSnapshot.exists()) {
              setProfile(docSnapshot.data());
            } else {
                console.log('No such document!');
            }
          } catch (error) {
            console.error('Error fetching product data:', error);
          }
        };
        
        fetchingUser();
    }, [id]);
    

    return (
        <div className='main'>
            <div className="profile-container">
                <h1>Profile Page</h1>
                <div className="user-details">
                    <p><strong>Name:</strong> {profile?.username}</p>
                    <p><strong>Email:</strong> {profile?.email}</p>
                    <input type="text" placeholder='Phone' />



                </div>
                <div className="profile-image">
                    {/* <img src={user.photoURL} alt="Profile" /> */}
                </div>
            </div>


        </div>
    )
}
