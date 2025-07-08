import { Link } from "react-router-dom";

export default function NavBar() {
    return(

        <nav className="site-nav navbar navbar-expand-md navbar-dark bg-primary sticky-top">
            <div className="container-fluid">
                <a className="navbar-brand font-weight-normal" href="/"><i className="fas fa-cube mr-2"></i> Info Grazers</a>
             
            
                <button 
                type="button" 
                className="navbar-toggler" 
                data-toggle="collapse" 
                data-target="#myTogglerNav" 
                aria-controls="myTogglerNav"
                >
                    <span className="navbar-toggler-icon">
                        <i className="fas fa-bars">
                        </i>
                    </span>
                </button>
                <section class="collapse navbar-collapse" id="myTogglerNav">
                    <div className="navbar-nav ml-auto">
                        <a className="nav-item nav-link" href="/"><i className="fas fa-home"></i> Home</a>
                        <a className="nav-item nav-link" href="/about"><i className="fas fa-info-circle"></i> About</a>
                        <a className="nav-item nav-link" href="/articles"><i className="fas fa-newspaper"></i> Articles</a>
                    </div>
                </section>
            </div>
        </nav>

    )
}