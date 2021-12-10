import Swal from "sweetalert2";
import { fetchWithToken } from "../helpers/fetch";
import { types } from "../types/types";
import { uiCloseForm } from "./ui";



export const startCreatingCourse = ( courseObject ) => {
    return async( dispatch ) => {

        const { course, section_selected:section } = courseObject;
        const resp = await fetchWithToken('course', { course, section }, 'POST');
        const body = await resp.json();

        if( body.ok ){
            dispatch( createCourse( body.course ) );
            dispatch( uiCloseForm() );
            Swal.fire('Success', `Curso <b>${body.course.course}</b> creado.` , 'success');
        } else {
            Swal.fire('Error', body.msg, 'error');
        }

    }
}

const createCourse = ( course ) => {

    course.options = '';

    return { 
    type: types.appCrateCourse,
    payload: course
    }
};



export const selectCourse = ( course ) => {
    
    course.options = '';
    return {type: types.appSelectCourse,
    payload: course
    }
}


export const clearSelectedCourse = () => ({
    type: types.appClearSelectedCourse
})

export const startUpdatingCourse = ( courseObject ) => {
    return async( dispatch, getState) => {

        const { activeCourse } = getState().course;
        const { course, section_selected:section } = courseObject;
        try {
            const resp = await fetchWithToken(`course/${ activeCourse.id }`, {course, section}, 'PUT');
            const body = await resp.json();

            if( body.ok ){
                dispatch( editCourse( body.course ) );
                dispatch( uiCloseForm() );
                Swal.fire(
                    'Actualizado!',
                    `El curso <b>${ body.course.course} </b> ha sido actualizado`,
                    'success'
                )
            }
        } catch (error) {
            console.log(error);
        }
    }
}


const editCourse = ( course ) => ({
    type: types.appEditCourse,
    payload: course
})


export const startLoadingCourses = () => {
    return async( dispatch ) => {

        try {
            const resp = await fetchWithToken('course');
            const body = await resp.json();

    
            if( body.ok ){
    
                dispatch( loadCourses( body.courses ));
            }
        } catch (error) {
            console.log(error);
        }

     
    }
}


const loadCourses = ( courses ) => ({
    type: types.appLoadCourse,
    payload: courses
})


export const startDeletingCourse = ( ) => {
    return async( dispatch, getState) => {

        const { activeCourse } = getState().course;
        try {
            const resp = await fetchWithToken(`course/${ activeCourse.id }`, {}, 'DELETE');
            const body = await resp.json();

            if( body.ok ){
                dispatch( deleteCourse() );
                Swal.fire(
                    'Eliminado!',
                    `La seccion <b>${ body.course.course} </b> ha sido eliminada`,
                    'success'
                )
            }
        } catch (error) {
            console.log(error);
        }
    }
}



const deleteCourse = () => ({
    type: types.appDeleteCourse
})