import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import RcIf, { RcElse } from 'rc-if';
import SweetAlert from 'sweetalert2-react';

import userProfile from '../../assets/user-profile.svg';
import api from '../../service/api';

import './IndividualActivity.css';

export default function Activity({ history, match}) {
    const [ atividade, setAtividade ] = useState(Object);
    const [ questoes, setQuestoes ] = useState([]); 
    const [ user, setUser ] = useState(Object);
    const [ grupo, setGrupo ] = useState(Object);
    const [ grupos, setGrupos ] = useState([]);
    const [ questao1, setQuestao1 ] = useState(Object);
    const [ questao2, setQuestao2 ] = useState(Object);
    const [ questao3, setQuestao3 ] = useState(Object);
    const [ questao4, setQuestao4 ] = useState(Object);
    const [ questao5, setQuestao5 ] = useState(Object);
    const [ respostaFinal , setResposta ] = useState([]);
    const [ gabarito, setGabarito ] = useState([])
    var listaVar =[questao1, questao2, questao3, questao4, questao5]
    var resposta = respostaFinal;
    var listaAux = [];
    var letra = '';
    const alfabeto = ['a', 'b', 'c', 'd']
    const [icon, setIcon] = useState(Object)
    const [ variavel, setVariavel ] = useState('');
    const [ultimaPont, setUltima] = useState(0);
    const [feito, setFeito] = useState(Object);
    const [notFeito, setNotFeito] = useState('');


    async function postarAtividade() {
        var cont = 1;
        var nota = 0;
        var pontuacaoAluno = user.pontuacaoGeral;
        var ultimaPontuacao = 0;
        var pontuacaoGrupo = grupo.pontuacao;

        for (let g in gabarito){
            var gab = gabarito[g]
            var res = respostaFinal[g]
            if(gab[cont] === res[cont]){
                nota += 10
            }
            cont += 1
        }
       
        ultimaPontuacao = ((nota/10) * (grupo.pontuacao/100))
        pontuacaoAluno = pontuacaoAluno + ultimaPontuacao

        pontuacaoGrupo = pontuacaoGrupo + (ultimaPontuacao/2)

        setUltima(ultimaPontuacao.toFixed());
        
        const response = await api.post('/postarAtividade', {
            idUser: user._id,
            idGrupo: grupo._id,
            idAtividade: atividade._id,
            ulPontuacao: ultimaPontuacao,
            pontuacaoG: pontuacaoAluno,
            pontuacaoGrupo: pontuacaoGrupo
        })

        console.log(response)
        if(response.status == '200'){
            setVariavel('ok');
        }
    }

    function verificarVariavel(index, valor) {
        var aux = null;
        if(index == 0) {
            for (let r in resposta) {
                if(r == index) {
                    aux = resposta[r]
                }

            }
            if(aux != null) {
                resposta.splice(index, 1, {1:valor})
            } else {
                resposta.push({1:valor})
                setResposta(resposta)
            }
            
        } else if(index == 1){
            for (let r in resposta) {
                if(r == index) {
                    aux = resposta[r]
                }

            }
            if(aux != null) {
                resposta.splice(index, 1, {2:valor})
            } else {
                resposta.push({2:valor})
                setResposta(resposta)
            }
                
            
            
        } else if(index == 2){
            for (let r in resposta) {
                if(r == index) {
                    aux = resposta[r]
                }

            }
            if(aux != null) {
                resposta.splice(index, 1, {3:valor})
            } else {
                resposta.push({3:valor})
                setResposta(resposta)
            }
            
        } else if(index == 3){
            for (let r in resposta) {
                if(r == index) {
                    aux = resposta[r]
                }

            }
            if(aux != null) {
                resposta.splice(index, 1, {4:valor})
            } else {
                resposta.push({4:valor})
                setResposta(resposta)
            }
        } else if(index == 4){
            for (let r in resposta) {
                if(r == index) {
                    aux = resposta[r]
                }

            }
            if(aux != null) {
                resposta.splice(index, 1, {5:valor})
            } else {
                resposta.push({5:valor})
                setResposta(resposta)
            }
        }

        console.log(resposta)
    }

    useEffect(() => {
        async function buscarAtividadeIndividual(id) {
            const response = await api.get('/buscar/atividade', {
                headers: {
                    id: id
                }
            });
            //heros = response.data;
            setAtividade(response.data)
            setQuestoes(response.data.questoes)
            setGabarito(response.data.gabarito)
        }

        async function buscarUser() {
            const response = await api.get('/buscar/userId', {
                headers: {
                    id: match.params.idUser
                }
            })
            var user = response.data
            var activity = user.atividades.filter(a => a.idAtividade === match.params.idAtividade)

            console.log(activity)
            if(activity.length > 0) {
                setFeito(activity[0])
            } else {
                setNotFeito('ok')
            }


            if (response.data != null) {
                setUser(response.data);
            }
            buscarTeam(response.data.grupo);
            buscarIcon(user.icon)
        }
        async function buscarTeam(id){
            const response = await api.get('/buscar/grupo', {
                headers: {
                    id: id
                }
            })
            setGrupo(response.data)
        }
        
        async function buscarTeams() {
            const response = await api.get('/buscar/grupo/all')

            listaAux = response.data
            listaAux.sort(function (a, b) {
                return a.posicaoRanking - b.posicaoRanking
            })

            setGrupos(listaAux);
        }

        async function buscarIcon(id) {
            const response = await api.get('/buscar/icon', {
                headers: {
                    id: id
                }
            })
            setIcon(response.data)

        }

        
        buscarTeams();
        buscarUser();
        buscarAtividadeIndividual(match.params.idAtividade);
    }, [])

    return (
        <div className='individual-activity'>

            <RcIf if={variavel === "ok"}>
                <SweetAlert
                    show={variavel}
                    title={`PARABÉNS !!`}
                    text={`Sua pontuação para a próxima batalha é: ${ultimaPont}`}
                    type='success'
                    onConfirm={() => {
                        setVariavel(null);
                        history.push(`/${user._id}/activitys-student`)
                    }}
                />
            </RcIf>
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

            <div className='content2'>
                <RcIf if={notFeito == ''}>
                    <div className='empty'> Você ja fez essa atividade, sua pontuação é de: {feito.pontuacao} :) </div>
                    <RcElse>
                        <RcIf if={notFeito == 'ok'}>
                            <div>
                                <h4>{atividade.titulo}</h4>
                            </div>
                            <div>
                                {atividade.conteudo}
                            </div>
                            <br></br>
                            <div className='cards-questions'>
                                {questoes.length > 0 ? (
                                    <ul>
                                        {questoes.map((questao, indexQ) => (
                                            <li key={indexQ}>
                                                <form>
                                                <div className='card-individual'>
                                                    <div className='str-question'>
                                                        <strong> Questão {indexQ + 1}</strong>
                                                    </div>
                                                    <div className='activity-context'>
                                                        {questao[indexQ + 1].texto}
                                                    </div>
                                                    {questao[indexQ + 1].alternativas.length > 0 ? (
                                                        <div className='alternatives'>
                                                            { questao[indexQ + 1].alternativas.map((alternativa, index) => (
                                                                <div className='individual-alternative' key={index} value={listaVar[index]} onChange={e => verificarVariavel(indexQ, e.target.value)}>
                                                                    <div className='div-radio-input'>
                                                                        <input type='radio' name='radio-question' value={alfabeto[index]} className='radio-input' />
                                                                    </div>
                                                                    <div className='alphabet-letter'>
                                                                        {letra = alfabeto[index]})
                                                                    </div>
                                                                    <div className='div-alternative-text'>
                                                                        <label for='radio-input' className='alternative-text' > 
                                                                            {alternativa[letra].texto} 
                                                                            {/*
                                                                            iquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in 
                                                                            voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat 
                                                                            non proident, sunt in culpa qui officia des
                                                                            */}
                                                                        </label>
                                                                    </div>
                                                                </div>

                                                            ))}

                                                        </div>
                                                    ) : (
                                                            <div> Sem questões </div>
                                                        )}

                                                </div>
                                                </form>
                                            </li>
                                        ))}

                                    </ul>
                                ) : (
                                        <div> Sem questões </div>
                                    )}

                            </div>

                            <div className='div-button'>
                                <button className='btn btn-primary button' onClick={postarAtividade}>
                                    Publicar
                                </button>
                            </div>
                        </RcIf>
                    </RcElse>
                </RcIf>
                
            </div>
        </div>

    );
}
