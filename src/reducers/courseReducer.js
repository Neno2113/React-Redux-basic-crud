import { types } from '../types/types';


const initialState = {
    courses: [],
    activeCourse: null
}


export const courseReducer = ( state = initialState, action) => {

    switch ( action.type ) {
        case types.appCrateCourse:
            return  {
                ...state,
                courses: [action.payload, ...state.courses]

            }
        case types.appSelectCourse:
            return {
                ...state,
                activeCourse: action.payload
            }
        case types.appClearSelectedCourse:
            return {
                ...state,
                activeCourse: null
            }

        case types.appEditCourse:
            return {
                ...state,
                courses: state.courses.map(
                    e => (e.id === action.payload.id ) ? action.payload : e
                )
            }
        case types.appLoadCourse:
            return {
                ...state,
                courses: [ ...action.payload]
            }
        case types.appDeleteCourse:
            return {
                ...state,
                courses: state.courses.filter(
                    e => (e.id !== state.activeCourse.id )
                ),
                activeCourse: null
            }
            
    
        default:
            return  state;
    }

}