import "./navbar.scss";
import { Link } from 'react-router-dom';

const Navbar = ()=>{
    return(
        <nav className="navbar">
            <div className="logo">
                OffQuiz
            </div>
            <ul className="navLink">
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/register">SignUp</Link></li>
                <li><Link to="/">About Us</Link></li>
            </ul>
        </nav>
    );
}

export default Navbar;