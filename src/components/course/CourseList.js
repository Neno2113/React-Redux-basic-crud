import React, { useEffect } from 'react';
import DataGrid from 'react-data-grid';

import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { startDeletingCourse, selectCourse, startLoadingCourses } from '../../actions/course';
import { uiOpenForm } from '../../actions/ui';

const columns = [
    { key: 'options', name: 'Opciones' },
  { key: 'course', name: ' Curso' },
  { key: 'seccion', name: 'Seccion' },
];


export const CourseList = () => {

    const dispatch = useDispatch();
    const { courses } = useSelector(state => state.course);
    

    useEffect(() => {
        
        dispatch( startLoadingCourses() );
    }, [dispatch ])

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

            dispatch( startDeletingCourse() );
           
            }
          })
        
    }

      
    courses.map(
        course => {
            course.options = btns(course.id);
            course.seccion = course.section.section;
            return course
        }
        
    )


    const handleDataGrid = (e) => {
        dispatch( selectCourse(e) );
    }
    

    return (
        <DataGrid
            onRowClick={ handleDataGrid }
            columns={columns} 
            rows={ courses } 
            className="rdg-light"
        />
    )
}
