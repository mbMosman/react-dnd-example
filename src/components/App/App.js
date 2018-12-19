import React, { Component } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import List from '../List/List';
import Header from '../Header/Header';

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  console.log('list', list);
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

//Moves an item from one list to another list.
const move = (source, destination, droppableSource, droppableDestination) => {
  console.log('source', source, 'droppableSource', droppableSource);
  console.log('destination', destination, 'droppableDestination', droppableDestination);
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;
  console.log('result', result);
    return result;
};



class App extends Component {
  state = {
    unseated: [
      { id: 1, content: 'Kyo' },
      { id: 2, content: 'Tohru' },
      { id: 3, content: 'Yuki' },
      { id: 4, content: 'Kagura' },
      { id: 5, content: 'Kisa' },
      { id: 8, content: 'Rin' },
      { id: 6, content: 'Shigure' },
      { id: 7, content: 'Haru' }
    ],
    pod1: [ ],
    pod2: [ ]
  };

  getList = id => this.state[id];

  onDragEnd = result => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
        return;
    }
      
    if (source.droppableId === destination.droppableId) {
      // put back into the same list, reorder
      const items = reorder(
          this.getList(source.droppableId),
          source.index,
          destination.index
      );
      this.setState( { [source.droppableId]: items } );
    } else {
      // different list, move
      const result = move(
          this.getList(source.droppableId),
          this.getList(destination.droppableId),
          source,
          destination
      );
      this.setState({
        ...this.state,
        [source.droppableId]: result[source.droppableId],
        [destination.droppableId]: result[destination.droppableId]
      });
    }
  };

  render() {
    return (
      <div>
        <Header />
        <DragDropContext onDragEnd={this.onDragEnd}>
        <main className='grid'>
            <List name="unseated" data={this.state.unseated} />
            <List name="pod1" data={this.state.pod1} />
            <List name="pod2" data={this.state.pod2} />
        </main>
        </DragDropContext>
      </div>
    );
  }
}

export default App;