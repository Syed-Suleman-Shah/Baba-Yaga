import React, { useState } from "react";
import { FaSearch, FaShoppingCart, FaUser, FaXbox } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import categories from "../../../public/CategoryData.json"; // Adjust the path based on your file structure
import { useAuthService } from "../../services/authService";
import { useDispatch, useSelector } from "react-redux";
import Cart from "../../pages/MainPage/Cart";
import { setSearchTerm } from "../../slices/ProductSlice";


const Navbar = () => {

  const products = useSelector(state => state.cart.products)
  const [search, setSearch] = useState()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSearch = (e) =>{
    e.preventDefault()
    dispatch(setSearchTerm(search))   
    navigate('/filter-data')
  }

  const { signout } = useAuthService();
  
  // const [isCartOpen, setIsCartOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // const handleCart = () => {
    
  //   setIsCartOpen(!isCartOpen)
  //   window.location.href = '/cart'
  // }

  const handleLogin = () => {
    window.location.href = '/signin';
  }
  const handleLogout = async () => {
    await signout();
    window.location.href = '/';
  }
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 md:px-16 lg:px-24 py-4 flex justify-between items-center">
        <div className="text-lg font-bold">
          <Link to="/">Khareed-Ghar</Link>
        </div>
        <div className="relative flex-1 mx-4">
          <form action="" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search"
              className="w-full border py-2 px-4"
              onChange={(e) => setSearch(e.target.value)}
            />
            <FaSearch className="absolute top-3 right-3 text-blue-900" />
          </form>
        </div>
        <div className="flex items-center space-x-4">
          <Link to="/cart" className="relative">
            <FaShoppingCart className="text-lg text-blue-900 hover:text-blue-500" />
            {products.length > 0 && (
              <span className="absolute top-0  text-xs w-4 left-3 bg-red-600 rounded-full flex 
              justify-center items-center text-white">
                {products.length}
              </span>
            )}
          </Link>

          <button className="hidden md:block" onClick={handleLogin}>Login | Register</button>
          <button className="hidden md:block" onClick={handleLogout}>Logout</button>
          <button className="block md:hidden">
            <FaUser />
          </button>
          <button className="block md:hidden">
            <FaXbox/>
          </button>
        </div>
      </div>
      <div className="bg-blue-900 text-white flex items-center justify-center space-x-10 py-4 text-sm font-bold">
        <Link to="/" className="hover:underline">
          Home
        </Link>
        <Link to="/cart" className="hover:underline" >
          Cart
        </Link>
        
        <Link to="/sell" className="hover:underline">
          Sell
        </Link>
        {/* Categories Link with Dropdown */}
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="hover:underline focus:outline-none"
          >
            Categories
          </button>
          {isDropdownOpen && (
            <div className="absolute left-0 mt-2 w-40 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-10">
              <ul className="py-1">
                {categories.map((category, index) => (
                  <li
                    key={index}
                    className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    <span className="text-lg">{category.icon}</span>
                    <span className="text-sm text-gray-700">{category.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

    {/* {
      isCartOpen && <div>
        <Cart />
      </div>
    } */}
    </nav>
  );
};

export default Navbar;
