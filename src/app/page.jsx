"use client";
import DeletePopUp from "@/components/layout/DeletePopUp";
import ThreeDotPopUp from "@/components/layout/ThreeDotPopUp";
import UserPopUp from "@/components/layout/UserPopUp";
import { useEffect, useRef, useState } from "react";
import SendEmailButton from "@/components/layout/SendEmailButton";
import Add from "@/components/icons/Add";

export default function Home() {
  const [showPopUp, setShowPopUp] = useState({value:false,user:null});
  const [showDeletePopUp,setDeletePopUp] = useState({value:false,id:null})
  const [rows, setrows] = useState([]);
  const [selectedRows, setSelectedrows] = useState([]);




  useEffect(() => {
    fetch("/api/user")
      .then((res) => res.json())
      .then((res) => setrows(res));
  }, [showPopUp,showDeletePopUp]);



  const handleSelectedRows = (ev) => {

    if (selectedRows.includes(ev.target.id)) {
      let newSelectedRows = selectedRows.filter((id) => id !== ev.target.id);
      setSelectedrows(newSelectedRows);
    } else {
      setSelectedrows((prev) => [...prev, ev.target.id]);
    }

  };



 

  return (
    <div className=" flex flex-col gap-4" >
     
      {showPopUp.value && <UserPopUp setShowPopUp={setShowPopUp} userdata={showPopUp?.user} />}
      {showDeletePopUp.value && <DeletePopUp setDeletePopUp={setDeletePopUp} id={showDeletePopUp?.id}/>}
      <div className=" flex justify-end mt-6 px-6 gap-4">
        <SendEmailButton selectedUsers={selectedRows}/>
        <button
          className=" flex gap-2 px-4 py-2 rounded-md text-white font-semibold bg-green-400"
          onClick={() => setShowPopUp((prev)=>({...prev,value:true}))}
        >
          <Add/> Add User
        </button>
      </div>
      
      {rows?.length > 0 &&

      <div className=" flex flex-col w-full max-w-6xl rounded-md bg-white border-gray-400 border m-auto p-2 ">
        <div className=" rows flex gap-3 border-b border-b-gray-200 font-semibold justify-around underline p-2 ">
          <div className=" flex gap-2" style={{ flex: 0.3 }}>
            
          </div>
          <p>Id</p>
          <p style={{ flex: 0.5 }}>Name</p>
          <p>Email</p>
          <p>Phone Number</p>
          <p>Hobbies</p>
          <p style={{ flex: 0.1 }}> </p>
        </div>
          {rows.map((user) => (
            <div className=" rows flex gap-3 border-b border-b-gray-200 text-slate-500  justify-around p-2 " key={user._id}>
              <div style={{ flex: 0.3 }}>
                <input
                  type="checkbox"
                  id={user._id}
                  checked={selectedRows.includes(user._id)}
                  onChange={(ev) => handleSelectedRows(ev)}
                />
              </div>
              <p>{user?._id}</p>
              <p style={{ flex: 0.5 }}>{user?.name}</p>
              <p>{user?.email}</p>
              <p>{user?.phoneNumber}</p>
              <p>{user?.hobbies.join(" , ")}</p>
              <ThreeDotPopUp setShowPopUp={setShowPopUp} setDeletePopUp={setDeletePopUp} user={user} />
            </div>
          
          ))}
      </div>
          }
    </div>
  );
}
