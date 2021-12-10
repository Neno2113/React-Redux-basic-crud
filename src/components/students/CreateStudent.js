import React, { useEffect, useState } from 'react'
import validator from 'validator';
import Select from 'react-select';

import { useDispatch } from 'react-redux';
// import useForm from '../../hooks/useForm';

import {  startUpdatingStudent, startCreatingStudent } from '../../actions/student';
import moment from 'moment';
import 'moment/locale/es';
import { useSelector } from 'react-redux';
import { startLoadingSections } from '../../actions/section';
moment.locale('es');


export const CreateStudent = () => {


    const dispatch = useDispatch();

    const [msgError, setMsgError] = useState(null);
    const { activeStudent } = useSelector(state => state.student);
    const { sections } = useSelector(state => state.section);

    const student = {
        name: '',
        surname: '',
        email: '',
        edad: '',
        section: '',
        section_selected: ''
    }

    const [formValues, setFormValues] = useState(student);

    const { name, surname, email,  edad, section, section_selected} = formValues;

    useEffect(() => {
        
        dispatch( startLoadingSections() );
      
    }, [ dispatch ])

    useEffect(() => {
        if( activeStudent ){
         
            activeStudent.section = {
                value: activeStudent.section._id,
                label: activeStudent.section.section
            };
            activeStudent.section_selected = activeStudent.section.value;
            setFormValues( activeStudent )
        }
  
    }, [activeStudent, setFormValues])

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
            // const age = moment(edad).fromNow(true);
            if(activeStudent){
              
                dispatch( startUpdatingStudent( formValues ))

            } else {
                
                // console.log(formValues);
                // console.log( formValues );
                dispatch( startCreatingStudent( formValues ) )
            }
        }
  
    }

    const formValid = () => {

        if(validator.isEmpty(name)){
            setMsgError('El nombre es obligatorio!');
            return false;
        } else if(validator.isEmpty(surname)){
            setMsgError('El apellido es obligatorio!');
            return false;
        }else if( !validator.isEmail(email)){
            setMsgError('Debe digitar un email valido!');
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
                            name="name"
                            value= { name }
                            onChange = { handleInputChange }
                        />
                        <label htmlFor="floatingInput">Nombre</label>
                    </div>
                </div>
                <div className="col-lg-4 col-sm-6">
                    <div className="form-floating mb-1">
                        <input 
                        type="text" 
                        className="form-control" 
                        id="floatingInput" 
                        placeholder="Doe" 
                        name="surname"
                        value= { surname }
                        onChange = { handleInputChange }
                    />
                        <label htmlFor="floatingInput">Apellido</label>
                    </div>
                </div>
                <div className="col-lg-4 col-sm-6">
                    <div className="form-floating mb-1">
                        <input 
                        type="text" 
                        className="form-control" 
                        id="floatingInput" 
                        placeholder="Edad" 
                        name="edad"
                        value= { edad }
                        onChange = { handleInputChange }
                    />
                        <label htmlFor="floatingInput">Edad</label>
                    </div>
                </div>
                
            </div>
            <div className="row">
                <div className="col-lg-4 col-sm-6 my-2">
                    <div className="form-floating mb-1">
                        <input 
                        type="text" 
                        className="form-control" 
                        id="floatingInput" 
                        placeholder="jhone@doe.com" 
                        name="email"
                        value= { email }
                        onChange = { handleInputChange }
                    />
                        <label htmlFor="floatingInput">Email</label>
                    </div>
                </div>
                <div className="col-lg-4 col-sm-6 my-2">
                    <Select 
                        isSearchable
                        name="section"
                        value= { section }
                        onChange = { handleSelectChange }
                        options={sections}
                    >
                    </Select>
                </div>
                {
                    (activeStudent)
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
