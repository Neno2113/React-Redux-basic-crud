import React from 'react'
import { NavLink } from 'react-router-dom'

export const Menu = () => {
    return (
    <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
        <div className="position-sticky pt-3">
            <ul className="nav flex-column">
                <li className="nav-item">
                    <NavLink className="nav-link " aria-current="page" to="student">
                        <i className="fas fa-user-graduate mx-2"></i>
                        Estudiante
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to="course">
                        <i className="fas fa-university mx-2"></i>
                        Curso
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to="section">
                        <i className="fas fa-sort-alpha-up-alt mx-2"></i>
                        Seccion
                    </NavLink>
                </li>
             
            </ul>
            
          
        </div>
    </nav>

    )
}
