import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';

import { startCreatingCourse, startUpdatingCourse } from '../../actions/course';
import validator from 'validator';
import { startLoadingSections } from '../../actions/section';
// import { uiCloseForm } from '../../actions/ui';


export const CreateCourse = () => {

    const dispatch = useDispatch();
    
    const [msgError, setMsgError] = useState(null);
    const { activeCourse } = useSelector(state => state.course);
    const { sections } = useSelector(state => state.section);

    // useEffect(() => {
        
    //     dispatch( uiCloseForm() );
      
    // }, [ dispatch ])

    useEffect(() => {
        
        dispatch( startLoadingSections() );
      
    }, [ dispatch ])

    const courseForm = {
        course: '',
        section: '',
        section_selected: ''
    }

    const [formValues, setFormValues] = useState(courseForm);


    const { course, section, section_selected} = formValues;

    useEffect(() => {
        if( activeCourse ){
            activeCourse.section = {
                value: activeCourse.section._id,
                label: activeCourse.section.section
            };
            activeCourse.section_selected = activeCourse.section.value;
            setFormValues( activeCourse )
        }
  
    }, [activeCourse, setFormValues])


    sections.map(
        section => {
            section.value = section.id;
            section.label = section.section;
            return section
        }
        
    )

    const handleInputChange = ( {target} ) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        })
    }

    const handleSelectChange = ( option ) => {
        setFormValues({
            ...formValues,
            section_selected: option.id,
            section: option
        })
    }

    
    const handleFormSubmit = (e) => {
        e.preventDefault();
        if( formValid() ){
            //Provisional

            if(activeCourse){
                // console.log(formValues);
                dispatch( startUpdatingCourse( formValues ))

            } else {
                dispatch( startCreatingCourse( formValues ) )
            }
        }
  
    }

    const formValid = () => {

        if(validator.isEmpty(course)){
            setMsgError('El curso es obligatorio!');
            return false;
        } else if( validator.isEmpty( section_selected) ){
            setMsgError('Debe seleccionar una secction.');
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
                <div className="col-lg-4 col-sm-6">
                    <div className="form-floating mb-1">
                        <input 
                            type="text" 
                            className="form-control" 
                            id="floatingInput" 
                            placeholder="Jon" 
                            name="course"
                            value= { course }
                            onChange={ handleInputChange }
                        />
                        <label htmlFor="floatingInput">Curso</label>
                    </div>
                </div>
                <div className="col-lg-4 col-sm-6 ">
                    <Select 
                        isSearchable
                        name="section"
                        value= { section }
                        onChange = { handleSelectChange }
                        options={sections}
                    >
                   
                    </Select>
                </div>
         
                
            </div>
            <div className="row">
         
            {
                    (activeCourse)
                    ?
                    (
                    <div className="d-grid gap-2 d-md-flex justify-content-md-end my-3">
                        <button type="submit" className="btn btn-warning">
                        <i className="fa-solid fa-pen-to-square mx-1"></i>
                        Editar</button>
    
                    </div>
                    )
                    : 
                    (
                    <div className="d-grid gap-2 d-md-flex justify-content-md-end my-3">
                        <button type="submit" className="btn btn-outline-dark">
                        <i className="fa-regular fa-floppy-disk mx-1"></i>
                        Guardar</button>
    
                    </div>
                    )
                }
            </div>
        </form>
    )
}
