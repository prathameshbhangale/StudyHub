import React from 'react'
import Footer from '../components/common/Footer'
import ContactDetails from '../components/core/ContactusPage/ContactDetails'
import ContactUsForm from '../components/core/ContactusPage/ContactUsForm'

function Contact() {
  return (
    <>
    
    <div className="mx-auto mt-20 flex w-11/12 max-w-maxContent flex-row justify-between gap-10 text-white">

      <div className="w-[40%]">
        <ContactDetails></ContactDetails>
      </div>

      <div className="w-[60%]">
        <ContactUsForm></ContactUsForm>
      </div>
    </div>
    
    <Footer></Footer>
    </>
  )
}

export default Contact