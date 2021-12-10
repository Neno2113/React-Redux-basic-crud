import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { startLogout } from '../../actions/auth';


export const Header = () => {

    const dispatch = useDispatch();

    const { name } = useSelector(state => state.auth);

    const handleClick = () => {
        
        dispatch( startLogout() );

    }

    return (
    <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
        <Link className="navbar-brand col-md-3 col-lg-2 me-0 px-3" to="/student" >Usuario { name }</Link>
        <button className="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
        </button>
        {/* <input className="form-control form-control-dark w-100" type="text" placeholder="Search" aria-label="Search" /> */}
        <div className="navbar-nav">
            <div className="nav-item text-nowrap">
            <Link 
                to="/"
                className="nav-link px-3 btn-logout" 
                onClick={ handleClick }
            >
                Sign out
            </Link>
            </div>
        </div>
    </header>

    )
}
