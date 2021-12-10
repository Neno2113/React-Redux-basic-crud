

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearSelectedSection } from '../../actions/section';
import { uiCloseForm, uiOpenForm } from '../../actions/ui';
import { CreateSection } from './CreateSection';
import { SectionList } from './SectionList';

export const SectionScreen = ({ section }) => {


    const dispatch = useDispatch();

    const { formShow } = useSelector(state => state.ui);

    
    useEffect(() => {
        dispatch( uiCloseForm() );
    }, [dispatch])



    const handleShowForm = () => {
        dispatch( uiOpenForm() );
        dispatch( clearSelectedSection() );
    }

    const handleCloseForm = () => {
        dispatch( uiCloseForm() );
    }


    return (
        <div>
            <h2>{ section }</h2>
            {
                (formShow)
                ? (
                    <div className="d-grid gap-2 d-md-flex d-sm-flex  justify-content-md-end my-2 ">
                        <button 
                            className="btn btn-danger"
                            onClick= { handleCloseForm }    
                        >
                        <i className="fa-solid fa-left-long mx-1"></i>
                           Volver
                        
                        </button>
                    </div>
                )
                : (
                    <div className="d-grid gap-2 d-md-flex d-sm-flex  justify-content-md-start my-2 ">
                        <button 
                            className="btn btn-primary"
                            onClick= { handleShowForm }    
                        >
                        <i className="fa-solid fa-circle-plus mx-1"></i> 
                         Crear
                        
                        </button>
                    </div>
                )
            }

            {
            (formShow)
            ? ( <CreateSection /> )
            : ( <SectionList /> )
            }
        </div>
    )
}
