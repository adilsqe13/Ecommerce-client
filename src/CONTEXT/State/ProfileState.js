import React, { useState, useEffect } from 'react';
import profileContext from '../Context/profileContext';


export default function ProductState(props) {
    const apiUrl = process.env.REACT_APP_API_URL;
    const token = localStorage.getItem('userToken');
    const [profile, setProfile] = useState([]);

    const getProfile = async () => {
        try {
            const response = await fetch(`${apiUrl}/api/auth/user/get-user-profile`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": token
                },
            });
            const json = await response.json();
            setProfile(json);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        getProfile();
    },[]);
    return (
        <>
            <profileContext.Provider value={{
                profile,
                getProfile
            }}>
                {props.children}
            </profileContext.Provider>
        </>
    )
}
