import React from 'react'
import Footer from '../components/common/Footer'

function Contact() {
  return (
    <>
    
    <div className="mx-auto mt-20 flex w-11/12 max-w-maxContent flex-row justify-between gap-10 text-white">

      <div className="w-[40%]">
        <ContactDetails />
      </div>

      <div className="w-[60%]">
        <ContactForm />
      </div>
    </div>
    
    <Footer></Footer>
    </>
  )
}

export default Contact