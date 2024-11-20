import React, { useState } from 'react'
import { FaTrashAlt } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import Modal from '../../components/Common/Modal'
import ChangeAddress from '../../components/Common/ChangeAddress'
import { removeFromCart } from '../../slices/CartSlice'
import {useNavigate} from 'react-router-dom'


const Cart = () => {
  
  const cart = useSelector(state => state.cart);
  const [address, setAddress] = useState('House 14, Street 40, I14-3, Islamabad');
  const [isModelOpen, setIsModelOpen] = useState(false);
  const dispatch = useDispatch()
  const navigate = useNavigate();

  return (
    <div className='container mx-auto py-8 min-h-96 px-4 md:px-16 lg:px-24'>
      {cart.products.length > 0 ?
      <div>
        <h3 className='text-2xl font-semibold mb-4'>Shopping Cart</h3>
        <div className='flex flex-col md:flex-row justify-between space-x-10 mt-8'>
          <div className='md:w-2/3'>
            <div className='flex justify-between border-b item-center mb-4 text-xs font-bold'>
              <div className='flex space-x-12'>
                <p>Product</p>
                <p className='w-[140px]'>Name</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Sub-Total</p>
                <p>Remove</p>
              </div>
            </div>
            <div>
              {cart.products.map((product) => (
                <div key={product.id}
                  className='flex items-center space-x-12 justify-between  border-b'>
                  <div className=' md:flex items-center'>
                    <img src={product.image} alt="" className='w-20 h-20 object-contain rounded'/>
                    <div className='bg-white flex-1 ml-2 '>
                      <h3 className='text-sm font-semibold'>{product.name}</h3>
                    </div>
                  </div>
                  <div className='flex bg-white items-center'>
                    <p>${product.price}</p>
                  </div>
                  <div className='flex bg-white items-center justify-center border border '>
                    <p className='text-xl px-2'>{product.quantity}</p>
                  </div>
                  <div className='flex bg-white items-center  justify-center '>
                    <p>{(product.price)}</p>
                  </div>
                  <button className=' text-red-500 hover:text-red-700'
                  onClick={()=>dispatch(removeFromCart(product.id))}>
                    <FaTrashAlt />
                  </button>
                </div>
              ))}
            </div>
          </div>
          
          <div className='md:w-1/3 bg-white p-6 rounded-lg shadow-md border'>
              <h3 className='text-sm font-semibold mb-5'>Summary</h3>
              <div className='flex justify-between mb-5 border-b pb-1'>
                <span className='text-sm'>Total Items</span>
                <span>{cart.totalQuantity}</span>
              </div>
              <div className='mb-4 border-b pb-2 '>
                <p>Shipping:</p>
                <p className='ml-2'>Shipping to:</p>
                <span className='text-xs font-bold'>{address}</span>
                <button onClick={()=>setIsModelOpen(true)} className='text-blue-900 no-underline 
                text-bold mt-1 w-full bg-gray-300 hover:bg-blue-900 hover:text-white rounded-md'>
                  Change Address</button>

              </div>
              <div className='flex justify-between mb-4'>
                <span>Total Price:</span> 
                <span>{cart.totalPrice.toFixed(2)}</span>
              </div>
              <button className='w-full bg-blue-900 text-white py-2 hover:bg-blue-700 rounded-md'
              onClick={() => {navigate('/checkout')}}
              >Checkout</button>
          </div>
        </div>
        <Modal
          isModelOpen={isModelOpen}
          setIsModelOpen={setIsModelOpen}
        >
          <ChangeAddress setAddress={setAddress} setIsModelOpen={setIsModelOpen} />
        </Modal>

      </div>
      :
      <div className='flex justify-center'>
        <img className='h-96' src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-illustration-download-in-svg-png-gif-file-formats--shopping-ecommerce-simple-error-state-pack-user-interface-illustrations-6024626.png?f=webp" alt="Cart is Empty" />
      </div>

      }
    </div>
  )
}

export default Cart