"use client"
import React, { useEffect, useRef, useState } from 'react'
import emailjs from '@emailjs/browser';
import toast from 'react-hot-toast';
import Send from '../icons/Send';

function SendEmailButton({selectedUsers}) {
    const [rows,setrows] = useState([])
    const [selectedRows,setSelectedrows] = useState()
    const form = useRef()

    useEffect(() => {
        fetch("/api/user")
          .then((res) => res.json())
          .then((res) => setrows(res));
        let data = rows.filter((item)=>selectedUsers.includes(item._id))
        setSelectedrows(data)
      }, [selectedUsers]);

    const sendEmail = () => {
        emailjs
          .sendForm('service_swr8324', 'template_l2hwoc2',form.current, {
            publicKey: '81tRITB_RRcwxMy51',
          })
          .then(
            () => {
              console.log('SUCCESS!');
              toast.success('Data Sent Successfully')
            },
            (error) => {
              console.log('FAILED...', error);
              toast.error('Something Went Wrong')
            },
          );
      };
    

  return (
    <div>
        <form ref={form}>
        <input type="text" name="my_data" value={JSON.stringify(selectedRows)} className=" hidden" />
      </form>
      <button
          className=" px-4 py-2 flex gap-2 rounded-md text-white font-semibold bg-red-500"
          onClick={()=>sendEmail()}
        >
         <Send/> Send 
        </button>

    </div>
  )
}

export default SendEmailButton