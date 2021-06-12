import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

import userProfile from '../../assets/user-profile.svg'

import './Main.css';
import api from '../../service/api';

export default function MainStudent({ history, match }) {
    const [user, setUser] = useState('');
    const [grupos, setGrupos] = useState([])
    const [atividades, setAtividades] = useState([])
    const [icon, setIcon] = useState(Object)
    

    var listaAux = []

    useEffect(() => {
        async function buscarUser() {
            const response = await api.get('/buscar/userId', {
                headers: {
                    id: match.params.idUser
                }
            })

            if (response.data != null) {
                setUser(response.data);
            }

            busarIcon(response.data.icon);
        }

        async function buscarTeams() {
            const response = await api.get('/buscar/grupo/all')

            listaAux = response.data
            listaAux.sort(function (a, b) {
                return a.posicaoRanking - b.posicaoRanking
            })

            setGrupos(listaAux);
        }

        async function buscarAtividades() {
            const response = await api.get('/buscar/atividade/all')
            setAtividades(response.data.reverse())
        }

        async function busarIcon(id) {
            const response = await api.get('/buscar/icon', {
                headers: {
                    id: id
                }
            })
            setIcon(response.data)

        }

        buscarUser();
        buscarTeams();
        buscarAtividades();

    }, [])

    return (
        <div className='main-student'>

            <div className='student-data'>
                <div className='student-name'>
                    {user.nome}
                </div>
                <div className='trace'>
                    -
            </div>
                <div className='student-points'>
                    {user.ultimaPontuacao} PONTOS
            </div>
                {/*<hr id='hr-nav' />*/}
            </div>
            <div className='div-img-user'>
                <img src={icon.url} className='img-user' />
            </div>

            <div className='menu'>
                <div className='menu-item sitename' onClick={() => (history.push(`/${user._id}/main`))}>BattleClass</div>
                <div className='menu-item selected' onClick={() => (history.push(`/${match.params.idUser}/main`))}> Página Inicial </div>
                <div className='menu-item' onClick={() => (history.push(`/${match.params.idUser}/team/${user.grupo}`))}> Minha Equipe </div>
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
                {grupos.length > 0 ? (
                    <ul>
                        {grupos.map(grupo => (
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

            <div className='content'>

                {atividades.length > 0 ? (
                    <ul>
                        {atividades.map(atividade => (
                            <div className='task' key={atividade._id} >
                                <a onClick={() => (history.push(`/${match.params.idUser}/activitys-student/individual-activity/${atividade._id}`))}>
                                    <li key={atividade._id}>
                                        <div className='div-task-content'>
                                            <div className='task-content'>
                                                <div className='task-title'>
                                                    <b>{atividade.titulo}</b>
                                                </div>
                                                <div className='task-description'>
                                                    {atividade.conteudo}
                                                </div>
                                            </div>
                                            <div className='task-points'>
                                                <div className='task-points-notes'>
                                                    <b>Nota</b>
                                                </div>
                                                <div className='task-pontuation'>
                                                    50
                                            </div>
                                            </div>
                                        </div>
                                    </li>
                                </a>
                            </div>

                        ))}

                    </ul>
                ) : (
                        <div className='empty'> Não há atividades :( </div>
                    )}

            </div>

        </div>

    );
}
