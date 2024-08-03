"use client";
import React, { useState } from "react";
import ThreeDots from "../icons/ThreeDots";
import Trash from "../icons/Trash";
import Edit from "../icons/Edit";
import DeletePopUp from "./DeletePopUp";

function ThreeDotPopUp({ setShowPopUp,setDeletePopUp,user }) {
  const [showButtons, setShowButtons] = useState(false);

  return (
    <div
      style={{ flex: 0.1 }}
      className=" relative cursor-pointer"
      onMouseOver={() => setShowButtons(true)}
      onMouseLeave={() => setShowButtons(false)}
    >
      <ThreeDots />
      <div
        className={`absolute top-6 right-4 flex-col z-10 bg-white  border border-gray-400 rounded-md ${
          showButtons ? "flex" : "hidden"
        }`}
      >
        <button className=" border-b border-b-gray-300 px-4 hover:bg-gray-200 py-1 "
            onClick={()=>setDeletePopUp({value:true,id:user._id})}
        >
          <Trash/>
        </button>
        <button
          className=" px-4 py-1  hover:bg-gray-200 "
          onClick={() => setShowPopUp({value:true,user:user}) }
        >
          <Edit />
        </button>
      </div>
    </div>
  );
}

export default ThreeDotPopUp;
