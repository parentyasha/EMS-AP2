import React, { useState, useEffect, } from 'react';
import RcIf from 'rc-if';
import SweetAlert from 'sweetalert2-react';
import api from '../../service/api'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

import mainImage from '../../assets/user2.png'
import userIcon from '../../assets/user2.png'
import padlockIcon from '../../assets/padlock.png'
 
import './Register.css';

/*
const header = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type,Content-Length, Authorization, Accept,X-Requested-With",
    "Access-Control-Allow-Methods": "PUT,POST,GET,DELETE,OPTIONS"
}
*/

export default function Register({ history }) {
    const [ email, setEmail ] = useState('');
    const [ senha, setSenha ] = useState('');
    const [ nome, setNome ] = useState('');
    const [ professor, setProfessor ] = useState();
    const [ cadastro, setCadastro ] = useState('');

    const [ senha1, setSenha1 ] = useState('');
    const [ senha2, setSenha2 ] = useState('');


    async function efetuarCadastro(e){
        e.preventDefault();
        
        const response = await api.post('/cadastro/usuario',{
            nome: nome,
            email: email,
            senha: senha,
            professor: professor
        });

        if(response.data.user){
            setCadastro('true')
            
        } 
        else {
            history.push(`/${response.data._id}/icon`)
            
        }
        
    }

    useEffect(() => {
        if (senha1 !== senha2){
            console.log("Senha não coincidem")
        } 
        else {
            setSenha(senha2);
            console.log(senha)
        }
        
        if (email.includes('rede.ulbra.br')){
            setProfessor(false);
        } 
        else if(email.includes('ulbra.br')){
            setProfessor(true);
        }
        
        console.log(professor);
        
    })

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        
    <div className='main-register'>

        <RcIf if={cadastro === "true"}>
            <SweetAlert
                show={cadastro}
                title="Falha no Cadastro"
                text="E-mail já cadastrado!"
                type="error"
                onConfirm={() => setCadastro(null)}
            />
        </RcIf>
        <div className='form-register'>
            
            <img src={ mainImage } alt='Íconce de usuário' id='main-image' />

            <hr id='hr-top-left' />
            <hr id='hr-top-right' />

            <h2 id='h2-cadastro'>CADASTRO</h2>

            <form onSubmit={efetuarCadastro}> 
                <div className='inputs'>
                    {/*PASSWORD INPUT*/}
                    
                    <label className='label-name-input' for='name-input'> Digite seu nome: </label>

                    <div className='name'>
                        <div className='div-user-icon'>
                            <img id='user-icon' src={ userIcon } alt='imagem usuário' />
                        </div>
                        <div>
                            <input  className="form-control" id="name-input" aria-describedby="nameHelp"
                                placeholder="Digite seu nome" name='name' type="text" value={nome} onChange={e => setNome(e.target.value)} required />
                        </div>
                    </div>

                    <label className='label-email-input' for='email-input'> Digite seu e-mail: </label>
                    
                    <div className='email'>
                        <div className='div-user-icon'>
                            <img id='user-icon' src={ userIcon } alt='imagem usuário' />
                        </div>
                        <div>
                            <input  className="form-control" id="email-input" aria-describedby="emailHelp"
                                placeholder="usuario@rede.ulbra.br" name='email' type="text" value={email} onChange={e => setEmail(e.target.value)} required />
                        </div>
                    </div>

                    {/*PASSWORD INPUT*/}
                    <label className='label-password-input' for='password-input'> Digite sua senha: </label>
                    <div className='password'>
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
                        <input type="password" className="form-control" name="password-confirmation" id="password-input-confirmation" 
                            placeholder="Confirme sua senha" value={senha2} onChange={e => setSenha2(e.target.value)} required/>
                    </div>
                </div>
                    
                <div className="div-accept-terms">

                    <Button className='btn btn-outline-info terms-use' onClick={handleShow} required>
                        Termos de uso
                    </Button>
                    
                    <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Política de Privacidade</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className='terms'>
                        
                        <p align="justify">
                            A BattleClass Inc. ("BattleClass") leva a privacidade de seus alunos, professores e pais a sério. 
                            A BattleClass  está comprometida em proteger a privacidade dos usuários, proporcionando uma experiência 
                            de aprendizado personalizada e valiosa.
                        </p>
                        <p align="justify">
                            A BattleClass aceitou o Compromisso de Privacidade do Estudante como um compromisso público pela 
                            coleta e uso responsáveis ​​dos dados do aluno. Entre outras coisas, comprometemo-nos a coletar apenas 
                            as informações dos alunos necessárias para fins educacionais/escolares autorizados, ou conforme 
                            autorizado pelos pais/aluno, para não vender informações pessoais dos alunos, não usar as informações 
                            dos alunos para direcionamento comportamental de anúncios aos alunos. e não reter informações pessoais 
                            do aluno além do período necessário para apoiar os propósitos educacionais/escolares autorizados. 
                            “Todas as informações pessoais relativas a membros, assinantes, clientes ou visitantes que usem o 
                            BattleClass  serão tratadas em concordância com a Lei da Proteção de Dados Pessoais de 26 de outubro 
                            de 1998 (Lei n.º 67/98).” A BattleClass  desenvolveu esta Política de Privacidade para informar aos 
                            usuários em termos gerais sobre as práticas de gerenciamento de informações pessoais da Classcraft, 
                            incluindo quais informações pessoais são coletadas e como são processadas e usadas. Se os usuários 
                            tiverem alguma dúvida sobre nossa Política de Privacidade, poderão entrar em contato com a BattleClass  
                            em contato.devs@gmail.com.
                        </p>

                        <strong>O ambiente escolar</strong>

                        <p  align="justify">Como o BattleClass  foi desenvolvido para ser jogado em grupo, muitas das informações coletadas sobre 
                        professores e alunos devem ser compartilhadas. O BattleClass  armazena as seguintes informações que o 
                        professor e os alunos:</p>

                        <ul>
                            <li>Nome do aluno ou professor;</li>
                            <li>Endereço de e-mail do aluno ou professor;</li>
                            <li>Atividades de jogo para estudantes ou professores;</li>
                            <li>Conteúdo gerado pelo professor (por exemplo: postagens, tarefas, questionários etc.);</li>
                        </ul>

                        <p  align="justify">
                            Entende-se que o professor publica as  atividades, informações ou comunicações relacionadas ao jogo ou 
                            à classe podem ser visíveis para professores.  O compartilhamento das informações acima também está 
                            sujeito às políticas de privacidade das instituições educacionais relevantes. Se os usuários tiverem 
                            alguma dúvida sobre o compartilhamento dessas informações, a BattleClass  recomenda que os usuários 
                            entrem em contato com as instituições educacionais relevantes.
                        </p>
                        <p  align="justify">
                            A BattleClass  implementou medidas de segurança para garantir que esses dados não sejam compartilhados 
                            fora do ambiente escolar, exceto conforme descrito nesta Política de Privacidade.
                        </p>

                        <strong>Informações coletadas</strong>
                        <p  align="justify">1. Informações Pessoais</p>

                        <p  align="justify">A BattleClass  coleta informações pessoais para os seguintes propósitos:</p>
                        <ul>
                            <li>Efetuando login no aplicativo;</li>
                            <li>Operando o jogo;</li>
                            <li>Entrega de tarefas e conclusão de tarefas no aplicativo;</li>
                        </ul>

                        <p  align="justify">As informações coletadas para as contas do PROFESSOR podem incluir:</p>
                        <ul>
                            <li>Endereço de e-mail;</li>
                            <li>Dados de jogo;</li>
                            <li>Conteúdo gerado pelo professor (por exemplo: postagens, tarefas, questionários etc.);</li>
                            <li>Notas de atribuição;</li>
                            <li>Atividade do usuário (por exemplo: logins, páginas visualizadas, etapas de configuração da 
                            conta concluídas etc.).</li>
                        </ul>

                        <p  align="justify">As informações coletadas para as contas dos ALUNOS estão limitadas a:</p>
                        <ul>
                            <li>Nome de usuário;</li>
                            <li>Endereços de e-mail institucional;</li>
                            <li>Nome e sobrenome;</li>
                            <li>Dados de jogo (por exemplo: concessão de XP, HP, escolha de seus avatares, etc.);</li>
                            <li>Notas da tarefa </li>
                            <li>Conteúdo gerado pelo aluno (por exemplo: respostas a questionários etc.);</li>
                        </ul>

                        <p  align="justify">BattleClass não coleta os seguintes dados:</p>
                        <ul>
                            <li>Dados biométricos fisiológicos;</li>
                            <li>Informações sobre o status de almoço grátis ou reduzido;</li>
                            <li>Listas de contatos ou listas de amigos do usuário;</li>
                            <li>Notas de avaliação/ relacionadas diretamente a instituição de ensino;</li>
                        </ul>

                        <strong>O que a BlattleClass faz com as informações coletadas?</strong>
                        <p  align="justify">As informações coletadas são usadas para os seguintes propósitos:</p>
                        <ul>
                            <li>Permitir que o professor gerencie o jogo;</li>
                            <li>Permitir que colegas joguem o jogo;</li>
                            <li>Habilitar atividades relacionadas à classe, como conteúdo da sala de aula, tarefas e comunicações;</li>
                            <li>Para fins de suporte de software;</li>
                        </ul>
                        
                        <p  align="justify">
                            A BattleClass  não compartilha informações de identificação pessoal fora do ambiente escolar, exceto 
                            para os fins estabelecidos neste documento, sem primeiro obter o consentimento expresso por escrito 
                            da pessoa.
                        </p>

                        <strong>Privilégios de acesso de usuário da BattleClass</strong>
                        <p  align="justify">
                            É concedido aos alunos acesso a seus dados pessoais, dados de jogo em equipe, todo o conteúdo 
                            postado pelo professor no sistema de conteúdo da sala de aula.
                        </p>

                        <strong>Registros de Alunos</strong>
                        <p  align="justify">
                            Os registros dos alunos são de propriedade e estão sob o controle da escola e/ou distrito escolar. 
                            Os alunos podem acessar seus registros de estudante fazendo login na conta de aluno.
                        </p>
                        <p  align="justify">
                            Terceiros não têm acesso a informações de identificação pessoal, registros educacionais ou outros 
                            registros de alunos, exceto conforme estabelecido nesta Política de Privacidade, ou após obter primeiro 
                            o consentimento expresso por escrito dos alunos.
                        </p>
                        <p  align="justify">
                            Se houver divulgação não autorizada dos registros de um aluno, a BattleClass  notificará a instituição, 
                            o professor, e o aluno por e-mail dentro de até 3 dias após a descoberta da divulgação não autorizada.
                        </p>

                        <strong>Sem marketing para alunos.</strong>
                        <p  align="justify">
                            A BattleClass  não compartilha dados do usuário com terceiros para fins de marketing. Além disso, 
                            a BattleClass  não usa dados do aluno para comercialização de qualquer tipo, incluindo marketing para 
                            o aluno e para os pais.
                        </p>

                        <strong>Exclusão de registros de alunos</strong>
                        <p  align="justify">
                            Os seguintes registros do aluno são retidos por um período não superior a 12 meses após a última entrada 
                            na conta do aluno no jogo:
                        </p>

                        <ul>
                            <li>Informações do jogo do aluno, e todos os dados relacionados, incluindo datas, descrições e valores de pontos;</li>
                            <li>Qualquer outra informação do aluno que não possa ser usada pelo aluno nos próximos anos.</li>
                        </ul>

                        <p  align="justify">Alunos e professores podem solicitar a exclusão de sua conta e as informações relacionadas do banco 
                        de dados da BattleClass, entrando em contato em contato.devs@gmail.com.
                        </p>

                        <strong>Exclusão de registros de professores</strong>
                        <p  align="justify">
                            Os registros dos pais serão retidos por um período não superior a 36 meses após a última entrada feita 
                            em uma das contas dos alunos de seus filhos. Esse período foi selecionado para facilitar o registro 
                            simplificado do BattleClass durante toda a educação de seus filhos.
                        </p>

                        <p  align="justify">
                            Os dados pessoais dos professores e todos os dados ainda não excluídos relacionados às aulas de um 
                            professor serão excluídos 5 anos após a inatividade da conta.
                        </p>

                        <strong>Conformidade regional</strong>
                        <p  align="justify">1. Brasil</p>

                        <strong>Marco Civil da Internet</strong>
                        <p  align="justify">O marco civil da internet estabelece princípios, garantias, direitos e deveres para o uso da 
                            internet no Brasil e determina as diretrizes para atuação da União, dos Estados, do Distrito Federal 
                            e dos Municípios em relação à matéria. A política de privacidade da BattleClass é projetada para 
                            proteger os dados dos alunos em conformidade com o Marco Civil da Internet.
                        </p>

                        <p  align="justify">
                            A disciplina do uso da internet no Brasil tem como fundamento o respeito à liberdade de expressão, bem como:
                        </p>

                        <p  align="justify">I - o reconhecimento da escala mundial da rede;</p>
                        <p  align="justify">II - os direitos humanos, o desenvolvimento da personalidade e o exercício da cidadania em meios digitais;</p>
                        <p  align="justify">III - a pluralidade e a diversidade;</p>
                        <p  align="justify">IV - a abertura e a colaboração;</p>
                        <p  align="justify">V - a livre iniciativa, a livre concorrência e a defesa do consumidor; e</p>
                        <p  align="justify">VI - a finalidade social da rede.</p>
                        <p  align="justify">Art. 3º A disciplina do uso da internet no Brasil tem os seguintes princípios:</p>
                        <p  align="justify">I - garantia da liberdade de expressão, comunicação e manifestação de pensamento, nos termos da 
                            Constituição Federal;</p>
                        <p  align="justify">II - proteção da privacidade;</p>
                        <p  align="justify">III - proteção dos dados pessoais, na forma da lei;</p>
                        <p  align="justify">IV - preservação e garantia da neutralidade de rede;</p>
                        <p  align="justify">V - preservação da estabilidade, segurança e funcionalidade da rede, por meio de medidas técnicas 
                            compatíveis com os padrões internacionais e pelo estímulo ao uso de boas práticas;</p>
                        <p  align="justify">VI - responsabilização dos agentes de acordo com suas atividades, nos termos da lei;</p>
                        <p  align="justify">VII - preservação da natureza participativa da rede;</p>
                        <p  align="justify">VIII - liberdade dos modelos de negócios promovidos na internet, desde que não conflitem com os 
                            demais princípios estabelecidos nesta Lei.</p>

                        <strong>Política de segurança</strong>
                        <p  align="justify">
                            A BattleClass  usa métodos padrão do setor para proteger os dados de seus clientes contra uso ou acesso 
                            não autorizado, alteração, destruição ou perda ilegal ou acidental. No entanto, deve-se notar que não é 
                            possível garantir 100% devido a constantes avanços na tecnologia de vírus e hackers. A BattleClass não 
                            pode, portanto, ser responsabilizada pela perda ou alteração de dados. Uma cópia completa da Política 
                            de Segurança da BattleClass  pode ser obtida mediante solicitação para contato.dev@gmail.com.
                        </p>

                        <strong>Alterações e acesso a informações pessoais</strong>
                        <p  align="justify">
                            Os usuários têm acesso às suas informações pessoais por meio da conta de usuário do BattleClass ou 
                            entrando em contato com contato.dev@gmail.com.
                        </p>

                        <p  align="justify">
                            Os usuários também podem solicitar uma cópia de suas informações pessoais ou fazer modificações em 
                            qualquer informação incorreta enviando uma solicitação por escrito para contato.dev@gmail.com. 
                            As seguintes informações devem ser fornecidas:
                        </p>
                        
                        <ul>
                            <li>Primeiro e último nome;</li>
                            <li>O email;</li>
                            <li>Nome da turma e escola;</li>
                            <li>Nome do aluno e/ou ID do usuário e/ou nome de usuário;</li>
                        </ul>

                        <p  align="justify">O usuário será então contatado por um membro da equipe BattleClass  para fins de verificação.</p>

                        <p  align="justify">
                            Os usuários também podem corrigir e atualizar suas informações pessoais usando os mesmos procedimentos 
                            descritos acima.
                        </p>

                        <strong>Mudança de Controle</strong>
                        <p  align="justify">
                            Caso toda ou parte da BattleClass ou seus ativos sejam adquiridos ou mesclados com terceiros, as 
                            informações pessoais que coletamos dos usuários seriam um dos ativos transferidos ou adquiridos por 
                            esse terceiro. Esta Política de Privacidade continuará sendo aplicada às suas informações, e qualquer 
                            adquirente somente poderá lidar com suas informações pessoais de acordo com esta política (a menos que 
                            você dê consentimento a uma nova política). Nós lhe enviaremos um aviso de aquisição dentro de trinta 
                            (30) dias após a conclusão de tal transação, publicando em nossa página inicial ou por e-mail para o 
                            seu endereço de e-mail que você nos forneceu. Se você não consentir o uso de suas informações pessoais 
                            por uma empresa sucessora, poderá solicitar sua exclusão da empresa.
                        </p>
                        
                        <p  align="justify">
                            No caso improvável de a BattleClass encerrar as atividades, todas as informações do usuário serão 
                            excluídas com segurança dentro de 12 meses a partir da data de encerramento das atividades.
                        </p>

                        <strong>Divulgação de informações para cumprir as obrigações legais</strong>
                        <p  align="justify">
                            A BattleClass  pode divulgar informações pessoais se acreditarmos de boa fé que isso é necessário 
                            para cumprir a lei, como cumprir uma intimação ou outro processo legal. Podemos precisar divulgar 
                            informações pessoais onde, de boa fé, acharmos necessário proteger os direitos, propriedade ou 
                            segurança da BattleClass  , nossos funcionários, nossa comunidade ou outros, ou impedir violações de 
                            nossos Termos de Serviço ou outros acordos. Isso inclui, sem limitação, a troca de informações com 
                            outras empresas e organizações para proteção contra fraudes ou resposta a solicitações governamentais.
                        </p>

                        <strong>Alterações e atualizações da Política de Privacidade</strong>
                        <p  align="justify">
                            A BattleClass  pode, a seu exclusivo critério, atualizar, revisar, modificar e suplementar periodicamente 
                            esta Política de Privacidade. Se fizermos modificações nesta política ou nos Contratos de Usuário 
                            relacionados, publicaremos um aviso que você receberá quando fizer login no jogo e/ou enviaremos 
                            um email diretamente para você com uma cópia dos novos documentos. A BattleClass  pede aos usuários 
                            que revejam a Política de Privacidade atualizada e/ou os Contratos de usuário antes de continuarem 
                            a usar nossos serviços. Se os usuários não aceitarem a Política de Privacidade atualizada, os usuários 
                            poderão cancelar suas assinaturas de acordo com o Contrato de Licença do Professor, os Termos de Uso do 
                            Estudante e/ou os Termos de Uso dos Pais.
                        </p>
                        
                        <strong>Consentimento para a coleta e processamento de informações</strong>
                        <p  align="justify">
                            Ao aceitar o Contrato de Licença do Professor, os Termos de Uso dos Pais e/ou os Termos de Uso dos 
                            Estudantes estão expressamente concedendo à BattleClass  uma declaração especial de que os usuários 
                            decidiram, por livre e espontânea vontade, conceder autorização específica à BattleClass  para coletar, 
                            processar e usar as informações pessoais estipuladas nessa Política de Privacidade e para usar essas 
                            informações de acordo com o que é estipulado nesta Política de Privacidade. Os usuários estão declarando 
                            ainda que estão cientes do objetivo da BattleClass  de coletar, processar e usar essas informações, 
                            como o processamento será conduzido, como a privacidade dos usuários será protegida e que os usuários 
                            estão autorizados a retirar seu consentimento.
                        </p>
                        
                        <strong>Contato</strong>
                        <p  align="justify">
                            O serviço da BattleClass  aos seus usuários e a confiança dos usuários são de extrema importância. 
                            Se os usuários tiverem alguma dúvida sobre esta Política de Privacidade, os usuários devem entrar 
                            em contato com a BattleClass em:
                        </p>
                        <strong>E-mail:</strong> contato.devs@gmail.com

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Fechar
                        </Button>
                        <Button variant="primary" onClick={handleClose} required>
                            Aceitar
                        </Button>
                    </Modal.Footer>
                    </Modal>

                </div>
                
                <button className="btn btn-primary enter-button"> Criar </button> 

                <div className='link'>
                    <a href='/frontend-battleclass/' id='link-login'> Já possui cadastro? </a>
                </div>
                
            </form>
        </div>

    </div>

    
        
   

    );
}

