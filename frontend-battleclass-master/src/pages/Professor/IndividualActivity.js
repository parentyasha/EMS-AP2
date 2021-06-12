import React, { useState, useEffect } from 'react';
import api from '../../service/api';
import 'bootstrap/dist/css/bootstrap.min.css';

import userProfile from '../../assets/user-profile.svg';

import './Dashboard.css';

export default function IndividualActivity({ history, match }) {
    const [grupos, setGrupos] = useState([])
    const [icon] = useState(Object)

    var listaAux = []
    useEffect(() => {
        async function buscarTeams() {
            const response = await api.get('/buscar/grupo/all')

            listaAux = response.data
            listaAux.sort(function (a, b) {
                return b.pontuacao - a.pontuacao
            })

            setGrupos(listaAux);
        }

        /*
        async function busarIcon(id) {
            const response = await api.get('/buscar/icon', {
                headers: {
                    id: id
                }
            })
            setIcon(response.data)
        }
        */

        buscarTeams();

    }, []);

    return (
        <div className='individual-activity'>

            <div className='screen-data'>
                <div className='str-dashboard'>
                    Atividade
                </div>
            </div>
            <div className='div-img-user'>
                <img src={icon.url} className='img-user' alt='Ícone do usuário' />
            </div>

            <div className='menu'>
                <a className='sitename' href='/dashboard'> BattleClass </a>
                <a className='menu-item' href='/dashboard'> Dashboard </a>
                <a className='menu-item' href='/students'> Alunos </a>
                <a className='menu-item' href='/teams'> Equipes </a>
                <a className='menu-item selected' href='/activitys'> Atividades </a>
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

            <div className='cards-students'>
                <ul>
                    <li>
                        <div className='card-individual'>
                            <div className='dataname'>
                                NOME DO ALUNO
                            </div>
                            <div className='number'>
                                NOTA
                            </div>
                            <div className='number'>
                                NOME DA EQUIPE
                            </div>
                            <div className='number'>
                                NOTA
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className='card-individual'>
                            <div className='dataname'>
                                André Fernandes Bispo
                            </div>
                            <div className='number'>
                                75
                            </div>
                            <div className='number'>
                                Bonde do Tigrãaaaaao
                            </div>
                            <div className='number'>
                                75
                            </div>
                        </div>
                    </li>
                </ul>

            </div>

        </div>
    );
}
