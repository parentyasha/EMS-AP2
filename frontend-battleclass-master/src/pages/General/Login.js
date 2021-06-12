import React, { useState } from 'react'
import RcIf, { RcElse } from 'rc-if'
import SweetAlert from 'sweetalert2-react'
import api from '../../service/api'

import mainImage from '../../assets/user2.png'
import userIcon from '../../assets/user2.png'
import padlockIcon from '../../assets/padlock.png'

import './Login.css'

export default function Login({ history }) {
    const [ username, setUsername ] = useState('');
    const [ senha, setSenha ] = useState('');
    const [ variavel, setVariavel ] = useState('');
    const [ verificado, setVerificar ] = useState('');

    async function efetuarLogin(e){
        e.preventDefault();

        const response = await api.post('/login',{
            email: username,
            senha: senha
        });

        const usuario = response.data.id_user
        if(response.data.login == true){
            if(usuario.professor == false) {
                history.push(`/${usuario._id}/main`)
            } else {
                history.push(`/${usuario._id}/dashboard`)
            }
            
        }
        else if(response.data.login == "not verified"){
            setVerificar(response.data.msg)
            setVariavel("not verified")
        } 
        else {
            setVariavel('login incorreto')
        }
        console.log(response.data);
        
    }

    function selecionarCadastro(){
        history.push('/register')
    }

    function selecionarRecuperar(){
        history.push('/recover')
    }
    
    return (
    <div className='main-login'>
        
        <RcIf if={variavel === "login incorreto"}>
            <SweetAlert
                show={variavel}
                title="Falha no Login"
                text="Login ou Senha incorretos"
                type='error'
                onConfirm={() => setVariavel(null)}
            />
        </RcIf>
        <RcIf if={variavel === "not verified"}>
            <SweetAlert
                show={verificado}
                title="Falha no Login"
                text={verificado}
                type='error'
                onConfirm={() => setVariavel(null)}
            />
        </RcIf>
        <div className='form-login'>
            <img src={ mainImage } alt='Íconce de usuário' id='main-image' />

            <hr id='hr-top-left' />
            <hr id='hr-top-right' />

            <form onSubmit={efetuarLogin}>
                <div className='inputs'>
                    {/*PASSWORD INPUT*/}
                    <div className='username'>
                        <div className='div-user-icon'>
                            <img id='user-icon' src={ userIcon } alt='imagem usuário' />
                        </div>
                        <div>
                            <input  className="form-control" id="email-input" aria-describedby="emailHelp"
                                placeholder="usuario@rede.ulbra.br" name='email' type="text" value={username} onChange={e => setUsername(e.target.value)}  required />
                        </div>
                    </div>

                    {/*PASSWORD INPUT*/}
                    <div className='password'>
                        <div className='div-padlock-icon'>
                            <img id='padlock-icon' src={ padlockIcon } alt='padlock' />
                        </div>
                        <input type="password" className="form-control" name="senha" id="password-input" 
                        placeholder="Senha" value={senha} onChange={e => setSenha(e.target.value)} required/>
                    </div>
                </div>

                {/*<div className="div-check">
                    <input type="checkbox" id='check-input' />
                    <label className="check-label" for="check-input"> Manter logado </label>
                </div>*/}
                
                <button className="btn btn-primary enter-button" href='./main' >Entrar</button>

                <div className='links'>
                    <div>
                        <a onClick={selecionarRecuperar} id='link-forgot-password'>Esqueci minha senha</a>
                    </div>
                    <hr id='divider-bottom' />
                    <div>
                        <a onClick={selecionarCadastro} id='link-register'>Ainda não possui cadastro?</a>
                    </div>
                </div>
                
            </form>
        </div>

    </div>

    );
}
