import Swal from "sweetalert2";
import { fetchWithToken } from "../helpers/fetch";
import { types } from "../types/types";
import { uiCloseForm } from "./ui";



export const startCreateSecion = ( section ) => {
    return async( dispatch ) => {

        const resp = await fetchWithToken('section', { section }, 'POST');
        const body = await resp.json();

        if( body.ok ){

            dispatch( createSection( body.section ) );
            dispatch( uiCloseForm() );
            Swal.fire('Success', `Seccion <b>${body.section.section}</b> creada` , 'success');

        } else {
            Swal.fire('Error', body.msg, 'error');
        }

    }
}


const createSection = ( section ) => {

    section.options = '';

    return { 
    type: types.appCrateSection,
    payload: section
    }
};


export const startLoadingSections = () => {
    return async( dispatch ) => {

        try {
            const resp = await fetchWithToken('section');
            const body = await resp.json();
    
            if( body.ok ){
    
                dispatch( loadSections( body.sections ));
            }
        } catch (error) {
            console.log(error);
        }

     
    }
}


const loadSections = ( sections ) => ({
    type: types.appLoadSection,
    payload: sections
})



export const selectSection = ( section ) => {
    
    section.options = '';
    return {type: types.appSelectSection,
    payload: section
    }
}


export const clearSelectedSection = () => ({
    type: types.appClearSelectedSection
})


export const startUpdateSection = ( section ) => {
    return async( dispatch, getState ) => {

        const { activeSection } = getState().section;

        try {

            const resp = await fetchWithToken(`section/${ activeSection.id }`,{ section },'PUT');
            const body = await resp.json();


            if( body.ok ) {
                dispatch( editSection( body.section ) );
                dispatch( uiCloseForm() );
                Swal.fire(
                    'Actualizado!',
                    `La seccion <b>${ body.section.section} </b> ha sido actualizada`,
                    'success'
                )
            }

        } catch (error) {
            console.log(error);
        }

    }
}

const editSection = ( section ) => ({
    type: types.appEditSection,
    payload: section
})



export const startDeletingSection = () => {
    return async( dispatch, getState ) => {

        const { activeSection } = getState().section;

        try {

            const resp = await fetchWithToken(`section/${ activeSection.id }`,{},'DELETE');
            const body = await resp.json();


            if( body.ok ) {
                dispatch( deleteSection() );
                Swal.fire(
                    'Eliminado!',
                    `La seccion <b>${ body.section.section} </b> ha sido eliminada`,
                    'success'
                )
            }

        } catch (error) {
            console.log(error);
        }

    }
}


const deleteSection = () => ({
    type: types.appDeleteSection
})