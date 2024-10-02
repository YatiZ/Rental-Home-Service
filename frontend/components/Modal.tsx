'use client'
import React, { useCallback, useEffect, useState } from 'react'

interface ModalProps{
    label: string;
    content: React.ReactElement;
    isOpen: Boolean;
    close: ()=>void;

}

const Modal = ({label, content, isOpen, close}:ModalProps) => {
    const [showModal, setShowModal] = useState(isOpen);

    useEffect(()=>{
        setShowModal(isOpen)
        console.log(showModal)
    },[isOpen])

    const handleClose = useCallback(()=>{
        setShowModal(false)
        setTimeout(()=>{
            close();
        },300)
        console.log('close')
        
    },[close])

    //this support the handleclose to close the modal 
    if(!isOpen){
        return null;
    }

  return (
    <div className='flex items-center justify-center fixed bg-black/60 inset-0 z-50'>
        <div className="relative w-[90%] md:w-[80%] lg:w-[700px] my-6 mx-auto h-auto">
           <div className={`translate duration-600 h-full ${showModal? 'translate-y-0 opacity-100':'translate-y-full opacity-10'}`}>
               <div className="bg-white w-full h-auto rounded-xl relative flex flex-col">
                <header className="h-[60px]">
                {label}
                   <div onClick={handleClose}>Close</div>
       
                </header>
                <section className="">
                    {content}
                </section>
               </div>
           </div>
       
        </div>
        
      
    </div>
  )
}

export default Modal