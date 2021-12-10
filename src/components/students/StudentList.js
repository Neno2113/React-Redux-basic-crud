import React, { useEffect } from 'react';

import DataGrid from 'react-data-grid';
import { useDispatch } from 'react-redux';
// import moment from 'moment';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { startDeletingStudent, selectStudent, startLoadingStudents } from '../../actions/student';
import { uiOpenForm } from '../../actions/ui';

const columns = [
    { key: 'options', name: 'Opciones' },
  { key: 'name', name: 'Nombre' },
  { key: 'surname', name: 'Apellido' },
  { key: 'email', name: 'Email' },
  { key: 'edad', name: 'Edad' },
];




export const StudentList = () => {

    const dispatch = useDispatch();
    const { students } = useSelector(state => state.student);

    useEffect(() => {

        dispatch( startLoadingStudents() )
      
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

            dispatch( startDeletingStudent() );
       
            }
          })
        
    }


    students.map(
        student => {
            student.options = btns(student.id);
            return student
        }
        
    )

    // console.log(students);

    const handleDataGrid = (e) => {
        dispatch( selectStudent(e) );
    }


    return (
        <DataGrid
            onRowClick={ handleDataGrid }
            columns={columns} 
            rows={students} 
            className="rdg-light"
        />
    )
}
