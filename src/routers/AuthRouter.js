import React from 'react';
import { Route, Routes } from 'react-router';

import { LoginScreen } from '../components/auth/LoginScreen';
import { RegisterScreen } from '../components/auth/RegisterScreen';
import { NoMatch } from '../components/ui/NoMatch';

export const AuthRouter = () => {
    return (
        <div className="auth__container shadow p-3 mb-5 rounded">
            <div className="auth__box-container">
                <Routes>

                    <Route index path="/" element={ < LoginScreen /> } />
                    <Route path="login" element={ < LoginScreen section={'Seccion'} /> } />
                    <Route path="register" element={ < RegisterScreen section={'Curso'} /> } /> 

                    <Route path="*" element={<NoMatch />} />


                </Routes>
            </div>

        </div>
    
    )
}
