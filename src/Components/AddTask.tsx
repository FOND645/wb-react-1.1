import { FC, useRef } from "react";
import { storage } from "../Services/Storage";

const AddTask: FC = () => {
    const nameInput = useRef<HTMLInputElement>(null);
    const executerInput = useRef<HTMLInputElement>(null);
    const deadlineInput = useRef<HTMLInputElement>(null);

    const AddTaskHandler = () => {
        const name = nameInput.current?.value;
        const executer = executerInput.current?.value;
        const deadLine = deadlineInput.current?.value;


        if (!name || !executer) return;

        if (deadLine) {
            storage.AddTask(name, executer, new Date(deadLine))
        } else {
            storage.AddTask(name, executer)
        }
    };
    
    return (
        <div className="add-task">
            <input type="text" ref={nameInput} placeholder="Задача" className="add-task-name"/>
            <input type="text" ref={executerInput} placeholder="Исполнитель" className="add-task-executor"/>
            <input type="date" ref={deadlineInput} placeholder="Крайний срок" className="add-task-deadline"/>
            <button onClick={AddTaskHandler}>Добавить задачу</button>
        </div>
    )
}

export default AddTask