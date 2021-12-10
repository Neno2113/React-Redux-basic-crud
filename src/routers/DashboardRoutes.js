import React from 'react'
import { Route, Routes } from 'react-router';
import { CourseScreen } from '../components/course/CourseScreen';
import { SectionScreen } from '../components/section/SectionScreen';
import { StudentScreen } from '../components/students/StudentScreen';



import { Header } from '../components/ui/Header'
import { Menu } from '../components/ui/Menu'
import { NoMatch } from '../components/ui/NoMatch';

export const DashboardRoutes = () => {
    return (
        <div>
        <Header />
        <div className="container-fluid">
            <div className="row">
                <Menu />
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                            {/* <h1 className="h2">Dashboard</h1> */}
                            <div className="btn-toolbar mb-2 mb-md-0">
                            </div>
                        </div>
                        <Routes>
                            <Route index path="/" element={ < StudentScreen section={'Estudiante'} /> } />
                            <Route index path="student" element={ < StudentScreen section={'Estudiante'} /> } />
                            <Route path="section" element={ < SectionScreen section={'Seccion'} /> } />
                            <Route path="course" element={ < CourseScreen section={'Curso'} /> } /> 
                    
                            <Route path="*" element={<NoMatch />} />
            
                        </Routes>
                    </main>

            </div>
        </div>
    </div>
    )
}
