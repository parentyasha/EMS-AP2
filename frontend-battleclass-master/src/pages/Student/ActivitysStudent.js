import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import userProfile from '../../assets/user-profile.svg';
import api from '../../service/api';

import './ActivitysStudent.css';

export default function Activity({ history, match }) {
    const [atividades, setAtividade] = useState([]);
    const [grupo, setGrupo] = useState(Object);
    const [grupos, setGrupos] = useState([]);
    const [user, setUser] = useState('');
    const [icon, setIcon] = useState(Object)

    var listaAux = [];

    function navegarAtividade(atividade) {
        history.push(`/${match.params.idUser}/activitys-student/individual-activity/${atividade._id}`)

    }

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

        async function buscarAtividades() {
            const response = await api.get('/buscar/atividade/all');
            //heros = response.data;

            setAtividade(response.data.reverse()) // reverse() é para colocar a lista de tras pra frente.
        }

        async function buscarUsuario() {
            const response = await api.get('/buscar/userId', {
                headers: {
                    id: match.params.idUser
                }
            })

            buscarGrupo(response.data.grupo)
        }

        async function buscarGrupo(id) {
            const response = await api.get('/buscar/grupo', {
                headers: {
                    id: id
                }
            })

            setGrupo(response.data)
        }

        async function buscarGrupos() {
            const response = await api.get('/buscar/grupo/all')

            listaAux = response.data
            listaAux.sort(function (a, b) {
                return a.posicaoRanking - b.posicaoRanking
            })

            setGrupos(listaAux);
        }

        buscarAtividades();
        buscarGrupos();
        buscarUsuario();
        buscarUser();

    }, [])


    return (
        <div className='activitys-student'>

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

            </div>
            <div className='div-img-user'>
                <img src={icon.url} className='img-user' alt='Ícone do usuário' />
            </div>

            <div className='menu'>
                <div className='menu-item sitename' onClick={() => (history.push(`/${user._id}/main`))}>BattleClass</div>
                <div className='menu-item' onClick={() => (history.push(`/${match.params.idUser}/main`))}> Página Inicial </div>
                <div className='menu-item' onClick={() => (history.push(`/${match.params.idUser}/team/${user.grupo}`))}> Minha Equipe </div>
                <div className='menu-item selected' onClick={() => (history.push(`/${match.params.idUser}/activitys-student`))}> Atividades </div>
                <div className='menu-bottom'>
                    <div className='menu-item disabled' > Configurações </div> {/*onClick={() => (history.push(`/${match.params.idUser}/settings`))}*/}
                    <div className='menu-item disabled' > Contatos </div> {/*href='/contacts'*/}
                    <div className='menu-item disabled' > Sobre </div> {/*href='/about'*/}
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
                <div className='cards-activitys'>
                    {atividades.length > 0 ? (
                        <ul>
                            {atividades.map(atividade => (
                                <li key={atividade._id}>
                                    <a onClick={() => navegarAtividade(atividade)}>
                                        <div className='card-individual'>
                                            <div className='activity-data'>
                                                <div className='activity-title'>
                                                    <strong>{atividade.titulo}</strong>
                                                </div>
                                                <div className='activity-date'>
                                                    Publicado: {atividade.dataPostagem}
                                                </div>
                                            </div>
                                            <div className='activity-content'>
                                                {atividade.conteudo}
                                            </div>
                                        </div>
                                    </a>
                                </li>
                            ))}

                        </ul>
                    ) : (
                            <div className="empty">Não há atividades :( </div>
                        )}

                </div>
            </div>
        </div>
    );
}
