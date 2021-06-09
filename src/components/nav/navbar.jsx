import "./navbar.scss";
import {Link} from 'react-router-dom';
const Navbar = ()=>{
    return(
        <nav>
            <div className="logo">
                OffQuiz
            </div>
            <ul className="navLink">
                <li><Link to="/">Login</Link></li>
                <li><Link to="/">SignUp</Link></li>
                <li><Link to="/">About Us</Link></li>
            </ul>
        </nav>
    );
}

export default Navbar;