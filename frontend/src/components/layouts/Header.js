import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Search from './Search';
import {useDispatch, useSelector} from 'react-redux';
import {DropdownButton, Dropdown, Image} from 'react-bootstrap';
import { logout } from '../../actions/userActions';


export default function Header () {
    const { isAuthenticated, user } = useSelector(state => state.authState);
    const { items:cartItems } = useSelector(state => state.cartState)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logoutHandler = () => {
      dispatch(logout);
    }


    return (
    <nav className="navbar row">
        <div className="col-12 col-md-3">
          <div className="navbar-brand">
            <Link to="/">
              <img width="200px" height='100px' alt='chenthur wershun Logo' src="/images/logo1.png" />
            </Link>
            </div>
        </div>
  
        <div className="col-12 col-md-6 mt-2 mt-md-0">
           <Search/>
        </div>
  
        <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
          { isAuthenticated ? 
            (
              <Dropdown className='d-inline' >
                  <Dropdown.Toggle variant='default text-white pr-5' id='dropdown-basic'>
                    <figure className='avatar avatar-nav'>
                      <Image width="50px" src={user.avatar??'./images/default_avatar.png'}  />
                    </figure>
                    <span>{user.name}</span>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                      { user.role === 'admin' && <Dropdown.Item onClick={() => {navigate('admin/dashboard')}} className='text-dark'>Dashboard</Dropdown.Item> }
                      <Dropdown.Item onClick={() => {navigate('/myprofile')}} className='text-dark'>Profile</Dropdown.Item>
                      <Dropdown.Item onClick={() => {navigate('/orders')}} className='text-dark'>Orders</Dropdown.Item>
                      <Dropdown.Item onClick={logoutHandler} className='text-danger'>Logout</Dropdown.Item>
                  </Dropdown.Menu>
              </Dropdown>
            )
          
          :
            <Link to="/login"  className="btn" id="login_btn">Login</Link>
          }
          <Link to="/cart"><span id="cart" className="ml-3">Cart</span></Link>
          <span className="ml-1" id="cart_count">{cartItems.length}</span>
        </div>
    </nav>
    )
}
// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import Search from './Search';
// import { useDispatch, useSelector } from 'react-redux';
// import { logout } from '../../actions/userActions';
// import './Header.css';  // Import your custom CSS file

// export default function Header() {
//   const { isAuthenticated, user } = useSelector(state => state.authState);
//   const { items: cartItems } = useSelector(state => state.cartState);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const logoutHandler = () => {
//     dispatch(logout());
//   };

//   return (
//     <nav className="navbar">
//       <div className="navbar-section">
//         <div className="navbar-brand">
//           <Link to="/">
//             <img
//               className="navbar-logo"
//               src="/images/logo1.png"
//               alt="chenthur wershun Logo"
//             />
//           </Link>
//         </div>
//       </div>

//       <div className="navbar-section">
//         <Search />
//       </div>

//       <div className="navbar-section text-center">
//         {isAuthenticated ? (
//           <div className="dropdown">
//             <button className="dropdown-toggle">
//               <figure className="avatar avatar-nav">
//                 <img
//                   className="avatar-img"
//                   src={user.avatar ?? './images/default_avatar.png'}
//                   alt="User Avatar"
//                 />
//               </figure>
//               <span>{user.name}</span>
//             </button>
//             <div className="dropdown-menu">
//               {user.role === 'admin' && (
//                 <button
//                   onClick={() => navigate('/admin/dashboard')}
//                   className="dropdown-item"
//                 >
//                   Dashboard
//                 </button>
//               )}
//               <button
//                 onClick={() => navigate('/myprofile')}
//                 className="dropdown-item"
//               >
//                 Profile
//               </button>
//               <button
//                 onClick={() => navigate('/orders')}
//                 className="dropdown-item"
//               >
//                 Orders
//               </button>
//               <button
//                 onClick={logoutHandler}
//                 className="dropdown-item text-danger"
//               >
//                 Logout
//               </button>
//             </div>
//           </div>
//         ) : (
//           <Link to="/login" className="btn">
//             Login
//           </Link>
//         )}
//         <Link to="/cart" className="cart-link">
//           <span id="cart">Cart</span>
//           <span id="cart_count">{cartItems.length}</span>
//         </Link>
//       </div>
//     </nav>
//   );
// }
