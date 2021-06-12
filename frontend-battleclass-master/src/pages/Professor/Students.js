import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import userProfile from '../../assets/user-profile.svg';

import './Students.css';
import api from '../../service/api';

export default function Students({ history, match }) {
    const [grupos, setGrupos] = useState([])
    const [alunos, setAlunos] = useState([])
    const [icon, setIcon] = useState(Object)
    const [ user, setUser ] = useState(Object);

    var listaAux = []
    var listaAuxAlunos = []

    useEffect(() => {
        async function buscarTeams() {
            const response = await api.get('/buscar/grupo/all')

            listaAux = response.data
            listaAux.sort(function (a, b) {
                return a.posicaoRanking - b.posicaoRanking
            })

            setGrupos(listaAux);
        }

        async function buscarAlunos() {
            const response = await api.get('/buscar/alunos')

            console.log(response.data)
            listaAuxAlunos = response.data
            listaAuxAlunos.sort(function(a, b){
                if (a.nome > b.nome) {
                    return 1;
                }
                if (a.nome < b.nome) {
                    return -1;
                }
                return 0;
            })
            setAlunos(listaAuxAlunos);
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
        

        buscarTeams();
        buscarAlunos();
        buscarUser();

    }, []);

    return (
        <div className='students'>

            <div className='screen-data'>
                <div className='str-dashboard'>
                    Alunos
                </div>
            </div>
            <div className='div-img-user'>
                <img src={icon.url} className='img-user' alt='Ícone do usuário' />
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
                <div className='cards-students'>
                    {/*<ul>
                    <li>
                        <div className='student-data'>{/*'line-title'*/}
                    {/*<div className='student-name'>
                                NOME DO ALUNO
                            </div>
                            <div className='student-points'>
                                NOTA
                            </div>
                            <div className='team-name'>
                                NOME DA EQUIPE
                            </div>
                            <div className='team-points'>
                                NOTA
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className='student-data'>
                            <div className='student-name'>
                                André Fernandes Bispo
                            </div>
                            <div className='student-points'>
                                75
                            </div>
                            <div className='team-name'>
                                Bonde do Tigrãaaaaao
                            </div>
                            <div className='team-points'>
                                75
                            </div>
                        </div>
                    </li>*/}

                    <div className='student-data'>
                        <ul>
                            <li className='li'>
                                <div className='line-title'>
                                    <div className='str-student-name'>
                                        NOME DO ALUNO
                                    </div>

                                    <div className='str-student-points'>
                                        PONTUAÇÃO GERAL
                                    </div>
                                    {/*
                                    <div className='team-name'>
                                        NOME DA EQUIPE
                                    </div>
                                    <div className='team-points'>
                                        NOTA
                                    </div>
                                    */}
                                </div>
                            </li>
                            {alunos.length > 0 ? (
                                <div>
                                    {alunos.map(aluno => (
                                        <li className='li2'>
                                            <div className='div-student-name'>
                                                <div className='student-name'>
                                                    {aluno.nome}
                                                </div>
                                            </div>

                                            <div className='student-points'>
                                                {aluno.pontuacaoGeral}
                                            </div>
                                        </li>
                                    ))}
                                </div>
                            ) : (
                                    <div> Não há alunos </div>
                                )}
                            {/**
                            <li>
                                <div className='team-name'>
                                    André Fernandes Bispo
                                </div>
                                <div className='team-name'>
                                    Joao Vitor Soares Egidio
                                </div>
                                <div className='team-name'>
                                    Emmanuel Peralta
                                </div>
                            </li>
                            <li>
                                <div className='team-points'>
                                    75
                                </div>
                                <div className='team-points'>
                                    65
                                </div>
                                <div className='team-points'>
                                    85
                                </div>
                            </li>
                        </ul>
                        
                        */}

                        </ul>


                        {/*
                    <li>
                        <div className='card-individual'>
                            <div className='dataname'>
                                João Vitor Soares Egidio
                            </div>
                            <div className='number'>
                                65
                            </div>
                            <div className='number'>
                                Os Hawaianos
                            </div>
                            <div className='number'>
                                85
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className='card-individual'>
                            <div className='dataname'>
                                Emmanuel Peralta
                            </div>
                            <div className='number'>
                                85
                            </div>
                            <div className='number'>
                                Os Avassaladores
                            </div>
                            <div className='number'>
                                65
                            </div>
                        </div>
                    </li>
                    */}


                    </div>

                </div>
            </div>
        </div>
    );
}
