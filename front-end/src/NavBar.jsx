import { Link } from "react-router-dom";

export default function NavBar() {
    return(
        <nav className="site-nav text-uppercase navbar navbar-expand-mb navbar-dark w-100 bg-primary">

            <div className="container-fluid">
                <a className="navbar-brand font-weight-normal" href="/"><i className="fas fa-cube mr-2"></i> Info Grazers</a>

                <div className="navbar-nav ml-auto">
                    <a className="nav-item nav-link" href="/"><i className="fas fa-home mr-2"></i> Home</a>
                    <a className="nav-item nav-link" href="/about"><i className="fas fa-info-circle"></i> About</a>
                    <a className="nav-item nav-link" href="/articles"><i className="fas fa-newspaper"></i> Articles</a>
                </div>
            </div>
        </nav>
    )
}