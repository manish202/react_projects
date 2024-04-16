import {Link} from "react-router-dom";
import {useState} from "react";
const Navbar = () => {
    const [toggle,chToggle] = useState(false);
    return(
        <nav className="container navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand">Projects</Link>
                <button className="navbar-toggler" type="button" onClick={() => chToggle(o => !o)}>
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={`collapse navbar-collapse ${toggle ? 'show':''}`} id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link to="/" className="nav-link active">TodoApp</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/accordion" className="nav-link active">Accordion</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/github_users" className="nav-link active">Github Users</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/shopping_cart" className="nav-link active">Shopping Cart</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}
export default Navbar;