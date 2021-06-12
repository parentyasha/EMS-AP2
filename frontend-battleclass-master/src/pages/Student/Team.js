import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import userProfile from '../../assets/user-profile.svg';

import RcIf from 'rc-if'
import './Team.css';
import api from '../../service/api';

export default function Team({ history, match }) {
    const [grupo, setGrupo] = useState(Object);
    const [grupos, setGrupos] = useState([])
    const [integrantes, setIntegrantes] = useState([]);
    const [icons, setIcons] = useState([]);
    const lista = [];
    var listaIcon = [];
    var [cont, setCont] = useState(0)
    const [user, setUser] = useState('');
    const [icon, setIcon] = useState(Object)

    var listaAux = [];


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

        async function busarIcon(id) {
            const response = await api.get('/buscar/icon', {
                headers: {
                    id: id
                }
            })
            setIcon(response.data)
        }

        async function buscarTeam() {
            const response = await api.get('/buscar/grupo', {
                headers: {
                    id: match.params.idGrupo
                }
            })

            for (let u in response.data.integrantes) {
                buscarIntegrantes(response.data.integrantes[u])
            }
            console.log(response.data)
            setGrupo(response.data)
        }

        async function buscarIntegrantes(id) {
            const response = await api.get('/buscar/userId', {
                headers: {
                    id: id
                }
            })

            await buscarIcon(response.data.icon)

            lista.push(response.data)

            setCont(cont += 1)
            setIntegrantes(lista)
        }

        async function buscarIcon(id) {
            const response = await api.get('/buscar/icon', {
                headers: {
                    id: id
                }
            })


            await listaIcon.push(response.data);
            console.log(response.data)

            setIcons(listaIcon);
        }

        async function buscarTeams() {
            const response = await api.get('/buscar/grupo/all')

            listaAux = response.data
            listaAux.sort(function (a, b) {
                return a.posicaoRanking - b.posicaoRanking
            })

            setGrupos(listaAux);
        }

        buscarUser();
        buscarTeam();
        buscarTeams();

    }, [])

    return (
        <div className='team'>

            

            <div className='menu'>
                <div className='menu-item sitename' onClick={() => (history.push(`/${user._id}/main`))}>BattleClass</div>
                <div className='menu-item' onClick={() => (history.push(`/${match.params.idUser}/main`))}> Página Inicial </div>
                <div className='menu-item selected' onClick={() => (history.push(`/${match.params.idUser}/team/${user.grupo}`))}> Minha Equipe </div>
                <div className='menu-item' onClick={() => (history.push(`/${match.params.idUser}/activitys-student`))}> Atividades </div>
                <div className='menu-bottom'>
                    <div className='menu-item disabled' > Configurações </div> {/*onClick={() => (history.push(`/${match.params.idUser}/settings`))}*/}
                    <div className='menu-item' > Contatos </div> {/*href='/contacts'*/}
                    <div className='menu-item' > Sobre </div> {/*href='/about'*/}
                </div>
            </div>

            <div className='student-data'>
                <div className='student-name'>
                    {user.nome}
                </div>
                <div className='trace'>
                    {/*-*/}
                </div>
                <div className='student-points'>
                    {user.pontuacao} {/*PONTOS*/}
                </div>

            </div>
            <div className='div-img-user'>
                <img src={icon.url} className='img-user' />
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
                {/*<div id='warning'>
                    Em construção...
                </div>

                <RcIf if={1 === 'a'}>*/}

                <div className='cards-students'>
                    {cont > 0 ? (
                        <ul>
                            {console.log(integrantes)}
                            {integrantes.map((integrante, index) => (

                                <li key={integrante._id}>
                                    <div className='card-individual' >
                                        <div className='profile-data'>
                                            <div className='img-profile'>
                                                <img src={icons[index].url} alt='Imagem do usuário' className='img-individual' />
                                            </div>
                                            <div className='username-profile'>
                                                {integrante.nome}
                                            </div>
                                        </div>
                                        <div className='points'>
                                            {integrante.ultimaPontuacao}
                                        </div>
                                    </div>
                                </li>
                            ))}

                        </ul>

                    ) : (
                            <div className='empty'> Não há integrantes </div>
                        )}

                
                <button className='btn btn-primary button-battle'
                    onClick={() => (history.push(`/${match.params.idUser}/team/${match.params.idGrupo}/select-enemy`))} disabled>
                    Batalhar
                </button>

                </div>
                {/*</RcIf>*/}
            </div>
        </div>

    );
}
