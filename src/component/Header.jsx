import { Link } from "react-router-dom";

export default function Header() {
    return (
      <div className="flex justify-between items-center py-4 px-6 bg-black text-white h-[100px] w-full">
        <Link to={'/'} className="text-lg font-bold">LOGO</Link>
        <div className="flex space-x-6">
          <a href="/shop" className="hover:text-yellow-400 hover:scale-105 hover:-translate-y-1 hover:duration-200">Shop</a>
          <a href="#" className="hover:text-yellow-400 hover:scale-105 hover:-translate-y-1 hover:duration-200">Contact</a>
          <a href="#" className="hover:text-yellow-400 hover:scale-105 hover:-translate-y-1 hover:duration-200">Search</a>
          <Link to={'/cart'} className="hover:text-yellow-400 hover:scale-105 hover:-translate-y-1 hover:duration-200">Cart</Link>
        </div>
        <div className="flex space-x-4 items-center">
         
          <Link to={'/register'} className="hover:text-yellow-400 hover:scale-105 hover:-translate-y-1 hover:duration-200">Register</Link>
          <Link to={'/login'} className="hover:text-yellow-400 hover:scale-105 hover:-translate-y-1 hover:duration-200">Login</Link>
        </div>
      </div>
    );
  };