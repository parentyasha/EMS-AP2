import React, { useState, useEffect } from 'react'
import RcIf, { RcElse } from 'rc-if'
import SweetAlert from 'sweetalert2-react'
import api from '../../service/api'

import mainImage from '../../assets/user2.png'
import userIcon from '../../assets/user2.png'
import padlockIcon from '../../assets/padlock.png'

import './Password.css'

export default function Login({ history }) {
    const [ username, setUsername ] = useState('');
    const [ senha, setSenha ] = useState('');

    const [ senha1, setSenha1 ] = useState('');
    const [ senha2, setSenha2 ] = useState('');

    const [ variavel, setVariavel ] = useState('');
    const [ email, setEmail ] = useState('');

    async function verificarEmail(e){
        e.preventDefault();

        const response = await api.get('/buscar/userEmail',{headers: {
            email: username 
        }});

        if(response.data != null){
            setEmail('verificado')
        }
        else {
            console.log('Email nao encontrado')
        }
        console.log(response.data);
        
    }

    async function alterarSenha(e){
        e.preventDefault();
        const response = await api.post('/recuperar', {
            email: username,
            senha: senha
        })

        console.log(response.data)
        if(response.data.msg == 'success'){
            setVariavel('ook');
        } else {
            console.log(response.data.msg)
        }
    }

    function navegarLogin(){
        history.push('/');
    }
    function selecionarCadastro(){
        history.push('/register')
    }

    useEffect(() => {
        if (senha1 !== senha2){
            console.log("Senha não coincidem")
        } else {
            setSenha(senha2);
            console.log(senha)
        }
        
    })

    return (
    <div className='main-password'>

        <RcIf if={variavel === "ook"}>
            <SweetAlert
                show={variavel}
                title="Confirmado!!"
                text="Senha alterada com sucesso!! Faça login para entrar no Aplicativo"
                type="success"
                onConfirm={() => {
                    setVariavel(null);
                    navegarLogin();
                }}
            />
        </RcIf>
        <div className='form-login'>
            <RcIf if={email == ''}>
                <img src={ mainImage } alt='Íconce de usuário' id='main-image' />

                <hr id='hr-top-left' />
                <hr id='hr-top-right' />

                <form onSubmit={verificarEmail}>
                    <div className='input'>
                        {/*PASSWORD INPUT*/}
                        <label className='label-email-input' for='email-input'>E-mail:</label>
                        <div className='email'>
                            <div className='div-user-icon'>
                                <img id='user-icon' src={ userIcon } alt='imagem usuário' />
                            </div>
                            <div>
                                <input  className="form-control" id="email-input" aria-describedby="emailHelp"
                                        placeholder="usuario@rede.ulbra.br" name='email' type="text" value={username} onChange={e => setUsername(e.target.value)}  required />
                            </div>
                        </div>
                        <button className="btn btn-primary enter-button" href='./main'>Recuperar</button>

                        <div className='link'>
                            <div>
                                <a onClick={selecionarCadastro} id='link-register'>Ainda não possui cadastro?</a>
                            </div>
                        </div>
                    </div>
                </form>
            </RcIf>
            
            <RcIf if={email != ''}>
                <img src={ mainImage } alt='Íconce de usuário' id='main-image' />

                <hr id='hr-top-left' />
                <hr id='hr-top-right' />

                <form onSubmit={alterarSenha}>
                    <div className='inputs'>
                        {/*PASSWORD INPUT*/}
                        <label className='label-password-input' for='password-input'> Digite sua senha: </label>
                        <div className='div-password'>
                            <div className='div-padlock-icon'>
                                <img id='padlock-icon' src={ padlockIcon } alt='padlock' />
                            </div>
                            <input type="password" className="form-control" name="senha" id="password-input" 
                            placeholder="Senha" value={senha1} onChange={e => setSenha1(e.target.value)} required/>
                        </div>
                 

                        {/*PASSWORD INPUT CONFIRMATION*/}
                        <label className='label-password-input-confirmation' for='password-input-confirmation'> Confirme sua senha: </label>
                        <div className='password-confirmation'>
                            <div className='div-padlock-icon-confirmation'>
                                <img id='padlock-icon-confirmation' src={ padlockIcon } alt='padlock' />
                            </div>
                            <input type="password" name="password-confirmation" className='form-control' id="password-input-confirmation" 
                            placeholder="Confirme sua senha" value={senha2} onChange={e => setSenha2(e.target.value)} required/>
                        </div>
                        <button className="btn btn-primary enter-button" href='./main' >Confirmar</button>
                    </div>
                </form>
            </RcIf>
                    
                
                
        </div>

    </div>

    );
}
