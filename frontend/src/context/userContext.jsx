import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const userDataContext = createContext();

function UserContext({children}){
    const serverUrl = "http://localhost:8000"
    const [userData, setUserData] = useState(null);
    const [frontendImage, setFrontendImage] = useState(null);
    const [backendImage, setBackendImage] = useState(null);

    const [selectedImage, setSelectedImage] = useState(null);

    const handleCurrentUser = async()=>{
        try{
            const res = await axios.get(`${serverUrl}/api/user/current`,{withCredentials:true})
            setUserData(res.data);
            console.log(userData);
        }catch(error){
            console.log(error);
        }
    }


    useEffect(()=>{
        handleCurrentUser();
    },[])

    const value ={
        serverUrl,
        userData, setUserData,
        backendImage, setBackendImage,
        frontendImage, setFrontendImage,
        selectedImage, setSelectedImage
    }

    return (
        <div>
            <userDataContext.Provider value={value}>
                {children}
            </userDataContext.Provider>
        </div>
    )
}

export default UserContext;