import { useContext, useState } from "react";
import { userDataContext } from "../context/userContext";

function Customize2(){

    const {userData} = useContext(userDataContext);
    const [assistantName, setAssistantName] = useState(
        userData?.assistantName || "" 
    );



    return(
        <div className="w-full h-[100vh] bg-gradient-to-t from-[black] to-[#030353] flex justify-center items-center flex-col">
            <h1 className="text-white text-3xl font-semibold text-center mb-4">Enter Your <span className="text-yellow-500">Assistant Name</span></h1>
            <input 
                type="text"
                placeholder='eg: Supra'
                className='w-full h-[50px] max-w-[400px] outline-none border-2 border-white bg-transparent text-white placeholder-grey-300 px-3 py-2 rounded-full text-[18px]' 
                onChange={(e)=>setAssistantName(e.target.value)}
                value = {assistantName}
            />
            {assistantName && 
                <button
                    type='submit' 
                    className='min-w-[200px] h-[53px] bg-white rounded-full cursor-pointer transition duration-300 ease-in-out  hover:scale-110  mt-[35px] text-lg text-black font-semibold'>
                    Create your Assistant
                </button>
            }
        </div>
    )
}

export default Customize2;