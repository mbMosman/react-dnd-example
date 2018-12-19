import React, { Component } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';


const grid = 8;

class List extends Component {

  getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? 'lightgreen' : 'grey',

    // styles we need to apply on draggables
    ...draggableStyle
  });

  getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    padding: grid
  });

  render() {
    let {name, data} = this.props;
    //let name = this.props.name;
    //let data = this.props.data;
    return (
      <Droppable droppableId={name} >
        {(provided, snapshot) => (
          <div className='col' ref={provided.innerRef} style={this.getListStyle(snapshot.isDraggingOver)}>
            {data.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided, snapshot) => (
                  <div ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={this.getItemStyle( snapshot.isDragging, provided.draggableProps.style)}>
                    {item.content}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    );
  }
}

export default List;
