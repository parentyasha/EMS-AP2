import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import api from '../../service/api'

import userProfile from '../../assets/user-profile.svg';
import RcIf from 'rc-if'
import './Dashboard.css';

export default function Dashboard({ history, match }) {
    const [dados, setDados] = useState(Object)
    const [alunos, setAlunos] = useState(0);
    const [atividades, setAtividades] = useState(0);
    const [grupos, setGrupos] = useState(0);
    const [batalhas, setBatalhas] = useState(0);
    const [icon, setIcon] = useState(Object)
    const [user, setUser] = useState(Object);
    const [teams, setTeams] = useState([]);

    var listaAux = []

    useEffect(() => {
        async function buscarDados() {
            const response = await api.get('/dashboard');

            setDados(response.data);
            setAlunos(response.data.usuarios.length);
            setGrupos(response.data.grupos.length);
            setAtividades(response.data.atividades.length);
            setBatalhas(response.data.batalhas.length)

        }

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

        async function busarIcon(id) {
            const response = await api.get('/buscar/icon', {
                headers: {
                    id: id
                }
            })
            setIcon(response.data)
        }

        async function buscarTeams() {
            const response = await api.get('/buscar/grupo/all')

            listaAux = response.data
            listaAux.sort(function (a, b) {
                return a.posicaoRanking - b.posicaoRanking
            })

            setTeams(listaAux);
        }

        buscarDados();
        buscarUser();
        buscarTeams();

    }, []);

    return (
        <div className='dashboard'>

            <div className='screen-data'>
                <div className='str'>
                    Dashboard
                </div>
            </div>
            <div className='div-img-user'>
                <img src={icon.url} className='img-user' />
            </div>

            <div className='menu'>
                <a className='sitename' onClick={() => (history.push(`/${user._id}/dashboard`))}> BattleClass </a>
                <a className='menu-item selected' onClick={() => (history.push(`/${user._id}/dashboard`))}> Dashboard </a>
                <a className='menu-item' onClick={() => (history.push(`/${user._id}/students`))}> Alunos </a>
                <a className='menu-item' onClick={() => (history.push(`/${user._id}/teams`))}> Equipes </a>
                <a className='menu-item' onClick={() => (history.push(`/${user._id}/activitys`))}> Atividades </a>
                <div className='menu-bottom'>
                    <a className='menu-item disabled' > Configurações </a> {/*onClick={() => (history.push(`/${match.params.idUser}/settings`))}*/}
                    <a className='menu-item disabled' > Contatos </a> {/*href='/contacts'*/}
                    <a className='menu-item disabled' > Sobre </a> {/*href='/about'*/}
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

            <div className='content'>
                <div id='warning'>
                    Em construção...
                </div>

                <RcIf if={1 == 2}>
                    <div className='cards-students'>
                        <ul>
                            <li>
                                <div className='card-individual'>
                                    <div className='dataname'>
                                        Atividades
                                </div>
                                    <div className='number'>
                                        {atividades}
                                    </div>
                                </div>
                            </li>

                            <li>
                                <div className='card-individual'>
                                    <div className='dataname'>
                                        Alunos
                                </div>
                                    <div className='number'>
                                        {alunos}
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className='card-individual'>
                                    <div className='dataname'>
                                        Equipes
                                </div>
                                    <div className='number'>
                                        {grupos}
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className='card-individual'>
                                    <div className='dataname'>
                                        Batalhas
                                </div>
                                    <div className='number'>
                                        {batalhas}
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <canvas id="myChart" width="400" height="400"></canvas>
                </RcIf>
            </div>
        </div>
    );
}

