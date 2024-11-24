import { TTask } from "../types";
const lsKey = 'tasks'

class LocalStorage {
    tasks: TTask[];
    constructor() {
        this.tasks = [];
        this.readFromLS();
    }

    private writeToLS(): void {
        const jsonData = JSON.stringify(this.tasks);
        localStorage.setItem(lsKey, jsonData);
    }

    private readFromLS(): void {
        const rawData = localStorage.getItem(lsKey);
        if (!rawData) {
            this.clearTasks();
            return;
        };

        try {
            const parsedData = JSON.parse(rawData) as TTask[];
            const validatedData = parsedData.filter(task => task.name && task.executor && task.deadline);
            this.tasks = validatedData;
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
        this.tasks = [];
        localStorage.removeItem(lsKey);
    }
}

export default new LocalStorage();