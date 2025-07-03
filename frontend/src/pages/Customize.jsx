import Card from "../components/Card";
import p1 from '../assets/p1.jpg'
import p2 from '../assets/p2.jpg'
import p3 from '../assets/p3.jpg'
import p4 from '../assets/p4.jpg'
import p5 from '../assets/p5.jpg'
import p6 from '../assets/p6.jpeg'
import p7 from '../assets/p7.jpg'
import p8 from '../assets/p8.jpeg'
import p9 from '../assets/p9.png'
import { RiImageAddLine } from "react-icons/ri";
import { useContext, useRef, useState } from "react";
import { userDataContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";


function Customize(){

    const navigate = useNavigate();
    const {serverUrl,
        userData, setUserData,
        backendImage, setBackendImage,
        frontendImage, setFrontendImage,
        selectedImage, setSelectedImage} = useContext(userDataContext);


    const inputImage = useRef()

    const handleImage=(e)=>{
        const file= e.target.files[0];
        setBackendImage(file)
        setFrontendImage(URL.createObjectURL(file))
    }

    return(
        <div className="w-full h-[100vh] bg-gradient-to-t from-[black] to-[#030353] flex justify-center items-center flex-col">

            <h1 className="text-white text-3xl font-semibold text-center mb-4">Select Your <span className="text-yellow-500">Assistant Image</span></h1>

            <div className="w-[900px] max-w-[90%] flex justify-center items-center flex-wrap gap-3">
                <Card image={p1}/>
                <Card image={p3}/>
                <Card image={p4}/>
                <Card image={p5}/>
                <Card image={p6}/>
                <Card image={p7}/>
                <Card image={p8}/>
                <Card image={p9}/>

                <div 
                    className={`lg:w-[150px] lg:h-[250px] w-[80px] h-[160px] bg-[#030326] border-2 border-[#0000ff66] rounded-3xl overflow-hidden shadow-[0_0_10px_black] cursor-pointer hover:shadow-2xl hover:shadow-blue-950 hover:border-2 hover:border-white flex items-center justify-center ${selectedImage=="input" ? "border-2 border-white shadow-2xl shadow-blue-950" : null}`}
                    onClick={()=>{inputImage.current.click(), setSelectedImage("input")}}
                >
                    {!frontendImage && <RiImageAddLine className="text-white w-[30px] h-[30px] "/>}
                    {frontendImage && <img src={frontendImage} className="h-full object-cover" />}
                </div>
                <input type="file" accept="image/*" hidden ref={inputImage} onChange={handleImage}/>
            </div>
             {selectedImage && 
                <button 
                    className="min-w-[150px] h-[45px] mt-[30px] text-black font-semibold bg-white rounded-full text-2xl cursor-pointer"
                    onClick={()=>navigate("/customize2")}
                >
                    Next
                </button>}
        </div>
    )
}


export default Customize;