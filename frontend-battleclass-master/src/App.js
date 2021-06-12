import React from 'react'
/*import React, { useState, useEffect } from 'react'*/
import './App.css';

/*import api from './service/api';*/

import Routes from './routes';

/*import MainScreen from './pages/Student/Main'*/

function App({ history, match }) {
  /*const [ user, setUser ] = useState('');*/
/*
  useEffect(() => {
      async function buscarUser(){
          const response = await api.get('/buscar/userId', {headers: {
              id: match.params.idUser
          }})
          
          if (response.data != null){
              setUser(response.data);
          }
      }
      buscarUser();

  }, [])
*/
/*
console.log(history)
console.log(match)
*/
/*
 console.log(Routes.state)
 console.log(Routes.getParam)

 console.log(MainScreen)
 */


  return (
    <div className="App">  
    {/**
      <div className='menu'>
        
        <a className='sitename' onClick={() => (history.push(`/${user._id}/main`))}>BattleClass</a>
        <a className='tab'onClick={() => (history.push(`/${match.params.idUser}/main`))}> Página Inicial </a>
        <a className='tab' onClick={() => (history.push(`/${match.params.idUser}/team/${user.grupo}`))}> Minha Equipe </a>
        <a className='tab' onClick={() => (history.push(`/${match.params.idUser}/activitys-student`))}> Atividades </a>
        <div className='menu-bottom'>
          <a className='tab' onClick={() => (history.push(`/${match.params.idUser}/settings`))}> Configurações </a>
          <a className='tab' href='/contacts'> Contatos </a>
          <a className='tab' href='/about'> Sobre </a>
        </div>
      </div>
    */}
        

      <Routes/>

    </div>
  );
}

export default App;
