import React from 'react'
import { FaLinkedin } from 'react-icons/fa'

const Footer = () => {
  const date = new Date().getFullYear();
  return (
    <div className='max-w-4xl mx-auto fotter_d mb-4 flex flex-col md:flex-row justify-between text-gray-50'> 
       <h2 className='text-center sm:text-center'> &copy; {date} E-pocket  </h2>
       <a href="https://www.linkedin.com/in/muhindo-galien/" target='_blank'>
        <h4 className='text-center sm:text-center cursor-pointer flex items-center'>Designed By Galien Muhindio <FaLinkedin className='ml-1'/> </h4>
       </a>
    </div>
  )
}

export default Footer