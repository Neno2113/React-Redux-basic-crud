import { types } from '../types/types';


const initialState = {
    sections: [],
    activeSection: null
}


export const sectionReducer = ( state = initialState, action) => {

    switch ( action.type ) {
        case types.appCrateSection:
            return  {
                ...state,
                sections: [action.payload, ...state.sections]

            }
        case types.appSelectSection:
            return {
                ...state,
                activeSection: action.payload
            }
        case types.appClearSelectedSection:
            return {
                ...state,
                activeSection: null
            }

        case types.appEditSection:
            return {
                ...state,
                sections: state.sections.map(
                    e => (e.id === action.payload.id ) ? action.payload : e
                )
            }
        case types.appDeleteSection:
            return {
                ...state,
                sections: state.sections.filter(
                    e => (e.id !== state.activeSection.id )
                ),
                activeSection: null
            }
        case types.appLoadSection:
            return {
                ...state,
                sections: [ ...action.payload ]
            }
            
    
        default:
            return  state;
    }

}