import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import validator from 'validator';
import useForm from '../../hooks/useForm';

import { startLogin } from '../../actions/auth';
import { useDispatch } from 'react-redux';


export const LoginScreen = () => {

    const [msgError, setMsgError] = useState(null);
    const dispatch = useDispatch();

    const [formValues, handleInputChange ] = useForm({
        email: '',
        password: ''
    })

    const { email, password } = formValues;


    const handleLoginSubmit = ( e ) => {
        e.preventDefault();

        if( formValid() ){

            dispatch( startLogin( email, password  ) );
            
        }

    }


    const formValid = () => {

        if(!validator.isEmail(email)){
            setMsgError('El email no es valido!');
            return false;
        } else if(password.length <= 5){
            setMsgError('La contraseña debe ser al menos de 6 caracteristicas!');
            return false
        }

        setMsgError( null );
        return true;
    }

    return (
        <>
            <h2 className="auth__title">Login</h2>
            {
                msgError &&
                (
                    <div className="msg_error">
                    { msgError }
                    </div>
                )
                
            }


            <form 
                className= "container__form"
                onSubmit= { handleLoginSubmit }
            >
             
                <input 
                    type="email" 
                    placeholder="Email" 
                    name="email"
                    value={ email }
                    onChange= { handleInputChange }
                    className="container__input auth__input" 
                />
                <label className="container__label">Email</label>

                {/* <label className="container__label">Contraseña</label> */}
                <input 
                    type="password" 
                    placeholder="Contraseña" 
                    name="password"
                    value={ password }
                    onChange={ handleInputChange }
                    className="container__input auth__input" 
                />

                <button 
                    className="btn btn-primary"
                    type="submit"
                >
                    Iniciar sesion
                </button>

                <Link 
                    to="/auth/register"
                    className="link my-3"
                >
                    Create new account
                </Link>
            
                

            </form>
        </>

      
   
    )
}
