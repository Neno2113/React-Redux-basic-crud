import React, { useEffect } from 'react'
import {
    BrowserRouter ,
    Routes,
    Route,
} from "react-router-dom";

import { DashboardRoutes } from './DashboardRoutes';
import { AuthRouter } from './AuthRouter';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';
import { useDispatch, useSelector } from 'react-redux';
import { startChecking } from '../actions/auth';
import { Wait } from '../components/ui/Wait';



export const AppRouter = () => {

    const dispatch = useDispatch();
    const { checking } = useSelector(state => state.auth);


    useEffect(() => {
        
        dispatch( startChecking() );
    
    }, [ dispatch ])


    if( checking ){
        return (<Wait /> )
    }


    return (
        <BrowserRouter>
            <Routes>
                <Route 
                    path="/auth/*" element={
                        <PublicRoute>
                            <AuthRouter />
                        </PublicRoute>
                    }
                
                
                />

                <Route 
                    path="/*" element={
                        <PrivateRoute>
                            <DashboardRoutes />
                        </PrivateRoute>
                    }
                
                
                />

                {/* 
                <Route path="/*" element={<DashboardRoutes />}  >
                </Route>

                <Route path="/auth/*" element={ <AuthRouter />}> </Route> */}

            </Routes>


        </BrowserRouter>
    )
}
