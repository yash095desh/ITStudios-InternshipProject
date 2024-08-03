"use client"
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import ThreeDotLoader from '../animations/ThreeDotLoader';
import { ThreeCircles } from 'react-loader-spinner';
import Remove from '../icons/Remove';

function UserPopUp({setShowPopUp,userdata}) {
const [user, setUser] = useState({name:userdata?.name,email:userdata?.email,phoneNumber:userdata?.phoneNumber,hobbies:userdata?.hobbies.join(" , ")});
const [loading,setLoading] = useState(false)

const handleChange = (ev) => {
    setUser((prev) => ({ ...prev, [ev.target.name]: ev.target.value }));
    };

    const handleSubmit = async(ev) =>{
        ev.preventDefault()
        if(!user.name || !user.email || !user.phoneNumber || !user.hobbies)return toast.error('Required Credentials')
        setLoading(true)
        try {
            const res = await fetch('/api/user',{
                method : userdata ? 'PUT':'POST',
                headers : {'Content-Type':'application/json'},
                body : JSON.stringify(user)
            })
            setLoading(false)
            if(res?.status == 409)return toast.error('Email/Phone-Number Already Exist') 
            res.ok ? toast.success(userdata?'User Updated Successfully':'User Added Sucessfully') : toast.error('Something Went Wrong');
            if(res.ok)setShowPopUp({value:false,user : null})
        } catch (error) {
            console.log(error)
            toast.error('Something Went Wrong')
        }
        setLoading(false)
    }

  return (
    <div className="h-screen w-full z-10 absolute inset-0 flex items-center justify-center bg-black/50">
          <div className=" relative flex flex-col rounded-md bg-white border border-gray-100 max-w-md w-full px-6 py-8 ">
            <div className="absolute right-4 top-4 cursor-pointer" onClick={()=>setShowPopUp({value:false,user : null})}>
              <Remove/>
            </div>
          <form className=" flex flex-col gap-4 " onSubmit={handleSubmit}>
            <h1 className=" text-xl font-semibold pb-2">{userdata?'Update User':'Create New User'}</h1>
            <input
              type="text"
              placeholder="UserName"
              name="name"
              value={user?.name}
              onChange={handleChange}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={user?.email}
              onChange={handleChange}
            />
            <input
              type="number"
              placeholder="Phone Number"
              name="phoneNumber"
              value={user?.phoneNumber}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Hobbies (Singing , Dancing ,Playing ..etc )"
              name="hobbies"
              value={user?.hobbies}
              onChange={handleChange}
            />
            <button className=" flex justify-center px-4 py-2 text-white bg-blue-600 rounded-md">
              {loading?<ThreeDotLoader/>:'Submit'}
            </button>
          </form>
          </div>
        </div>
  )
}

export default UserPopUp