import React, { useState } from 'react';
import RcIf from 'rc-if';
import SweetAlert from 'sweetalert2-react';
import queryString from 'query-string';
//import mainBanner from '../assets/icons/1920x650.png'
//import secondaryBanner from '../assets/icons/390x280.png'
//import 'bootstrap/dist/css/bootstrap.min.css';
import api from '../../service/api'

import './Autenticacao.css';

export default function Autenticacao({ location }) {

    const [ autenticacaoSucess, setAutenticacaoSucess ] = useState('');
    const [ autenticacaoError, setAutenticacaoError ] = useState('');
    
    function buscarQuery(){
        const values = queryString.parse(location.search)
        return values.token
    }

    async function setarAutenticacao(){
        const tokenReq = buscarQuery();
        console.log(tokenReq)
        const response = await api.post('/autenticar',{ 
            token: tokenReq,
        });

        console.log(response)
        if(response.data.msg == "sucess"){
            setAutenticacaoSucess('true')
        } else {
           setAutenticacaoError('true')
        }
    }

    return (
        
    <div className='main'> 
        {/*
        <div class='logo'>
            <img src={ mainImage } alt='Íconce de usuário' id='main-image' />
        </div>

        <hr id='divisor' />
        */}

        <h3> Bem vindo, clique no botão abaixo para confirmar seu cadastro.</h3>
        <button onClick={setarAutenticacao}> Confirmar </button>

        <RcIf if={autenticacaoSucess === "true"}>
            <SweetAlert
                show={autenticacaoSucess}
                title="Parabéns!!"
                html='Cadastro autenticado com sucesso. Clique <a href="https://jvse.github.io/topicos-frontend">aqui</a> para efetuar o login'
                type="success"
                showConfirmButton={false}
            />
        </RcIf>
        <RcIf if={autenticacaoError === "true"}>
            <SweetAlert
                show={autenticacaoError}
                title="Sinto Muito!!"
                text="Cadastro nao foi autenticado com sucesso"
                type="error"
                onConfirm={() => {
                    setAutenticacaoError(null);
                }}
            />
        </RcIf>
       
      

    </div>

    );
}
