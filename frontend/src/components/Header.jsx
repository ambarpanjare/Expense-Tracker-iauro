import { Link } from 'react-router-dom';

// function Header() {
//   return (
//     <header>
//       <nav>
//         <Link to="/">Home</Link>
//         <Link to="/login">Login</Link>
//         <Link to="/register">Register</Link>
//         <Link to="/expenses">Expenses</Link>
//       </nav>
//     </header>
//   );
// }

// export default Header;


// import React from 'react'

const Header = () => {
  return (
    <header>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        <Link to="/expenses">Expenses</Link>
      </nav>
    </header>
  )
}

export default Header