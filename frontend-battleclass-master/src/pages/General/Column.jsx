import React from 'react';
import styled from 'styled-components';
import Task from './Task';
import { Droppable } from 'react-beautiful-dnd';


const Container = styled.div`
    margin: 8px;
    border: 1px solid lightgray;
    border-radius: 2px;
    width:440px;

    display:flex;
    flex-direction: column
`;
const Title = styled.h3`
    padding: 8px;
`;
const TaskList = styled.div`
    padding: 8px;
    flex-grow:1;
    min-height:100px

    display: flex
`;

export default class Column extends React.Component {
    render() {
        return (
            <Container>
                <Title>{ this.props.column.title }</Title>
                <Droppable droppableId={this.props.column.id} direction="horizontal">
                    {provided => (
                        <TaskList 
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        
                        > 
                            { this.props.tasks.map((task, index) => (<Task key={task.id} task={task} index={index} />)) }
                            { provided.placeholder }
                        </TaskList>
                    )}
                    
                </Droppable>
                
            </Container>
        )
        
    }
}