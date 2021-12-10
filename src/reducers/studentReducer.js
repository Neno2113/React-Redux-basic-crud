import { types } from '../types/types';


const initialState = {
    students: [],
    activeStudent: null
}


export const studentReducer = ( state = initialState, action) => {

    switch ( action.type ) {
        case types.appCrateStudent:
            return  {
                ...state,
                students: [action.payload, ...state.students]

            }
        case types.appSelectStudent:
            return {
                ...state,
                activeStudent: action.payload
            }
        case types.appClearSelectedStudent:
            return {
                ...state,
                activeStudent: null
            }
        
        case types.appLoadStudents: 
            return {
                ...state,
                students: [ ...action.payload ]
            }
        case types.appEditStudent:
            return {
                ...state,
                // activeStudent: null,
                students: state.students.map(
                    e => (e.id === action.payload.id ) ? action.payload : e
                )
            }
        case types.appDeleteStudent:
            return {
                ...state,
                students: state.students.filter(
                    e => (e.id !== state.activeStudent.id )
                ),
                activeStudent: null
            }
            
    
        default:
            return  state;
    }

}