import axios from 'axios';
import React, { useState } from 'react'

const Modal = ({setEdit, editTodo, setEditTodo, updateTodo}) => {
    const [inputValue, setInputValue] = useState(editTodo.title)

   

  return (
    <div className='fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]  overflow-hidden bg-white p-10 shadow-2xl'>
        <form className='flex flex-col w-fit'>
            <input type='text' required className="flex-1 border-2 rounded-md p-2 border-blue-500 px-3 outline-none h-full min-w-[300px] input-width" value={inputValue} onChange={(e)=> setInputValue(e.target.value)}/>
            <div className='flex justify-between mt-4'>
                
            <button type='submit' className='bg-blue-500 text-white p-2 rounded-md hover:opacity-90' onClick={(e)=>updateTodo(e, editTodo.id, inputValue)}>Update</button>
            <p className='bg-red-500 text-white p-2 rounded-md hover:opacity-90 cursor-pointer' onClick={()=>setEdit(false)}>Cancel</p>
          
            </div>
        </form>
      
    </div>
  )
}

export default Modal
