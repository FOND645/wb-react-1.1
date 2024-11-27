import { FC, useEffect, useState } from "react";
import { TTask } from "../types";
import { storage } from "../Services/Storage";

type prop = {
    id: number;
}

const Task: FC<prop> = (prop) => {
    const [task, setTask] = useState<TTask>(storage.Tasks[prop.id]);

    useEffect(() => {
        const unsubscribe = storage.Subscribe((tasks) => {
            setTask(tasks[prop.id])
        });
        return () => {
            unsubscribe();
        }
    }, [prop.id, task.name, task.executor, task.name, task.place, task.deadline]);

    const { createdDate, deadline, executor, name, place } = task;

    const deleteTask = () => {
        storage.RemoveTask(prop.id);
    }

    return (
        <div className="task">
            <h3 className="task-name">{name}</h3>
            <p className="task-executor">{executor}</p>
            {deadline ? <p className="task-deadline">{`Исполнить до ${deadline.getDate()}.${deadline.getMonth()}.${deadline.getFullYear()}`}</p> : null}
            {place ? <p className="task-place">{place}</p> : null}
            <p className="task-deadline">{`от ${createdDate.getDate()}.${createdDate.getMonth()}.${createdDate.getFullYear()}`}</p>
            <button onClick={deleteTask}>Удалить задачу</button>
        </div>
    )
}

export default Task