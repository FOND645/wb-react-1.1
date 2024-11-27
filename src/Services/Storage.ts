import { TTask } from "../types";
const lsKey = 'tasks'

class Storage {
    Tasks: TTask[];
    private callbacks: ((tasks: TTask[]) => void)[]

    constructor() {
        this.Tasks = [];
        this.callbacks = [];
        this.readFromLS();
    }

    Subscribe(callback: (tasks: TTask[]) => void) {
        this.callbacks.push(callback);
        return () => {
            this.callbacks.filter(cb => cb !== callback)
        }
    }

    private emitEvent() {
        this.callbacks.forEach(cb => cb(this.Tasks))
    }

    AddTask(name: string, executor: string, deadline?: Date) {
        this.Tasks.push({
            createdDate: new Date(),
            deadline,
            executor,
            name
        })
        this.writeToLS();
    }

    RemoveTask(index: number) {
        this.Tasks = this.Tasks.filter((_, ind) => ind !== index);
        this.writeToLS();
    }

    EditTask(index: number, name: string, executor: string, deadline: Date) {
        this.Tasks[index] = {
            ...this.Tasks[index],
            name,
            executor,
            deadline
        }
        this.writeToLS();
    }

    private writeToLS(): void {
        const jsonData = JSON.stringify(this.Tasks);
        localStorage.setItem(lsKey, jsonData);
        this.emitEvent();
    }

    private readFromLS(): void {
        const rawData = localStorage.getItem(lsKey);
        if (!rawData) {
            this.clearTasks();
            return;
        };

        try {
            const parsedData = JSON.parse(rawData) as TTask[];
            const validatedData = parsedData.filter(task => task.name 
                && task.executor
                && task.createdDate
            );
            this.Tasks = validatedData.map(task => {
                return {
                    ...task,
                    createdDate : new Date(task.createdDate),
                    deadline: task.deadline ? new Date(task.deadline) : undefined,
                }
            });
            if (validatedData.length !== parsedData.length) {
                localStorage.setItem(lsKey, JSON.stringify(validatedData));
                alert('Данные повреждены. Часть задач утерена.');
            };
        } catch (error) {
            this.clearTasks();
            alert('Данные повреждены. Задачи очищенны');
        }
    }

    private clearTasks() {
        this.Tasks = [];
        localStorage.removeItem(lsKey);
    }
}

export const storage = new Storage();