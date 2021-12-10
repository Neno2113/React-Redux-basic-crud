import { combineReducers } from "redux";

import { studentReducer } from "./studentReducer";
import { uiReducer } from "./uiReducer";
import { courseReducer } from './courseReducer';
import { sectionReducer } from './sectionReducer';
import { authReducer } from "./authReducer";




export const rootReducer = combineReducers({
    ui: uiReducer,
    student: studentReducer,
    course: courseReducer,
    section: sectionReducer,
    auth: authReducer
})