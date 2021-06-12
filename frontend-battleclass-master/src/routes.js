import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

/*GENERAL*/
import Login from './pages/General/Login'
import Password from './pages/General/Password'
import Register from './pages/General/Register'
import Test from './pages/test'
import Settings from './pages/General/Settings'
import Contacts from './pages/General/Contacts'
import About from './pages/General/About'


/*STUDENT*/
import Main from './pages/Student/Main'
import Team from './pages/Student/Team'
import ActivitysStudent from './pages/Student/ActivitysStudent'
import IndividualActivity from './pages/Student/IndividualActivity'
/*import Battle from './pages/Battle'*/
import Hero from './pages/General/Hero'
import PrepararBatalhaDesafiante from './pages/General/PrepararBatalhaDesafiante'
import SelectEnemy from './pages/General/SelectEnemy'


/*PROFESSOR*/
import Dashboard from './pages/Professor/Dashboard'
import Students from './pages/Professor/Students'
import Teams from './pages/Professor/Teams'
import Activitys from './pages/Professor/Activitys'
import Activity from './pages/Professor/IndividualActivity'
import AddActivity from './pages/Professor/AddActivity'
import Batalha from './pages/Professor/Batalha'
import PrepararBatalha from './pages/General/PreparaBatalha'


export default function Routes() {
    return (
        <BrowserRouter>
            
            {/*GENERAL*/}
            <Route path='/' exact component={Login} />
            <Route path='/recover' component={Password} />
            <Route path='/register' component={Register} />
            <Route path='/:idUser/icon' component={Hero} />
            <Route path='/:idUser/contacts' component={Contacts} />
            <Route path='/:idUser/about' component={About} />
            <Route path='/:idUser/team/:idGrupo/select-enemy' component={SelectEnemy} />
            <Route path='/:idUser/team/:idGrupo/battle/:idEnemy' component={PrepararBatalhaDesafiante} />
            <Route path='/:idGrupo/prepare/:idBattle' component={PrepararBatalha} />
            <Route path='/:idUser/settings' component={Settings} />
            {/*<Route path='/test' component={Test}/>*/}
            
            
            {/*STUDENT*/}
            <Route path='/:idUser/main' component={Main} />
            <Route path='/:idUser/team/:idGrupo' exact component={Team} />
            <Route path='/:idUser/activitys-student' component={ActivitysStudent} />
            <Route path='/:idUser/activitys-student/individual-activity/:idAtividade' component={IndividualActivity} />
            
            
            {/*PROFESSOR*/}
            <Route path='/:idUser/dashboard' component={Dashboard} />
            <Route path='/:idUser/students' component={Students} />
            <Route path='/:idUser/teams' component={Teams} />
            <Route path='/:idUser/activitys' exact component={Activitys} />
            <Route path='/:idUser/activitys/activity' component={Activity} />
            <Route path='/:idUser/activitys/add-activity' component={AddActivity} />
            <Route path='/:idUser/battle' component={Batalha} />

        </BrowserRouter>
    );
}