import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import '../General/Hero.css';


const Container = styled.div`
    border: 1px solid lightgray;
    border-radius: 50px;
    padding: 8px;
    margin-right: 8px;
    background-color: white;
    width: 100px;
    height: 100px;

    display: flex;
    justify-content: center;
    align-items: center;

`;

const Imagem = styled.div`
    justify-content: center;
    align-items: center;
    
    #img {
        width: 100px;
        height: 100px;
    }

`

export default class Task extends React.Component {
    render() {
        return(
            <Draggable draggableId={this.props.task.id} index={this.props.index}>
                {provided => (
                    <Container
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                    > 
                        
                        <Imagem>
                            <img src={this.props.task.content} id="img" />
                        </Imagem>
                        
                        
                        {/*
                            {this.props.task.content[0]} 
                        */} 
                    </Container>
                )}
            </Draggable>
        );
    }
}
