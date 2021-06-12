import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

import userProfile from '../../assets/user-profile.svg'
import RcIf, {RcElse} from 'rc-if'
import './Settings.css';
import api from '../../service/api';

export default function Settings({ history, match }) {
    const [grupos, setGrupos] = useState([])
    const [icon] = useState(Object)
    const [ user, setUser ] = useState('');

    /*
    function selecionarEquipe() {
        history.push(`${user.id_user}/main/team`)
    } 
    */
    
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

        async function buscarUser() {
            const response = await api.post('/userId', {
                id: match.params.idUser
            })

            if (response.data != null) {
                setUser(response.data);
            }
        }
        buscarUser();
        buscarTeams();

    }, []);


    return (
        <div className='settings'>

            <div className='screen-data'>
                <div className='str'>
                    Dashboard
                </div>
            </div>
            <div className='div-img-user'>
                <img src={icon.url} className='img-user' alt='Ícone do usuário'/>
            </div>

            <RcIf if={1==2}>
                <div className='menu'>
                    <a className='sitename' href='/dashboard'>BattleClass</a>
                    <a className='menu-item' href='/dashboard'> Página Inicial </a>
                    <a className='menu-item' href='/students'> Alunos </a>
                    <a className='menu-item' href='/teams'> Equipes </a>
                    <a className='menu-item' href='/activitys'> Atividades </a>
                    <div className='menu-bottom'>
                        <a className='menu-item selected' href='/settings'> Configurações </a>
                        <a className='menu-item' href='/contacts'> Contatos </a>
                        <a className='menu-item' href='/about'> Sobre </a>
                    </div>
                </div>

                <RcElse>
                    <div className='menu'>
                        <div className='menu-item sitename' onClick={() => (history.push(`/${user._id}/main`))}>BattleClass</div>
                        <div className='menu-item' onClick={() => (history.push(`/${match.params.idUser}/main`))}> Página Inicial </div>
                        <div className='menu-item' onClick={() => (history.push(`/${match.params.idUser}/team/${user.grupo}`))}> Minha Equipe </div>
                        <div className='menu-item' onClick={() => (history.push(`/${match.params.idUser}/activitys-student`))}> Atividades </div>
                        <div className='menu-bottom'>
                            <div className='menu-item selected' onClick={() => (history.push(`/${match.params.idUser}/settings`))}> Configurações </div>
                            <div className='menu-item' href='/contacts'> Contatos </div>
                            <div className='menu-item' href='/about'> Sobre </div>
                        </div>
                    </div>
                </RcElse>
            </RcIf>

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

            <div className='inputs'>
                <div className='data-name'>
                    <div className='label-name'>
                        <label>Name</label>
                    </div>
                    <div className='div-input-name'>
                        <input className='form-control input-name' readOnly='true' />
                    </div>
                </div>

                <div className='data-email'>
                    <div className='label-email'>
                        <label>E-mail</label>
                    </div>
                    <div className='div-input-email'>
                        <input className='form-control input-email' readOnly='true' />
                    </div>
                </div>
                <div className='data-password'>
                    <div>
                        <div className='label-password'>
                            <label>Senha</label>
                        </div>
                        <div className='div-input-password'>
                            <input className='form-control input-password' />
                        </div>
                    </div>
                    <div className='div-button'>
                        <button className='btn btn-outline-primary change-button'>Alterar</button>
                    </div>
                </div>

            </div>

        </div>

    );
}
