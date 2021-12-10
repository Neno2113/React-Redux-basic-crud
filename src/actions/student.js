import Swal from "sweetalert2";

import { types } from "../types/types";
import { fetchWithToken } from '../helpers/fetch';
import { uiCloseForm } from "./ui";

export const startCreatingStudent = ( student ) => {
    return async( dispatch ) => {
        const { name, surname, section_selected:section, edad, email } = student;

        const newStudent = { name, surname, section, edad, email}
        const resp = await fetchWithToken('student',  newStudent , 'POST' );
        const body = await resp.json();

        // console.log( newStudent);

        if(body.ok){

            dispatch( createStudent( body.student ));
            dispatch( uiCloseForm() );
            Swal.fire('Success', `Estudiante <b>${body.student.name}</b> creado.` , 'success');
        } else {
            Swal.fire('Error', body.msg, 'error');
        }
    }
}

const createStudent = ( student ) => {

    student.options = '';

    return { 
    type: types.appCrateStudent,
    payload: student
    }
};



export const selectStudent = ( student ) => {
    
    student.options = '';
    return {type: types.appSelectStudent,
    payload: student
    }
}

export const startLoadingStudents = () => {
    return async( dispatch ) => {

        try {
            const resp = await fetchWithToken('student');
            const body = await resp.json();

            
            if( body.ok ){

          
    
                dispatch( loadStudents( body.students ));
            }
        } catch (error) {
            console.log(error);
        }

     
    }
}


const loadStudents = ( students ) => ({
    type: types.appLoadStudents,
    payload: students
})



export const clearSelectedStudent = () => ({
    type: types.appClearSelectedStudent
})

export const startUpdatingStudent = ( student ) => {
    return async( dispatch, getState) => {

        const { activeStudent } = getState().student;
        const { name, surname, section_selected:section, birthday, email } = student;
        const newStudent = { name, surname, section, birthday, email}
        try {
            const resp = await fetchWithToken(`student/${ activeStudent.id }`, newStudent, 'PUT');
            const body = await resp.json();

            if( body.ok ){
                dispatch( editStudent( body.student ) );
                dispatch( uiCloseForm() );
                Swal.fire(
                    'Actualizado!',
                    `El estudiante <b>${ body.student.name} </b> ha sido actualizada.`,
                    'success'
                )
            }
        } catch (error) {
            console.log(error);
        }
    }
}


const editStudent = ( student ) => ({
    type: types.appEditStudent,
    payload: student
})


export const startDeletingStudent = () => {
    return  async( dispatch, getState) => {

        const { activeStudent } = getState().student;
        try {
            const resp = await fetchWithToken(`student/${ activeStudent.id }`, {}, 'DELETE');
            const body = await resp.json();

            if( body.ok ){
                dispatch( deleteStudent() );
                Swal.fire(
                    'Eliminado!',
                    `El estudiante <b>${ body.student.name} </b> ha sido eliminado`,
                    'success'
                )
            }
        } catch (error) {
            console.log(error);
        }

    }
}


const deleteStudent = () => ({
    type: types.appDeleteStudent
})