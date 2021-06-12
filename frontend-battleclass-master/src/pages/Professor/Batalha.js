import React, { useEffect, useState } from 'react';
import styled, {keyframes} from 'styled-components';
import RcIf, { RcElse } from 'rc-if';
import './Batalha.css'
import socketIOClient from 'socket.io-client';

import akali from '../../assets/icons/akali.png';
import akame from '../../assets/icons/akame.png';
import alerquina from '../../assets/icons/alequina.png';
import allMight from '../../assets/icons/allMight.png';
import kirito from '../../assets/icons/jv.png';
import ed from '../../assets/icons/manel.png';
import gohan from '../../assets/icons/andre.png';
import patolinoMago from '../../assets/icons/patolinoMago.png';
import api from '../../service/api';




const team1 = [
    { nomePersonagem:'Kirito', url: kirito, id:"5daf91e336f3b64848f0f635", vida:50},
    { nomePersonagem:'Edward Elric', url:ed, id:"5daf91e436f3b64848f0f636", vida:40},
    ///{ nomePersonagem:'Gohan', url:gohan, id:"5daf91e436f3b64848f0f637", vida:30},
    //{ nomePersonagem:'O Mago', url:patolinoMago, id:"5daf91e436f3b64848f0f638", vida:60},
]

const team2 = [
    { nomePersonagem:'Akali', url: akali, id:"5daf91de36f3b64848f0f618", vida:55},
    { nomePersonagem:'Akame', url:akame, id:"5daf91de36f3b64848f0f619", vida:45},
    //{ nomePersonagem:'Alerquina', url:alerquina, id:"5daf91df36f3b64848f0f61a", vida:35},
    //{ nomePersonagem:'All Might', url:allMight, id:"5daf91df36f3b64848f0f61b",vida:65},
]


export default function Batalha({ match }) {
    const [ equipe1, setEquipe1 ] = useState([])
    const [ equipe2, setEquipe2 ] = useState([])
    const [ teams, setTeams ] = useState([])
    const [ endpoint, setEndpoint ] = useState('http://localhost:1512')
    const [animation, setAnimation ] = useState('paused')
    const listaVencedores = [];
    const listaTeams = [];

    const fight1Loser = keyframes`
        0% {
            transform: translateY();
        }
        99% {
            opacity: 1.0
        }
        100% {
            transform: translateY(50px);
            opacity: 0.5
        }
    `
    const Luta1Loser = styled.div`
        animation: ${fight1Loser} 1s ;
        animation-fill-mode: forwards;
        animation-play-state: ${animation}
    `
    const fight1Winner = keyframes`
        0% {
            transform: translateY();
        }
        99% {
            opacity: 1.0
        }
        100% {
            transform: translateY(50px);
        }
    `
    const Luta1Winner = styled.div`
        animation: ${fight1Winner} 1s ;
        animation-fill-mode: forwards;
        animation-play-state: ${animation}
    `

    const fight2Loser = keyframes`
        0% {
            transform: translateY();
        }
        99% {
            opacity: 1.0
        }
        100% {
            transform: translateY(-50px);
            opacity: 0.5
        }
    `
    const Luta2Loser = styled.div`
        animation: ${fight2Loser} 1s ;
        animation-fill-mode: forwards;  
        animation-play-state: ${animation}
    `

    const fight2Winner = keyframes`
        0% {
            transform: translateY();
        }
        99% {
            opacity: 1.0
        }
        100% {
            transform: translateY(-50px);
        }
    `
    const Luta2Winner = styled.div`
        animation: ${fight2Winner} 1s ;
        animation-fill-mode: forwards;  
        animation-play-state: ${animation}
    `

    function exibirVencedores() {
        var t1 = 0, t2 = 0
        for (let v in listaVencedores) {
            if (listaVencedores[v].vencedor == 'team1'){
                t1 += 1
            } else if (listaVencedores[v].vencedor == 'team2') {
                t2 +=1 
            }
        }
        
        if (t1 > t2) {
            console.log('team1 é o vencedor')
        } else if ( t2 > t1 ){
            console.log('team2 é o vencedor')
        } else {
            console.log('EMPATE')
        }
    }


/*
    const [currentCount, setCount] = useState(10);
    const timer = () => setCount(currentCount - 1);
    useEffect(() => {
        if (currentCount <= 0) {
            return;
        }
        const id = setInterval(timer, 1000);
        console.log(currentCount)
        return () => clearInterval(id);
    }, [currentCount]);
*/
    useEffect(() => {
        function batalha() {
            for (let e in team1) {
                if(team1[e].vida > team2[e].vida) {
                    const duelo = {
                        time1: team1[e],
                        time2: team2[e],
                        vencedor: 'team1'
                    }

                    listaVencedores.push(duelo)
                    listaTeams.push('team1')
                } else if (team1[e].vida < team2[e].vida) {
                    const duelo = {
                        time1: team1[e],
                        time2: team2[e],
                        vencedor: 'team2'
                    }
                    listaVencedores.push(duelo)
                    listaTeams.push('team2')
                } else {
                    const duelo = {
                        time1: team1[e],
                        time2: team2[e],
                        vencedor: null
                    }
                    listaVencedores.push(duelo)
                    listaTeams.push(null)
                }
            }
        }

        const socket = socketIOClient(endpoint);
        socket.on('verificarBatalha', id => {
            console.log(id);
            if(id == true){
                setAnimation('running')
            }
        })

        socket.emit('receber id', match.params.idUser)

        batalha();
        setTeams(listaTeams)
        console.log(listaVencedores)

    }, [])

    return(
        <div className='batalha'>
            <button className='btn btn-outline-primary button-return'> Voltar para Minha Equipe</button>

            <div className='content'>

                <div className='rectangle'>
                    <ul>
                        { team1.length > 0 ? (
                            <li>
                                {team1.map((integrantes, index) => (
                                    <div className='div' key={index}>
                                        <RcIf if={teams[index] == 'team1'}>
                                            <Luta1Winner>
                                                <img className='circle' src={integrantes.url} />
                                            </Luta1Winner>
                                            <RcElse>
                                                <RcIf if={teams[index] == 'team2'}>
                                                    <Luta1Loser>
                                                        <img className='circle' src={integrantes.url} />    
                                                    </Luta1Loser>
                                                </RcIf>
                                            </RcElse>
                                        </RcIf>
                                    </div>
                                ))}
                            </li>
                        ): (
                            <div className='empty'>Sem time</div>
                        )}
                    </ul>
                </div>

                <div className='rectangle rectangle2'>
                    <ul>
                        { team2.length > 0 ? (
                            <li>
                                {team2.map((integrantes,index) => (
                                    <div className='div' key={index}>
                                            <RcIf if={teams[index] == 'team1'}>
                                        <Luta2Loser>
                                            <img className='circle' src={integrantes.url} />
                                        </Luta2Loser>
                                        <RcElse>
                                            <RcIf if={teams[index] == 'team2'}>
                                                <Luta2Winner>
                                                    <img className='circle' src={integrantes.url} />    
                                                </Luta2Winner>
                                            </RcIf>
                                        </RcElse>
                                    </RcIf>                                  
                                    </div>
                                ))}
                            </li>  
                        ): (
                            <div className='empty'>Sem time</div>
                        )}
                    </ul>
                </div>
                <div>
                    <button className='btn btn-primary button-battle' onClick={exibirVencedores}> EXIBIR VENCEDOR !</button>
                </div>
            </div>
        </div>
    );
}