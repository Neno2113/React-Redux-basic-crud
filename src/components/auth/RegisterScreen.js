import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import useForm from '../../hooks/useForm';
import validator from 'validator';
import { startRegister } from '../../actions/auth';

export const RegisterScreen = () => {

    const [msgError, setMsgError] = useState(null);
    const dispatch = useDispatch();

    const [formValues, handleInputChange ] = useForm({
        name: '',
        email: '',
        password: '',
        password2: ''
    })

    const { email, password, name, password2 } = formValues;


    const handleRegisterSubmit = ( e ) => {
        e.preventDefault();

        if( formValid() ){

            dispatch( startRegister(  email, password, name  ) );
            
        }

    }


    const formValid = () => {

        if(validator.isEmpty( name ) ){
            setMsgError('El nombre es obligatorio');
            return false;
        } else if(!validator.isEmail(email)){
            setMsgError('El email no es valido!');
            return false;
        } else if( password.length <= 5){
            setMsgError('La contraseña debe ser al menos de 6 caracteristicas!');
            return false;
        } else if(password !== password2){
            setMsgError('La contraseñas deben coincidir!!');
            return false;
        }

        setMsgError( null );
        return true;
    }
    return (    
        <>
        <h2 className="auth__title">Registrarse</h2>
        {
            msgError &&
            (
                <div className="msg_error">
                { msgError }
                </div>
            )
            
        }

        <form 
            onSubmit={ handleRegisterSubmit }
        >
            <div className="container__form">
                <input 
                    type="text" 
                    placeholder="Name" 
                    name= 'name'
                    value= { name }
                    onChange= { handleInputChange }
                    autoComplete="off"
                    autoCorrect="off"
                    className="container__input auth__input" 
                />
                <label className="container__label">Nombre</label>
            </div>
      

            <div className="container__form">
                <input 
                    type="email" 
                    placeholder="Email" 
                    name='email'
                    value={ email }
                    onChange={ handleInputChange }

                    autoComplete="off"
                    className="container__input auth__input" 
                />
                <label className="container__label">Email</label>
            </div>
      
            <div className="container__form">
                <input 
                    type="password" 
                    placeholder="Contraseña" 
                    name='password'
                    value={ password }
                    onChange={ handleInputChange }
                    className="container__input auth__input" 
                />
               <label className="container__label">Contraseña</label>
            </div>

            <div className="container__form">
                <input 
                    type="password" 
                    placeholder="Confirmar contraseña" 
                    className="container__input auth__input" 
                    name='password2'
                    value={ password2 }
                    onChange={ handleInputChange }
                />
               <label className="container__label">Confirmar Contraseña</label>
            </div>

            <button 
                className="btn btn-success"
            >
                Registrar
            </button>

        

        </form>
    </>
    )
}
