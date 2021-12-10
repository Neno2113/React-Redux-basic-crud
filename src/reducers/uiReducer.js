import { types } from "../types/types";


const initialState = {
    formShow: false,
}




export const uiReducer = ( state = initialState, action ) => {

    switch (action.type) {
        case types.uiOpenForm:
            return {
                ...state,
                formShow: true
            }
        case types.uiCloseForm:
            return {
                ...state,
                formShow: false
            }
            
    
        default:
            return state;
    }
}