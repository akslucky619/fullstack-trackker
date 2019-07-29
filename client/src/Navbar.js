// import React from 'react'
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// import logo from "./logo.svg";


// export default function Navbar(){
//     return(
//       <div className="App">

//         <div className="container">
//             <nav className="navbar navbar-expand-lg navbar-light bg-light">
//               <img
//                 src={logo}
//                 width="30"
//                 height="30"
//                 alt="CodingTheSmartWay.com"
//               />

//               <Link to="/" className="navbar-brand">
//                 Todo App
//               </Link>
//               <div className="collpase navbar-collapse">
//                 {localStorage.token ? (
//                   <ul className="navbar-nav mr-auto">
//                     <li className="navbar-item">
//                       <Link to="/todos" className="nav-link">
//                         Todos
//                       </Link>
//                     </li>
//                     <li className="navbar-item">
//                       <Link to="/create" className="nav-link">
//                         Create Todo
//                       </Link>
//                     </li>
//                   </ul>
//                 ) : (
//                   <ul className="navbar-nav mr-auto">
//                     <li className="navbar-item">
//                       <Link to="/register" className="nav-link">
//                         Register
//                       </Link>
//                     </li>
//                     <li className="navbar-item">
//                       <Link to="/login" className="nav-link">
//                         Login
//                       </Link>
//                     </li>
//                   </ul>
//                 )}
//               </div>
//             </nav>
//             <br />
//             </div>
//             </div>
//     )
// }