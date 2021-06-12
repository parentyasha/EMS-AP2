import React, { useState, useEffect } from 'react';
import Column from './Column';
import { DragDropContext } from 'react-beautiful-dnd';
import styled from 'styled-components';
import './PrepararBatalha.css';
import api from '../../service/api'
import queryString from 'query-string';


import akali from '../../assets/icons/akali.png';
import akame from '../../assets/icons/akame.png';
import alerquina from '../../assets/icons/alequina.png';
import allMight from '../../assets/icons/allMight.png';
import capitaoAmerica from '../../assets/icons/capitaoAmerica.png';
import darthVader from '../../assets/icons/darthVader.png';
import erza from '../../assets/icons/erza.png';
import finn from '../../assets/icons/finn.png';
import gon from '../../assets/icons/gon.png';
import gumball from '../../assets/icons/gumball.png';
import hela from '../../assets/icons/hela.png';
import hisoka from '../../assets/icons/hisoka.png';
import joker from '../../assets/icons/joker.png';
import jujuba from '../../assets/icons/jujuba.png';
import katarina from '../../assets/icons/katarina.png';
import killua from '../../assets/icons/killua.png';
import luffy from '../../assets/icons/luffy.png';
import midorya from '../../assets/icons/midorya.png';
import mordekai from '../../assets/icons/mordekai.png';
import mulherGaviao from '../../assets/icons/mulherGaviao.png';
import raven from '../../assets/icons/raven.png';
import saitama from '../../assets/icons/saitama.png';
import shinobu from '../../assets/icons/shinobu.png';
import syndra from '../../assets/icons/syndra.png';
import tajiro from '../../assets/icons/tajiro.png';
import thanos from '../../assets/icons/thanos.png';
import thor from '../../assets/icons/thor.png';
import wonderWoman from '../../assets/icons/wonderWoman.png';
import zanitsu from '../../assets/icons/zanitsu.png';
import kirito from '../../assets/icons/jv.png';
import ed from '../../assets/icons/manel.png';
import gohan from '../../assets/icons/andre.png';
import patolinoMago from '../../assets/icons/patolinoMago.png';



const Container = styled.div`
    display: flex;
    justify-content: center;
`
var lista = [];

const initialData = {
    tasks: {
        'task-1': { id: 'task-1', content: null, _id: null},
        'task-2': { id: 'task-2', content: null, _id: null},
        'task-3': { id: 'task-3', content: null, _id: null}
    },
    columns: {
        'column-1': {
            id: 'column-1',
            title: 'Personagens',
            taskIds: ['task-1', 'task-2', 'task-3']
        },
        'column-2':{
            id: 'column-2',
            title: 'Batalha',
            taskIds: []
        }
    },
    columnOrder: ['column-1', 'column-2']
}




export default function PrepararBatalha({ location, match }) {
    
    const [ state, setState ] = useState(initialData);
    const [ grupo, setGrupo ] = useState(Object);
    const [ integrantes, setIntegrantes ] = useState([]);
    const [ icons, setIcons ] = useState([]);
    const listaP = [];
    var listaIcon = [];
    var tasks = {};
    const taskIds = []
    

    const onDragEnd = result => {
        const { destination, source, draggableId } = result;

        if (!destination) {
            return;
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        const start = state.columns[source.droppableId];
        const finish = state.columns[destination.droppableId];

        if(start === finish) {
            const newTaskIds = Array.from(start.taskIds)
            newTaskIds.splice(source.index, 1);
            newTaskIds.splice(destination.index, 0, draggableId);
    
            const newColumn = {
                ...start,
                taskIds: newTaskIds,
            };
    
            const newState = {
                ...state,
                columns: {
                    ...state.columns,
                    [newColumn.id]: newColumn,
                },
            };
    
            inicarBatalha(newColumn.taskIds, newColumn.id)
            setState(newState)
            return;
        
        };

        const startTaskIds = Array.from(start.taskIds);
        startTaskIds.splice(source.index, 1);

        const newStart = {
            ...start,
            taskIds: startTaskIds,
        }

        const finishTaskIds = Array.from(finish.taskIds);
        finishTaskIds.splice(destination.index, 0, draggableId);

        const newFinish = {
            ...finish,
            taskIds: finishTaskIds,
        };

        const newState = {
            ...state,
            columns: {
                ...state.columns,
                [newStart.id]: newStart,
                [newFinish.id]: newFinish
            },
        }

        inicarBatalha(finishTaskIds, newFinish.id)
        setState(newState)

    }



    useEffect(() => {
        async function buscarTeam(){
            const response = await api.get('/buscar/grupo', {headers: {
                id: match.params.idGrupo
            }})

            for (let u in response.data.integrantes) {
                buscarIntegrantes(response.data.integrantes[u])
            }
            //console.log(response.data)
            setGrupo(response.data)
        }
        
        async function buscarIntegrantes(id){
            const response = await api.get('/buscar/userId', {headers: {
                id:id
            }})

            await buscarIcon(response.data.icon)

            listaP.push(response.data)
            setIntegrantes(listaP)

        }

        async function buscarIcon(id) {
            const response = await api.get('/buscar/icon', {headers: {
                id: id
            }})

            await listaIcon.push(response.data);

            tasks[response.data.nomePersonagem] = {
                id:response.data.nomePersonagem,
                content: response.data.url
            }

            taskIds.push(response.data.nomePersonagem)

            console.log(tasks)
            console.log(state)
            

            
            setIcons(listaIcon);
            ajustarTask();
            
        }

        function ajustarTask() {
            const newState = {
                ...state,
                tasks,
                columns: {
                    ...state.columns,
                    'column-1':{
                        ...state.columns['column-1'],
                        taskIds: taskIds
                    }
                }
            }
            console.log(newState)
            setState(newState);
        }
        
        buscarTeam();

    }, [])

    function inicarBatalha(listaIcons, id){
        if (id == 'column-2'){
            lista = listaIcons;
        }
    }

    async function confirmaBatalha() {
        const equipe2 = { 
            idEquipe: match.params.idGrupo,
            posicoes: lista,
            verificado: []
        }


        const response = await api.post('/preparar/batalha/heroku', {
            equipe2: equipe2,
            idBatalha: match.params.idBatalha
        })
    }

    function buscarQuery(){
        const values = queryString.parse(location.search)
        return values.idUser
    }

    async function validarBatalha() {

        const response = await api.post('/validar/batalha/heroku', {
            idUser: buscarQuery(),
            idBatalha: match.params.idBatalha
        })

        console.log(response.data)
    }
    

    return (
        <div className='team'>
            <nav>
                <div className='navbar'>
                    <div className='sitename'>
                        <a href='/main'>
                            BATTLECLASS
                        </a>
                    </div>
                    <div className='student-data'>
                        <div className='team-name-principal'>
                            {grupo.nome}
                        </div>
                        <div className='trace'>
                            -
                        </div>
                        <div className='team-points-principal'>
                            {grupo.pontuacao} PONTOS
                    </div>
                    </div>
                </div>

                <hr id='hr' />
            </nav>

            <div className='main-container'>
                <DragDropContext onDragEnd={onDragEnd}>
                    <Container>
                        {state.columnOrder.map(id => {
                            const column = state.columns[id];
                            const tasks = column.taskIds.map(taskId => state.tasks[taskId])

                            return <Column key={column.id} column={column} tasks={tasks}/>
                        })}
                    </Container>
                    
                </DragDropContext>
                <button onClick={confirmaBatalha}> BATALHAR! </button>
                <button onClick={validarBatalha}> VALIDAR! </button>
            </div>
            
        </div>
        
    )
    
};
       


