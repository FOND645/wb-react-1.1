import { FC, useEffect, useState } from 'react';
import './App.css';
import { storage } from './Services/Storage';
import Task from './Components/Task';
import AddTask from './Components/AddTask';

const App: FC = () => {
  const [tasksLength, setTasksLength] = useState<number>(storage.Tasks.length)

    useEffect(() => {
      const unSubscribe = storage.Subscribe((tasks) => {
        setTasksLength(tasks.length)
      });
      return () => {
          unSubscribe();
      }
    }, [tasksLength])

    return (
      <>
        <h1>Планирование задач</h1>
        {storage.Tasks.map((_, ind) => {
          return (
            <Task id={ind} key={ind}/>
          )
        })}
        <AddTask />
      </>
    );
}

export default App;