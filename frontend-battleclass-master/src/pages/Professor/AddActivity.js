import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import SweetAlert from 'sweetalert2-react';
import RcIf from 'rc-if'
import userProfile from '../../assets/user-profile.svg';
import api from '../../service/api'

import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import './AddActivity.css';

export default function AddActivity({ history, match }) {
    const [grupos, setGrupos] = useState([])
    const [icon] = useState(Object)

    const [msg, setMsg] = useState('');

    const [titulo, setTitulo] = useState('');
    const [contexto, setContexto] = useState([]);

    /*const [a, setA] = useState(Object)*/

    const [conteudo1, setConteudo1] = useState('');
    const [questoes1, setQuestoes1] = useState([]);
    var lista1 = questoes1;
    const [conteudo2, setConteudo2] = useState('');
    const [questoes2, setQuestoes2] = useState([]);
    var lista2 = questoes2
    const [conteudo3, setConteudo3] = useState('');
    const [questoes3, setQuestoes3] = useState([]);
    var lista3 = questoes3
    const [conteudo4, setConteudo4] = useState('');
    const [questoes4, setQuestoes4] = useState([]);
    var lista4 = questoes4
    const [conteudo5, setConteudo5] = useState('');
    const [questoes5, setQuestoes5] = useState([]);
    var lista5 = questoes5

    const [questao1Gabarito, setQuestao1Gabarito] = useState(Object);
    const [questao2Gabarito, setQuestao2Gabarito] = useState(Object);
    const [questao3Gabarito, setQuestao3Gabarito] = useState(Object);
    const [questao4Gabarito, setQuestao4Gabarito] = useState(Object);
    const [questao5Gabarito, setQuestao5Gabarito] = useState(Object);



    var cont = 5

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

        buscarTeams();

    }, []);

    function create_CKEditor() {
        let radioHTML = "<input type='radio' name='radioButton' className='input-radio' />"
        let get_div_radio = document.querySelector('.radio-alternative')
        /*/*let create_radio = document.createElement('radio')*/
        /*/*get_div_radio.appendChild(radioHTML)*/
        /*get_div_radio.innerHTML = radioHTML*/


        /*RADIO*/

        let theInput = document.createElement("input");
        theInput.setAttribute('type', "radio");
        theInput.setAttribute('name', 'radioButton');
        theInput.setAttribute('className', 'input-radio');
        get_div_radio.appendChild(theInput)

        let get_div_input_br2 = document.querySelector('.radio-alternative')
        let element_br2 = document.createElement('br')
        get_div_input_br2.appendChild(element_br2)


        /*EDITOR*/
        let get_div_editor_br = document.querySelector('.editor-alternative')
        let create_br = document.createElement('br')
        get_div_editor_br.appendChild(create_br)
        /*get_div_radio.appendChild(create_br)*/

        /*let CKEditorHTML = "<CKEditor id='Editor-teste' editor={ ClassicEditor } onInit={ editor => { // You can store the 'editor' and use when it is needed. console.log( 'Editor is ready to use!', editor ); } } onChange={ ( event, editor ) => { const data = editor.getData(); console.log( { event, editor, data } ); } } onBlur={ ( event, editor ) => { console.log( 'Blur.', editor ); } } onFocus={ ( event, editor ) => { console.log( 'Focus.', editor ); } } />"
        */
        ClassicEditor
            .create(document.querySelector('#editor'), {
                /*removePlugins: [ 'Bold', 'Link' ],*/
                toolbar: ['heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote'],
                heading: {
                    options: [
                        { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
                        { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
                        { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' }
                    ]
                }
            })
            .catch(error => {
                console.log(error);
            });
        const CKEditorHTML = `<${CKEditor}
                editor={ ${ClassicEditor} }

                onInit={ editor => {
                    // You can store the "editor" and use when it is needed.
                    console.log( 'Editor is ready to use!', editor );
                } }
                onChange={ ( event, editor ) => {
                    const data = editor.getData();
                    console.log( { event, editor, data } );
                } }
                onBlur={ ( event, editor ) => {
                    console.log( 'Blur.', editor );
                } }
                onFocus={ ( event, editor ) => {
                    console.log( 'Focus.', editor );
                } }
            />`


        let get_div_editor = document.querySelector('.editor-alternative')
        /*let get_CKEditor = document.getElementById('Editor-teste')
        let create_editor = document.createElement(get_CKEditor)
        get_div_editor.appendChild(create_editor)*/
        get_div_editor.innerHTML = CKEditorHTML

        let get_div_editor_br2 = document.querySelector('.editor-alternative')
        let create_br2 = document.createElement('br')
        get_div_editor_br2.appendChild(create_br2)
    }

    function alternativas() {
        this.qtd_alternativas += 1

    }

    async function salvarAtividade() {
        const obj = {
            titulo: titulo,
            conteudo: contexto,
            questoes: [
                { 1: { texto: conteudo1, alternativas: lista1 } },
                { 2: { texto: conteudo2, alternativas: lista2 } },
                { 3: { texto: conteudo3, alternativas: lista3 } },
                { 4: { texto: conteudo4, alternativas: lista4 } },
                { 5: { texto: conteudo5, alternativas: lista5 } }
            ],
            gabarito: [questao1Gabarito, questao2Gabarito, questao3Gabarito, questao4Gabarito, questao5Gabarito],
            dataPostagem: new Date().toLocaleDateString(),
        }
        const response = await api.post('/cadastro/atividade', obj);

        console.log(obj)
        if (response) {
            setMsg('true')
        } else {
            setMsg('false')
        }
    }

    return (
        <div className='add-activity'>

            <RcIf if={msg === "false"}>
                <SweetAlert
                    show={msg}
                    title="Ops!!"
                    text="Ocorreu algum erro na hora de cadastrar uma nova mensagem."
                    type='error'
                    onConfirm={() => setMsg(null)}
                />
            </RcIf>
            <RcIf if={msg === "true"}>
                <SweetAlert
                    show={msg}
                    title="Cadastro efetuado com sucesso"
                    text="Atividade cadastrada com sucesso"
                    type='success'
                    onConfirm={() => {
                        setMsg(null);
                        history.push('/activitys');
                    }}
                />
            </RcIf>
            <div className='screen-data'>
                <div className='str'>
                    Adicionar Atividade
                </div>
            </div>
            <div className='div-img-user'>
                <img src={icon.url} className='img-user' />
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

            <div className='content'>
                <div className='input-title'>
                    <label><strong>Título da atividade</strong></label>
                    <input type='text' className="form-control" placeholder='Adicione um título' value={titulo} onChange={e => setTitulo(e.target.value)} />
                </div>
                <div className='input-title'>
                    <label><strong>Conteúdo presente na atividade</strong></label>
                    <textarea type='text' className="form-control" placeholder='Adicione o contexto da atividade' value={contexto} onChange={e => setContexto(e.target.value)} />
                </div>
                <div className='cards-questions'>
                    <div className='individual-card'>
                        <b>Questão 1</b>
                        <div className='str-content'>
                            <strong>Conteúdo</strong>
                        </div>
                        <div className='editor'>
                            {/*onclick={get_CKditor()}*/}
                            <CKEditor
                                editor={ClassicEditor}

                                onInit={editor => {
                                    // You can store the "editor" and use when it is needed.
                                    console.log('Editor is ready to use!', editor);
                                }}
                                onChange={(event, editor) => {
                                    const data = editor.getData();
                                    console.log({ event, editor, data });
                                    setConteudo1(data)
                                }}
                                onBlur={(event, editor) => {
                                    console.log('Blur.', editor);
                                }}
                                onFocus={(event, editor) => {
                                    console.log('Focus.', editor);
                                }}
                            />
                        </div>

                        <div className='alternative'>
                            <strong>Alternativas</strong><br />
                            <div className='letter-editor'>
                                <div className='letter-alternative'>
                                    a)
                                </div>
                                <br />
                                <div className='editor-alternative'>
                                    <CKEditor
                                        editor={ClassicEditor}

                                        onInit={editor => {
                                            // You can store the "editor" and use when it is needed.
                                            console.log('Editor is ready to use!', editor);
                                        }}
                                        onChange={(event, editor) => {
                                            const data = editor.getData();
                                            console.log({ event, editor, data });

                                        }}
                                        onBlur={(event, editor) => {
                                            console.log('Blur.', editor);
                                            const data = editor.getData();
                                            var a = {
                                                texto: data
                                            }
                                            lista1.push({ a })
                                            setQuestoes1(lista1)
                                            console.log(questoes1)
                                        }}
                                        onFocus={(event, editor) => {
                                            console.log('Focus.', editor);
                                        }}
                                    />

                                </div>
                            </div>

                            <div className='letter-editor'>
                                <div className='letter-alternative'>
                                    b)
                                </div>
                                <br />
                                <div className='editor-alternative'>
                                    <CKEditor
                                        editor={ClassicEditor}

                                        onInit={editor => {
                                            // You can store the "editor" and use when it is needed.
                                            console.log('Editor is ready to use!', editor);
                                        }}
                                        onChange={(event, editor) => {
                                            const data = editor.getData();
                                            console.log({ event, editor, data });
                                        }}
                                        onBlur={(event, editor) => {
                                            console.log('Blur.', editor);
                                            const data = editor.getData();
                                            var b = {
                                                texto: data
                                            }
                                            lista1.push({ b })

                                            setQuestoes1(lista1)
                                            console.log(questoes1)
                                        }}
                                        onFocus={(event, editor) => {
                                            console.log('Focus.', editor);
                                        }}
                                    />

                                </div>
                            </div>

                            <div className='letter-editor'>
                                <div className='letter-alternative'>
                                    c)
                                </div>
                                <br />
                                <div className='editor-alternative'>
                                    <CKEditor
                                        editor={ClassicEditor}

                                        onInit={editor => {
                                            // You can store the "editor" and use when it is needed.
                                            console.log('Editor is ready to use!', editor);
                                        }}
                                        onChange={(event, editor) => {
                                            const data = editor.getData();
                                            console.log({ event, editor, data });

                                        }}
                                        onBlur={(event, editor) => {
                                            console.log('Blur.', editor);
                                            const data = editor.getData();
                                            var c = {
                                                texto: data
                                            }
                                            lista1.push({ c })

                                            setQuestoes1(lista1)
                                            console.log(questoes1)
                                        }}
                                        onFocus={(event, editor) => {
                                            console.log('Focus.', editor);
                                        }}
                                    />

                                </div>
                            </div>

                            <div className='letter-editor'>
                                <div className='letter-alternative'>
                                    d)
                                </div>
                                <br />
                                <div className='editor-alternative'>
                                    <CKEditor
                                        editor={ClassicEditor}

                                        onInit={editor => {
                                            // You can store the "editor" and use when it is needed.
                                            console.log('Editor is ready to use!', editor);
                                        }}
                                        onChange={(event, editor) => {
                                            const data = editor.getData();
                                            console.log({ event, editor, data });

                                        }}
                                        onBlur={(event, editor) => {
                                            console.log('Blur.', editor);
                                            const data = editor.getData();
                                            var d = {
                                                texto: data
                                            }
                                            lista1.push({ d })

                                            setQuestoes1(lista1)
                                            console.log(questoes1)
                                        }}
                                        onFocus={(event, editor) => {
                                            console.log('Focus.', editor);
                                        }}
                                    />

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='cards-questions'>
                    <div className='individual-card'>
                        <b>Questão 2</b>
                        <div className='str-content'>
                            <strong>Conteúdo</strong>
                        </div>
                        <div className='editor'>
                            {/*onclick={get_CKditor()}*/}
                            <CKEditor
                                editor={ClassicEditor}

                                onInit={editor => {
                                    // You can store the "editor" and use when it is needed.
                                    console.log('Editor is ready to use!', editor);
                                }}
                                onChange={(event, editor) => {
                                    const data = editor.getData();
                                    console.log({ event, editor, data });
                                    setConteudo2(data)
                                }}
                                onBlur={(event, editor) => {
                                    console.log('Blur.', editor);
                                }}
                                onFocus={(event, editor) => {
                                    console.log('Focus.', editor);
                                }}
                            />
                        </div>

                        <div className='alternative'>
                            <strong>Alternativas</strong><br />
                            <div className='letter-editor'>
                                <div className='letter-alternative'>
                                    a)
                                </div>
                                <br />
                                <div className='editor-alternative'>
                                    <CKEditor
                                        editor={ClassicEditor}

                                        onInit={editor => {
                                            // You can store the "editor" and use when it is needed.
                                            console.log('Editor is ready to use!', editor);
                                        }}
                                        onChange={(event, editor) => {
                                            const data = editor.getData();
                                            console.log({ event, editor, data });

                                        }}
                                        onBlur={(event, editor) => {
                                            console.log('Blur.', editor);
                                            const data = editor.getData();
                                            var a = {
                                                texto: data
                                            }
                                            lista2.push({ a })

                                            setQuestoes2(lista2)
                                        }}
                                        onFocus={(event, editor) => {
                                            console.log('Focus.', editor);
                                        }}
                                    />

                                </div>
                            </div>

                            <div className='letter-editor'>
                                <div className='letter-alternative'>
                                    b)
                                </div>
                                <br />
                                <div className='editor-alternative'>
                                    <CKEditor
                                        editor={ClassicEditor}

                                        onInit={editor => {
                                            // You can store the "editor" and use when it is needed.
                                            console.log('Editor is ready to use!', editor);
                                        }}
                                        onChange={(event, editor) => {
                                            const data = editor.getData();
                                            console.log({ event, editor, data });

                                        }}
                                        onBlur={(event, editor) => {
                                            console.log('Blur.', editor);
                                            const data = editor.getData();
                                            var b = {
                                                texto: data
                                            }
                                            lista2.push({ b })

                                            setQuestoes2(lista2)
                                        }}
                                        onFocus={(event, editor) => {
                                            console.log('Focus.', editor);
                                        }}
                                    />

                                </div>
                            </div>

                            <div className='letter-editor'>
                                <div className='letter-alternative'>
                                    c)
                                </div>
                                <br />
                                <div className='editor-alternative'>
                                    <CKEditor
                                        editor={ClassicEditor}

                                        onInit={editor => {
                                            // You can store the "editor" and use when it is needed.
                                            console.log('Editor is ready to use!', editor);
                                        }}
                                        onChange={(event, editor) => {
                                            const data = editor.getData();
                                            console.log({ event, editor, data });

                                        }}
                                        onBlur={(event, editor) => {
                                            console.log('Blur.', editor);
                                            const data = editor.getData();
                                            var c = {
                                                texto: data
                                            }
                                            lista2.push({ c })

                                            setQuestoes2(lista2)
                                        }}
                                        onFocus={(event, editor) => {
                                            console.log('Focus.', editor);
                                        }}
                                    />

                                </div>
                            </div>

                            <div className='letter-editor'>
                                <div className='letter-alternative'>
                                    d)
                                </div>
                                <br />
                                <div className='editor-alternative'>
                                    <CKEditor
                                        editor={ClassicEditor}

                                        onInit={editor => {
                                            // You can store the "editor" and use when it is needed.
                                            console.log('Editor is ready to use!', editor);
                                        }}
                                        onChange={(event, editor) => {
                                            const data = editor.getData();
                                            console.log({ event, editor, data });

                                        }}
                                        onBlur={(event, editor) => {
                                            console.log('Blur.', editor);
                                            const data = editor.getData();
                                            var d = {
                                                texto: data
                                            }
                                            lista2.push({ d })

                                            setQuestoes2(lista2)
                                        }}
                                        onFocus={(event, editor) => {
                                            console.log('Focus.', editor);
                                        }}
                                    />

                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <div className='cards-questions'>
                    <div className='individual-card'>
                        <b>Questão 3</b>
                        <div className='str-content'>
                            <strong>Conteúdo</strong>
                        </div>
                        <div className='editor'>
                            {/*onclick={get_CKditor()}*/}
                            <CKEditor
                                editor={ClassicEditor}

                                onInit={editor => {
                                    // You can store the "editor" and use when it is needed.
                                    console.log('Editor is ready to use!', editor);
                                }}
                                onChange={(event, editor) => {
                                    const data = editor.getData();
                                    console.log({ event, editor, data });
                                    setConteudo3(data)
                                }}
                                onBlur={(event, editor) => {
                                    console.log('Blur.', editor);
                                }}
                                onFocus={(event, editor) => {
                                    console.log('Focus.', editor);
                                }}
                            />
                        </div>

                        <div className='alternative'>
                            <strong>Alternativas</strong><br />
                            <div className='letter-editor'>
                                <div className='letter-alternative'>
                                    a)
                                </div>
                                <br />
                                <div className='editor-alternative'>
                                    <CKEditor
                                        editor={ClassicEditor}

                                        onInit={editor => {
                                            // You can store the "editor" and use when it is needed.
                                            console.log('Editor is ready to use!', editor);
                                        }}
                                        onChange={(event, editor) => {
                                            const data = editor.getData();
                                            console.log({ event, editor, data });

                                        }}
                                        onBlur={(event, editor) => {
                                            console.log('Blur.', editor);
                                            const data = editor.getData();
                                            var a = {
                                                texto: data
                                            }
                                            lista3.push({ a })

                                            setQuestoes3(lista3)
                                        }}
                                        onFocus={(event, editor) => {
                                            console.log('Focus.', editor);
                                        }}
                                    />

                                </div>
                            </div>

                            <div className='letter-editor'>
                                <div className='letter-alternative'>
                                    b)
                                </div>
                                <br />
                                <div className='editor-alternative'>
                                    <CKEditor
                                        editor={ClassicEditor}

                                        onInit={editor => {
                                            // You can store the "editor" and use when it is needed.
                                            console.log('Editor is ready to use!', editor);
                                        }}
                                        onChange={(event, editor) => {
                                            const data = editor.getData();
                                            console.log({ event, editor, data });

                                        }}
                                        onBlur={(event, editor) => {
                                            console.log('Blur.', editor);
                                            const data = editor.getData();
                                            var b = {
                                                texto: data
                                            }
                                            lista3.push({ b })

                                            setQuestoes3(lista3)
                                        }}
                                        onFocus={(event, editor) => {
                                            console.log('Focus.', editor);
                                        }}
                                    />

                                </div>
                            </div>

                            <div className='letter-editor'>
                                <div className='letter-alternative'>
                                    c)
                                </div>
                                <br />
                                <div className='editor-alternative'>
                                    <CKEditor
                                        editor={ClassicEditor}

                                        onInit={editor => {
                                            // You can store the "editor" and use when it is needed.
                                            console.log('Editor is ready to use!', editor);
                                        }}
                                        onChange={(event, editor) => {
                                            const data = editor.getData();
                                            console.log({ event, editor, data });

                                        }}
                                        onBlur={(event, editor) => {
                                            console.log('Blur.', editor);
                                            const data = editor.getData();
                                            var c = {
                                                texto: data
                                            }
                                            lista3.push({ c })

                                            setQuestoes3(lista3)
                                        }}
                                        onFocus={(event, editor) => {
                                            console.log('Focus.', editor);
                                        }}
                                    />

                                </div>
                            </div>

                            <div className='letter-editor'>
                                <div className='letter-alternative'>
                                    d)
                                </div>
                                <br />
                                <div className='editor-alternative'>
                                    <CKEditor
                                        editor={ClassicEditor}

                                        onInit={editor => {
                                            // You can store the "editor" and use when it is needed.
                                            console.log('Editor is ready to use!', editor);
                                        }}
                                        onChange={(event, editor) => {
                                            const data = editor.getData();
                                            console.log({ event, editor, data });

                                        }}
                                        onBlur={(event, editor) => {
                                            console.log('Blur.', editor);
                                            const data = editor.getData();
                                            var d = {
                                                texto: data
                                            }
                                            lista3.push({ d })

                                            setQuestoes3(lista3)
                                        }}
                                        onFocus={(event, editor) => {
                                            console.log('Focus.', editor);
                                        }}
                                    />

                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <div className='cards-questions'>
                    <div className='individual-card'>
                        <b>Questão 4</b>
                        <div className='str-content'>
                            <strong>Conteúdo</strong>
                        </div>
                        <div className='editor'>
                            {/*onclick={get_CKditor()}*/}
                            <CKEditor
                                editor={ClassicEditor}

                                onInit={editor => {
                                    // You can store the "editor" and use when it is needed.
                                    console.log('Editor is ready to use!', editor);
                                }}
                                onChange={(event, editor) => {
                                    const data = editor.getData();
                                    console.log({ event, editor, data });
                                    setConteudo4(data)
                                }}
                                onBlur={(event, editor) => {
                                    console.log('Blur.', editor);
                                }}
                                onFocus={(event, editor) => {
                                    console.log('Focus.', editor);
                                }}
                            />
                        </div>

                        <div className='alternative'>
                            <strong>Alternativas</strong><br />
                            <div className='letter-editor'>
                                <div className='letter-alternative'>
                                    a)
                                </div>
                                <br />
                                <div className='editor-alternative'>
                                    <CKEditor
                                        editor={ClassicEditor}

                                        onInit={editor => {
                                            // You can store the "editor" and use when it is needed.
                                            console.log('Editor is ready to use!', editor);
                                        }}
                                        onChange={(event, editor) => {
                                            const data = editor.getData();
                                            console.log({ event, editor, data });
                                        }}
                                        onBlur={(event, editor) => {
                                            console.log('Blur.', editor);
                                            const data = editor.getData();
                                            var a = {
                                                texto: data
                                            }
                                            lista4.push({ a })

                                            setQuestoes4(lista4)
                                        }}
                                        onFocus={(event, editor) => {
                                            console.log('Focus.', editor);
                                        }}
                                    />

                                </div>
                            </div>

                            <div className='letter-editor'>
                                <div className='letter-alternative'>
                                    b)
                                </div>
                                <br />
                                <div className='editor-alternative'>
                                    <CKEditor
                                        editor={ClassicEditor}

                                        onInit={editor => {
                                            // You can store the "editor" and use when it is needed.
                                            console.log('Editor is ready to use!', editor);
                                        }}
                                        onChange={(event, editor) => {
                                            const data = editor.getData();
                                            console.log({ event, editor, data });
                                        }}
                                        onBlur={(event, editor) => {
                                            console.log('Blur.', editor);
                                            const data = editor.getData();
                                            var b = {
                                                texto: data
                                            }
                                            lista4.push({ b })

                                            setQuestoes4(lista4)
                                        }}
                                        onFocus={(event, editor) => {
                                            console.log('Focus.', editor);
                                        }}
                                    />

                                </div>
                            </div>

                            <div className='letter-editor'>
                                <div className='letter-alternative'>
                                    c)
                                </div>
                                <br />
                                <div className='editor-alternative'>
                                    <CKEditor
                                        editor={ClassicEditor}

                                        onInit={editor => {
                                            // You can store the "editor" and use when it is needed.
                                            console.log('Editor is ready to use!', editor);
                                        }}
                                        onChange={(event, editor) => {
                                            const data = editor.getData();
                                            console.log({ event, editor, data });
                                        }}
                                        onBlur={(event, editor) => {
                                            console.log('Blur.', editor);
                                            const data = editor.getData();
                                            var c = {
                                                texto: data
                                            }
                                            lista4.push({ c })

                                            setQuestoes4(lista4)
                                        }}
                                        onFocus={(event, editor) => {
                                            console.log('Focus.', editor);
                                        }}
                                    />

                                </div>
                            </div>

                            <div className='letter-editor'>
                                <div className='letter-alternative'>
                                    d)
                                </div>
                                <br />
                                <div className='editor-alternative'>
                                    <CKEditor
                                        editor={ClassicEditor}

                                        onInit={editor => {
                                            // You can store the "editor" and use when it is needed.
                                            console.log('Editor is ready to use!', editor);
                                        }}
                                        onChange={(event, editor) => {
                                            const data = editor.getData();
                                            console.log({ event, editor, data });
                                        }}
                                        onBlur={(event, editor) => {
                                            console.log('Blur.', editor);
                                            const data = editor.getData();
                                            var d = {
                                                texto: data
                                            }
                                            lista4.push({ d })

                                            setQuestoes4(lista4)
                                        }}
                                        onFocus={(event, editor) => {
                                            console.log('Focus.', editor);
                                        }}
                                    />

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='cards-questions'>
                    <div className='individual-card'>
                        <b>Questão 5</b>
                        <div className='str-content'>
                            <strong>Conteúdo</strong>
                        </div>
                        <div className='editor'>
                            {/*onclick={get_CKditor()}*/}
                            <CKEditor
                                editor={ClassicEditor}

                                onInit={editor => {
                                    // You can store the "editor" and use when it is needed.
                                    console.log('Editor is ready to use!', editor);
                                }}
                                onChange={(event, editor) => {
                                    const data = editor.getData();
                                    console.log({ event, editor, data });
                                    setConteudo5(data)
                                }}
                                onBlur={(event, editor) => {
                                    console.log('Blur.', editor);
                                }}
                                onFocus={(event, editor) => {
                                    console.log('Focus.', editor);
                                }}
                            />
                        </div>

                        <div className='alternative'>
                            <strong>Alternativas</strong><br />
                            <div className='letter-editor'>
                                <div className='letter-alternative'>
                                    a)
                                </div>
                                <br />
                                <div className='editor-alternative'>
                                    <CKEditor
                                        editor={ClassicEditor}

                                        onInit={editor => {
                                            // You can store the "editor" and use when it is needed.
                                            console.log('Editor is ready to use!', editor);
                                        }}
                                        onChange={(event, editor) => {
                                            const data = editor.getData();
                                            console.log({ event, editor, data });
                                        }}
                                        onBlur={(event, editor) => {
                                            console.log('Blur.', editor);
                                            const data = editor.getData();
                                            var a = {
                                                texto: data
                                            }
                                            lista5.push({ a })

                                            setQuestoes5(lista5)
                                        }}
                                        onFocus={(event, editor) => {
                                            console.log('Focus.', editor);
                                        }}
                                    />

                                </div>
                            </div>

                            <div className='letter-editor'>
                                <div className='letter-alternative'>
                                    b)
                                </div>
                                <br />
                                <div className='editor-alternative'>
                                    <CKEditor
                                        editor={ClassicEditor}

                                        onInit={editor => {
                                            // You can store the "editor" and use when it is needed.
                                            console.log('Editor is ready to use!', editor);
                                        }}
                                        onChange={(event, editor) => {
                                            const data = editor.getData();
                                            console.log({ event, editor, data });
                                        }}
                                        onBlur={(event, editor) => {
                                            console.log('Blur.', editor);
                                            const data = editor.getData();
                                            var b = {
                                                texto: data
                                            }
                                            lista5.push({ b })

                                            setQuestoes5(lista5)
                                        }}
                                        onFocus={(event, editor) => {
                                            console.log('Focus.', editor);
                                        }}
                                    />

                                </div>
                            </div>

                            <div className='letter-editor'>
                                <div className='letter-alternative'>
                                    c)
                                </div>
                                <br />
                                <div className='editor-alternative'>
                                    <CKEditor
                                        editor={ClassicEditor}

                                        onInit={editor => {
                                            // You can store the "editor" and use when it is needed.
                                            console.log('Editor is ready to use!', editor);
                                        }}
                                        onChange={(event, editor) => {
                                            const data = editor.getData();
                                            console.log({ event, editor, data });
                                        }}
                                        onBlur={(event, editor) => {
                                            console.log('Blur.', editor);
                                            const data = editor.getData();
                                            var c = {
                                                texto: data
                                            }
                                            lista5.push({ c })

                                            setQuestoes5(lista5)
                                        }}
                                        onFocus={(event, editor) => {
                                            console.log('Focus.', editor);
                                        }}
                                    />

                                </div>
                            </div>

                            <div className='letter-editor'>
                                <div className='letter-alternative'>
                                    d)
                                </div>
                                <br />
                                <div className='editor-alternative'>
                                    <CKEditor
                                        editor={ClassicEditor}

                                        onInit={editor => {
                                            // You can store the "editor" and use when it is needed.
                                            console.log('Editor is ready to use!', editor);
                                        }}
                                        onChange={(event, editor) => {
                                            const data = editor.getData();
                                            console.log({ event, editor, data });
                                        }}
                                        onBlur={(event, editor) => {
                                            console.log('Blur.', editor);
                                            const data = editor.getData();
                                            var d = {
                                                texto: data
                                            }
                                            lista5.push({ d })

                                            setQuestoes5(lista5)
                                        }}
                                        onFocus={(event, editor) => {
                                            console.log('Focus.', editor);
                                        }}
                                    />

                                </div>
                            </div>

                        </div>
                    </div>
                    
                </div>


                <div className="cards-questions">
                    <div className="individual-card">
                        <div>
                        <h4>GABARITO</h4>
                        <div>
                        <table className="table table-bordered table-striped">
                            <thead className="thead-dark">
                                <tr>
                                    <th colSpan="2"> Tabela de Rotas da API</th>
                                </tr>
                                <tr>
                                    <td>Questões</td>
                                    <td>Alternativa correta</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td> Questão 1</td>
                                    <td>
                                        <select value={questao1Gabarito[1]} onChange={e => setQuestao1Gabarito({1:e.target.value})}>
                                            <option value=''> --- </option>
                                            <option value="a"> a </option>
                                            <option value="b"> b </option>
                                            <option value="c"> c </option>
                                            <option value="d"> d </option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td> Questão 2</td>
                                    <td>
                                        <select value={questao2Gabarito[2]} onChange={e => setQuestao2Gabarito({2:e.target.value})}>
                                            <option value=''> --- </option>
                                            <option value="a"> a </option>
                                            <option value="b"> b </option>
                                            <option value="c"> c </option>
                                            <option value="d"> d </option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td> Questão 3</td>
                                    <td>
                                        <select value={questao3Gabarito[3]} onChange={e => setQuestao3Gabarito({3:e.target.value})}>
                                            <option value=''> --- </option>
                                            <option value="a"> a </option>
                                            <option value="b"> b </option>
                                            <option value="c"> c </option>
                                            <option value="d"> d </option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td> Questão 4</td>
                                    <td>
                                        <select value={questao4Gabarito[4]} onChange={e => setQuestao4Gabarito({4:e.target.value})}>
                                            <option value=''> --- </option>
                                            <option value="a"> a </option>
                                            <option value="b"> b </option>
                                            <option value="c"> c </option>
                                            <option value="d"> d </option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td> Questão 5</td>
                                    <td>
                                        <select value={questao5Gabarito[5]} onChange={e => setQuestao5Gabarito({5:e.target.value})}>
                                            <option value=''> --- </option>
                                            <option value="a"> a </option>
                                            <option value="b"> b </option>
                                            <option value="c"> c </option>
                                            <option value="d"> d </option>
                                        </select>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        </div>
                    </div>
                    <div className='buttons'>
                        <div>
                            {/*<button type="button" className="btn btn-outline-primary add-alternative" onClick={create_CKEditor}>+ Alternativa</button>*/}
                        </div>
                        <div>
                            <button onClick={salvarAtividade} className='btn btn-primary add' id='teste'>Adicionar</button>
                        </div>
                    </div>

                    </div>
                </div>
                <br />
            </div>
        </div>
    );
}
