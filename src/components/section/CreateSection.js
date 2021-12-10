import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import validator from 'validator';
import { startUpdateSection, startCreateSecion } from "../../actions/section";

export const CreateSection = () => { const dispatch = useDispatch();

    const [msgError, setMsgError] = useState(null);
    const { activeSection } = useSelector(state => state.section);

    const sectionForm = {
        section: '',
    }

    const [formValues, setFormValues] = useState(sectionForm);


    const { section} = formValues;

    useEffect(() => {
        if( activeSection ){
            setFormValues( activeSection )
        }
  
    }, [activeSection, setFormValues])


    const handleInputChange = ( {target} ) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        })
    }


    const handleFormSubmit = (e) => {
        e.preventDefault();

        // console.log(formValues);

        if( formValid() ){
            const { section } = formValues;
            if(activeSection){
                // console.log(formValues);
                dispatch( startUpdateSection( section ))

            } else {
                dispatch( startCreateSecion( section ) )
            }
        }
  
    }


    const formValid = () => {

        if(validator.isEmpty(section)){
            setMsgError('La seccion es obligatorio!');
            return false;
        } 

        setMsgError( null );
        return true;
    }


    return (
        <form 
            className="shadow p-3 mb-5 bg-body rounded"
            onSubmit={ handleFormSubmit }
        >
            <div className="row">
            {
                msgError &&
                (
                    <div className="msg_error">
                    { msgError }
                    </div>
                )
                
            }
                <div className="col-lg-12 col-sm-12 d-md-flex justify-content-md-center">
                    <div className="form-floating mb-1">
                        <input 
                            type="text" 
                            className="form-control" 
                            id="floatingInput" 
                            placeholder="Jon" 
                            value= { section }
                            onChange={ handleInputChange }
                            name="section"
                        />
                        <label htmlFor="floatingInput">Seccion</label>
                    </div>
                </div>
        
                
            </div>
            <div className="row">
        
                <div className="d-grid gap-2 d-md-flex justify-content-md-end my-3">
                    <button type="submit" className="btn btn-outline-dark">
                        <i className="fa-regular fa-floppy-disk mx-1"></i>
                        Guardar</button>

                </div>
            </div>
        </form>
    )
}
