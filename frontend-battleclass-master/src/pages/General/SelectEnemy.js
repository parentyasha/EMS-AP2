import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import userProfile from '../../assets/user-profile.svg';

import './SelectEnemy.css';
import api from '../../service/api';

export default function SelectEnemy({ history, match }) {
    const [ grupos, setGrupos ] = useState(Object);
    const [ team, setTeam ] = useState(Object);
    const [teams, setTeams] = useState([])
    /*
    const [ integrantes, setIntegrantes ] = useState([]);
    const [ icons, setIcons ] = useState([]);
    const lista = [];
    var listaIcon = [];
    var [ cont, setCont ] = useState(0)
    */

    useEffect(() => {
        async function buscarGrupos(){
            const response = await api.get('/buscar/grupo/all')
            setGrupos(response.data.filter(t => t._id !== match.params.idGrupo));
        }

        async function buscarTeams(){
            const response = await api.get('/buscar/grupo/all')
            setTeams(response.data);
        }

        async function buscarGrupo() {
            const response = await api.get('/buscar/grupo', {headers: {
                id: match.params.idGrupo
            }})
            
            setTeam(response.data)
        }
        buscarGrupos()
        buscarTeams();
        buscarGrupo();

    }, [])

    return (
        <div className='select-enemy'>

            <nav>
                <div className='navbar'>
                    <div className='sitename'>
                        <a href='/main'>
                            BATTLECLASS
                        </a>
                    </div>
                    <div className='student-data'>
                        <div className='team-name-principal'>
                            {team.nome}
                        </div>
                        <div className='trace'>
                            -
                        </div>
                        <div className='team-points-principal'>
                            {team.pontuacao} PONTOS
                    </div>
                    </div>
                </div>

                <hr id='hr' />
                
            </nav>
        
            <div className='menu'>
                <div className='menu-item sitename' onClick={() => (history.push(`/${match.params.idUser}/main`))}>BattleClass</div>
                <div className='menu-item selected' onClick={() => (history.push(`/${match.params.idUser}/main`))}> Página Inicial </div>
                <div className='menu-item' onClick={() => (history.push(`/${match.params.idUser}/team/${team._id}`))}> Minha Equipe </div>
                <div className='menu-item' onClick={() => (history.push(`/${match.params.idUser}/activitys-student`))}> Atividades </div>
                <div className='menu-bottom'>
                    <div className='menu-item disabled' > Configurações </div> {/*onClick={() => (history.push(`/${match.params.idUser}/settings`))}*/}
                    <div className='menu-item' onClick={() => (history.push(`/${match.params.idUser}/contacts`))}> Contatos </div> {/*href='/contacts'*/}
                    <div className='menu-item' onClick={() => (history.push(`/${match.params.idUser}/about`))}> Sobre </div> {/*href='/about'*/}
                </div>
            </div>
            

            <div className='ranking'>
                <div className='str-ranking'>
                    <b> Ranking </b>
                </div>
                {teams.length > 0 ? (
                    <ul>
                        {teams.map(grupo => (
                            <div key={grupo._id}>
                                <li key={grupo._id}>
                                    <div className='team-ranking'>
                                        <div className='team-profile'>
                                            <img src={grupo.icon} alt='Imagem do time' />
                                        </div>
                                        <div className='team-name'>
                                            {grupo.nome}
                                        </div>
                                        <div className='team-points'>
                                            {grupo.pontuacao}
                                        </div>
                                    </div>
                                </li>
                            </div>

                        ))}

                    </ul>
                ) : (
                        <div> Sem grupos </div>
                    )}

            </div>

            <div className='cards-students'>
                { grupos.length > 0 ? (
                    <ul>
                        { grupos.map( grupo => (
                            
                                <li key={grupo._id}>
                                    <a onClick={() => {history.push(`/${match.params.idUser}/team/${match.params.idGrupo}/battle/${grupo._id}`)}}>
                                        <div className='card-individual' >
                                            <div className='profile-data'>
                                                <div className='img-profile'>
                                                    <img src={userProfile} alt='Imagem do grupo' className='img-individual' />
                                                </div>
                                                <div className='username-profile'>
                                                    {grupo.nome}
                                                </div>
                                            </div>
                                            <div className='points'>
                                                {grupo.pontuacao}
                                            </div>
                                        </div>
                                    </a>
                                </li>
                            
                        ))}
                        
                    </ul>
                ) : (
                    <div> Sem Equipes </div>
                )}
                
            </div>
        </div>
    );
}
