import { types } from "../../types/types"


describe('Pruebas en types', () => {


    test('should match types object', () => {
        

        expect( types ).toEqual({
            uiOpenForm: '[UI] Open Form',
            uiCloseForm: '[UI] Close Form',

            authCreateUser: '[Auth] Create User',
            authLogin: '[Auth] Login User',
            authChecking: '[Auth] checking login state',
            authCheckingFinish: '[Auth] finish checking login state',
            authLogout: '[Auth] Logout',
        

            appCrateStudent: '[Student] Create Student',
            appSelectStudent: '[Student] Select Student',
            appClearSelectedStudent: '[Student] Clear Selected Student',
            appEditStudent: '[Student] Edit Student',
            appDeleteStudent: '[Student] Delete Student',
            appLoadStudents: '[Section] Load Students',

            appCrateCourse: '[Course] Create Course',
            appSelectCourse: '[Course] Select Course',
            appClearSelectedCourse: '[Course] Clear Selected Course',
            appEditCourse: '[Course] Edit Course',
            appDeleteCourse: '[Course] Delete Course',
            appLoadCourse: '[Section] Load Courses',

            appCrateSection: '[Section] Create Section',
            appSelectSection: '[Section] Select Section',
            appClearSelectedSection: '[Section] Clear Selected Section',
            appEditSection: '[Section] Edit Section',
            appDeleteSection: '[Section] Delete Section',
            appLoadSection: '[Section] Load secions'
        })
    })
    
})
