import { ProxyState } from "../AppState.js";
import { Task } from "../Models/Task.js";

class TasksService
{
    createTask(newTaskData)
    {
        const newTask = new Task(newTaskData);
        ProxyState.tasks = [...ProxyState.tasks, newTask];
    }

    deleteTaskById(taskId)
    {
        ProxyState.tasks = ProxyState.tasks.filter(task => task.id != taskId);
    }

    deleteTaskByListId(listId)
    {
        ProxyState.tasks = ProxyState.tasks.filter(task => task.listId != listId);
    }

    toggleTask(taskId)
    {
        const foundTask = ProxyState.tasks.find(task => task.id === taskId);
        if(foundTask)
        {
            foundTask.checked = !foundTask.checked;
            ProxyState.tasks = ProxyState.tasks;
        }
    }
}

export const tasksService = new TasksService();