import React from 'react'
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa'
import { Link } from 'react-router-dom'


const Footer = () => {
  return (
    <footer className='bg-blue-900 text-white py-8 px-4 md:px-16 lg:px-24'>
        <div className='container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8'>
            <div>
                <h3 className='text-xl font-semibold'>Khareed-Ghar</h3>
                <p className='mt-4'>
                    Your one step for all your needs. Shop with ease, and experience best online shopping.
                </p>
            </div>
            <div className='flex flex-col md:items-center'>
                <h4 className='text-xl dont-semibold'>Quick Links</h4>
                <ul className='mt-4 space-y-2'>
                    <li>
                        <Link className='hover:underline'>Home</Link>
                    </li>
                    <li>
                        <Link className='hover:underline'>About</Link>
                    </li>
                    <li>
                        <Link className='hover:underline'>Become a Seller</Link>
                    </li>
                </ul>
            </div>
            <div>
                <div>
                    <h4 className='text-xl dont-semibold'>Follow Us</h4>
                </div>
                <div className='flex space-x-4 mt-4'>
                <a href="" className='hover:text-grey-400'><FaFacebook /></a>
                <a href="" className='hover:text-grey-400'><FaTwitter /></a>
                <a href="" className='hover:text-grey-400'><FaInstagram /></a>
                </div>
            </div>
        </div>
    </footer>
  )
}

export default Footer