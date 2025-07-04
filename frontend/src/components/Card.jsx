import { useContext } from "react";
import { userDataContext } from "../context/userContext";

function Card({image}){

    const {serverUrl,
            userData, setUserData,
            backendImage, setBackendImage,
            frontendImage, setFrontendImage,
            selectedImage, setSelectedImage} = useContext(userDataContext)

    return(
        <div className={`lg:w-[150px] lg:h-[250px] w-[70px] h-[140px] bg-[#030326] border-2 border-[#0000ff66] rounded-3xl overflow-hidden shadow-[0_0_10px_black] cursor-pointer hover:shadow-2xl hover:shadow-blue-950 hover:border-2 hover:border-white ${selectedImage==image? "border-2 border-white shadow-2xl shadow-blue-950" : null}`} 
             onClick={()=>{setSelectedImage(image), setBackendImage(null), setFrontendImage(null)}}
        >
            <img src={image} className="h-full object-cover" />
        </div>
    )
}

export default Card;