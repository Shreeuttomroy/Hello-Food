import { NavLink } from 'react-router-dom';
import FoodLogo from './foodhub.png'
import { useContext } from 'react';
import { AuthContext } from '../AuthProvider/AuthProvider';

function Navbar() {

  const {user,logOut} = useContext(AuthContext)
  const logoutuser=()=>{
    logOut()
  }

  const navlink = <>
    <li><NavLink to={""}>Home</NavLink></li>
    <li><NavLink to={"availablefoods"}>Available Food</NavLink></li>
    <li><NavLink to={"addfood"}>Add Food</NavLink></li>
    <li><NavLink to={"managemyfoods"}>Manage Food</NavLink></li>
    <li><NavLink to={"myfoodrequest"}>My Food Request</NavLink></li>

  </>
  const navlink2 = <>
    <li><NavLink to={""}>Home</NavLink></li>
    <li><NavLink to={"availablefoods"}>Available Food</NavLink></li>
    <li><NavLink to={"addfood"}>Add Food</NavLink></li>
    <li><NavLink to={"managemyfoods"}>Manage Food</NavLink></li>
    <li><NavLink to={"myfoodrequest"}>My Food Request</NavLink></li>
    <li><div><img className=' w-10 h-10 rounded-3xl ml-6' src={user?.photoURL} alt="" /></div></li>
    <li>{user?<button className='btn' onClick={logoutuser}>LogOut</button>:<NavLink to={"login"}>Login</NavLink>}</li>

  </>

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <a className=" relative btn btn-ghost normal-case text-xl leading-none h-fit flex w-24">
          <img className=' w-20 h-8' src={FoodLogo} alt="FoodHub" />
          <p className='text-sm'>FoodHub</p></a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {navlink}
        </ul>
      </div>
      <div className="navbar-end">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
          </label>
          <ul tabIndex={0} className="menu right-2 menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-slate-400 rounded-box w-52">
            {navlink2}
          </ul>
        </div>
        <div><img className='hidden lg:flex w-10 h-10 rounded-3xl ml-6' src={user?.photoURL} alt="" /></div>
      {user?<button className='btn hidden lg:flex' onClick={logoutuser}>LogOut</button>:<NavLink to={"login"}>Login</NavLink>}
      </div>
    </div>
  );
}

export default Navbar;