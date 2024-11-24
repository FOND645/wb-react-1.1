import { TTask } from "../types"

const Task = (prop: TTask) => {
    const {name, executor, deadline, place} = prop;
    return (
        <div className="task">
            <h3 className="task-name">{name}</h3>
        </div>
    )
}