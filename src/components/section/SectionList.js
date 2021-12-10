import React, { useEffect } from 'react';
import DataGrid from 'react-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { startDeletingSection, selectSection, startLoadingSections } from '../../actions/section';
import { uiOpenForm } from '../../actions/ui';

const columns = [
    { key: 'options', name: 'Opciones' },
  { key: 'section', name: 'Seccion' },
];



export const SectionList = () => {

    const dispatch = useDispatch();
    const { sections } = useSelector(state => state.section);

    useEffect(() => {
        
        dispatch( startLoadingSections() );
      
    }, [ dispatch ])


    const btns = (id) => (
        <div className="d-grid gap-2 d-md-flex d-sm-flex  justify-content-md-center my-1">
            <button 
                className="btn btn-sm"
                onClick={ () => handleEdit() }
            ><i className="fa-solid fa-pen-to-square"></i></button>
            <button 
                className="btn btn-sm"
                onClick={ handleDelete }
            >
            
            <i className="fa-solid fa-trash-can "></i></button>
        </div>
    )

    const handleEdit = () => {
        dispatch( uiOpenForm() );
    }

    const handleDelete = () => {
        Swal.fire({
            title: 'Estas seguro de eliminar este estudiante?',
            text: "No puede revertir esta accion!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminalo!'
          }).then((result) => {
            if (result.isConfirmed) {

            dispatch( startDeletingSection() );
           
            }
          })
        
    }

      
    sections.map(
        section => section.options = btns(section.id),
    )


    const handleDataGrid = (e) => {
        dispatch( selectSection(e) );
    }
    
    return (
        <DataGrid
            onRowClick={ handleDataGrid }
            columns={columns} 
            rows={sections} 
            className="rdg-light"
        />
    )
}
