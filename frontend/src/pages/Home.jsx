import { useContext } from 'react';
import { userDataContext } from '../context/userContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

function Home(){

    const {userData, serverUrl, setUserData} = useContext(userDataContext);
    const navigate = useNavigate();

    const handleLogout = async ()=>{
        try {
            const res = await axios.get(`${serverUrl}/api/auth/logout`,{withCredentials:true});
            if(res?.data?.success){
                toast.success(res?.data?.message);
            }

            setUserData(null)
            navigate("/signin")
        } catch (error) {
            setUserData(null);
            toast.error(error);
        }
    }

    return(
        <div className="w-full h-[100vh] bg-gradient-to-t from-[black] to-[#030353] flex justify-center items-center flex-col">
            <button
                    onClick={()=>navigate("/customize")}
                    className='min-w-[150px] h-[45px] bg-white rounded-full cursor-pointer transition duration-300 ease-in-out  hover:scale-110  mt-[35px] text-lg text-black font-semibold absolute top-[20px] right-[20px]'>
                    Customize
            </button>
            <button
                type='submit' 
                onClick={handleLogout}
                className='min-w-[150px] h-[45px] bg-white rounded-full cursor-pointer transition duration-300 ease-in-out  hover:scale-110  mt-[35px] text-lg text-black font-semibold absolute top-[80px] right-[20px]'>
                Log Out
            </button>
            <div className="w-[300px] h-[400px] flex justify-center items-center border shadow-lg overflow-hidden rounded-4xl">
                <img src={userData?.user?.assistantImage} className="h-full object-cover" />
            </div>
            <h1 className='text-white text-xl mt-4 font-semibold'>I'm <span className='text-yellow-500'>{userData?.user?.assistantName}</span></h1>
        </div>
    )
}

export default Home;