import { useContext, useState } from 'react';
import bg from '../assets/p3.jpg'
import {IoEye} from 'react-icons/io5'
import {IoEyeOff} from 'react-icons/io5'
import { useNavigate } from 'react-router-dom';
import { userDataContext } from '../context/userContext';
import toast from 'react-hot-toast';
import axios from 'axios'

function SignIn(){

    const {serverUrl, userdata, setUserData} = useContext(userDataContext);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignIn = async(e)=>{
        e.preventDefault();
        try{
            if(!email || !password){
                toast.error("All fields are mendetory!!");
                return;
            }

            const res = await axios.post(`${serverUrl}/api/auth/signin`,{
                email, password
            },{withCredentials:true});
        
            
            if(res?.data?.success){
                setEmail("")
                setPassword("")
                toast.success(res?.data?.message);
            }
            setUserData(res?.data);
            navigate("/");


        }catch(error){
            setUserData(null);
            toast.error(error?.response?.data?.message);
        }
    }


    return(
        <div className="w-full h-[100vh] bg-cover flex justify-center items-center" style={{backgroundImage:`url(${bg})`}}>
            <form 
                onSubmit={handleSignIn}
                className='w-[90%] h-[550px] max-w-[430px] bg-[#000000069] backdrop-blur shadow-lg shadow-black flex flex-col items-center justify-center gap-[20px] px-[15px]'    
            >
                <h1 className='text-white text-3xl font-semibold mb-[30px]'>
                    Sign In to <span className='text-blue-700'>Virtual Assistance</span>
                </h1>
                
                <input 
                    type="email"
                    placeholder='Enter Your Email'
                    className='w-full h-[50px] outline-none border-2 border-white bg-transparent text-white placeholder-grey-300 px-3 py-2 rounded-full text-[18px]' 
                    onChange={(e)=>setEmail(e.target.value)}
                    value = {email}
                />

                <div className='w-full h-[50px] border-white border-2 bg-transparent text-white rounded-full text-[18px] relative'>
                    <input 
                        placeholder='Enter password'
                        type={showPassword ? "text" : "password"} 
                        className='w-full h-full rounded-full outline-none bg-transparent placeholder-grey-300 px-3 py-2'
                        onChange={(e)=>setPassword(e.target.value)}
                        value = {password}
                    />
                    {!showPassword && 
                        <IoEye 
                        className='absolute top-[15px] right-[25px] w-[25px] h-[20px] cursor-pointer'
                        onClick={()=>setShowPassword(true)}
                        />
                    }
                    {showPassword && 
                        <IoEyeOff 
                        className='absolute top-[15px] right-[25px] w-[25px] h-[20px] cursor-pointer'
                        onClick={()=>setShowPassword(false)}
                        />
                    }
                </div>
                <button
                    type='submit' 
                    className='min-w-[150px] h-[53px] bg-white rounded-full cursor-pointer transition duration-300 ease-in-out  hover:scale-110  mt-[35px] text-lg text-black font-semibold'>
                    Sign In
                </button>
                <p className='text-white text-lg'>
                    Don't have an account ? 
                    <span className='text-blue-400 cursor-pointer' onClick={()=>navigate("/signup")}>Sign Up</span>
                </p>
            </form>
        </div>
    )
}

export default SignIn;