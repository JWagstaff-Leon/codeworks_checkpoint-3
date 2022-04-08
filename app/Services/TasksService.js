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
        console.log("deleting task with id of", taskId)
        ProxyState.tasks = ProxyState.tasks.filter(task => task.id != taskId);
    }

    deleteTaskByListId(listId)
    {
        ProxyState.tasks = ProxyState.tasks.filter(task => task.listId != listId);
    }
}

export const tasksService = new TasksService();