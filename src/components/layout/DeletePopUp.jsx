"use client"
import toast from 'react-hot-toast'

function DeletePopUp({setDeletePopUp,id}) {

    const handleDelete = async() =>{
        try {
            const res = await fetch(`/api/user?id=${id}`,{
                method:'DELETE'
            })
            if(res.ok){
                toast.success('User deleted Successfully')
               return setDeletePopUp({value:false,id:null})
            }
            return toast.error('Something Went Wrong')
        } catch (error) {
            console.log(error)
            toast.error('Something Went Wrong')
        }
    }

  return (
    <div>
        {open && 
           <div className=' absolute h-screen w-full inset-0 bg-black/50 flex justify-center items-center'>
                <div className=' p-4 rounded-md bg-white border border-gray-300 flex flex-col gap-4 justify-center '>
                    Do You Want to Delete &quot;{id}&quot; ? 
                    <div className=' flex items-center justify-center gap-4'>
                        <button className=' px-4 py-2 bg-red-600 text-white rounded-md' onClick={()=>handleDelete()} >Delete</button>
                        <button className=' px-4 py-2 bg-slate-700 text-white rounded-md' onClick={()=>setDeletePopUp({value:false,id:null})}>Cancel</button>
                    </div>
                </div>
           </div>
        }
    </div>
  )
}

export default DeletePopUp