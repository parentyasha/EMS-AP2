import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import RcIf from 'rc-if'
import userProfile from '../../assets/user-profile.svg';

import './Teams.css';
import api from '../../service/api';

export default function Team({ history, match}) {
    const [grupos, setGrupos] = useState([]);
    const [usuarios, setUsuarios] = useState([])
    const [icon, setIcon] = useState(Object)
    const [user, setUser] = useState(Object)

    var [cont, setCont] = useState(0)

    const listaU = []

    /*
    function adicionar_estudante() {
        if (document.querySelector('select').value === '') {
            alert('Selecione um estudante')
        }
        else {
            var valueSelect = document.querySelector('select').value
            var studentTag = document.querySelector('.student-selected')
            var createDiv = document.createElement('div')
            let studentName = document.createTextNode(valueSelect)
            createDiv.appendChild(studentName)
            studentTag.appendChild(createDiv)
        }
    }
    */

    useEffect(() => {
        async function buscarGrupos() {
            const response = await api.get('/buscar/grupo/all');
            setGrupos(response.data)

            for (let u in response.data) {
                for (let i in response.data[u].integrantes) {
                    buscaUser(response.data[u].integrantes[i])
                }
            }
        }

        async function buscaUser(id) {
            const response = await api.get('/buscar/userId', {
                headers: {
                    id: id
                }
            })

            listaU.push(response.data)
            setUsuarios(listaU)
            setCont(cont += 1)


        }

        async function buscarUser2() {
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

        buscarGrupos();
        buscarUser2();

    }, [])

    return (
        <div className='teams'>
            <div className='screen-data'>
                <div className='str-dashboard'>
                    Equipes
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
                        <div> Não há equipes </div>
                    )}

            </div>

            <div className='content'>

                <div className='cards-teams'>
                    {grupos.length > 0 ? (
                        <ul>
                            {grupos.map(grupo => (
                                <li key={grupo._id}>
                                    <div className='card-individual'>
                                        <div className='team-data'>
                                            <div className='team-name'>
                                                <strong>{grupo.nome}</strong>
                                            </div>
                                            <div className='team-points'>
                                                {grupo.pontuacao}
                                            </div>
                                        </div>

                                        <hr className='hr-card-team' />

                                        {cont > 0 ? (
                                            <div className='ul'>
                                                {usuarios.map(user => (
                                                    <div key={user._id}>
                                                        <RcIf if={grupo.integrantes.includes(user._id)}>
                                                            <li>
                                                                <div className='student-data'>
                                                                    <div className='student-name'>
                                                                        {user.nome}
                                                                    </div>
                                                                    <div className='student-point'>
                                                                        {user.pontuacao}
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        </RcIf>
                                                    </div>
                                                    
                                                ))}
                                            </div>

                                        ) : (
                                                <div> Sem integrantes </div>
                                            )}

                                        <hr className='hr-card-team' />

                                        <div className='challenge-data'>
                                            <div className='str-challenge'>
                                                <strong>Desafios:</strong>
                                            </div><br />
                                            <div className='challenge-wins'>
                                                Ganhados: {grupo.vitorias}
                                            </div><br />
                                            <div className='challenge-loses'>
                                                Perdidos: {grupo.derrotas}
                                            </div>
                                        </div>

                                    </div>
                                </li>
                            ))}

                        </ul>

                    ) : (
                            <div className='empty'> Não há equipes </div>
                        )}
                </div>
            </div>

        </div>
    );
}
