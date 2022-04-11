import { ProxyState } from "../AppState.js";
import { List } from "../Models/List.js";
import { Task } from "../Models/Task.js";
import { listsService } from "../Services/ListsService.js";
import { tasksService } from "../Services/TasksService.js";
import { Pop } from "../Utils/Pop.js";

function _loadState()
{
    const loadedListsData = window.localStorage.getItem("taskmaster-lists");
    const loadedTasksData = window.localStorage.getItem("taskmaster-tasks");

    if(loadedListsData && loadedTasksData)
    {
        ProxyState.lists = JSON.parse(loadedListsData).map(listData => new List(listData));
        ProxyState.tasks = JSON.parse(loadedTasksData).map(taskData => new Task(taskData));
    }
}

function _saveState()
{
    window.localStorage.setItem("taskmaster-lists", JSON.stringify(ProxyState.lists));
    window.localStorage.setItem("taskmaster-tasks", JSON.stringify(ProxyState.tasks));
}

function _drawLists()
{
    let listsTemplate = "";

    ProxyState.lists.forEach(list => listsTemplate += list.Template);

    document.getElementById("lists").innerHTML = listsTemplate;
}

function _drawTasks()
{
    let tasksTemplate = {};

    ProxyState.tasks.forEach(task =>
        {
            if(!tasksTemplate.hasOwnProperty(task.listId))
            {
                tasksTemplate[task.listId] = "";
            }
            tasksTemplate[task.listId] += task.Template;
        });

    
    ProxyState.lists.forEach(list => document.getElementById(`${list.id}-tasks`).innerHTML = "");
    for(let key in tasksTemplate)
    {
        document.getElementById(`${key}-tasks`).innerHTML = tasksTemplate[key];
    }
}

export class ListsController
{
    constructor()
    {
        ProxyState.on("lists", _drawLists);
        ProxyState.on("lists", _drawTasks);
        ProxyState.on("tasks", _drawLists);
        ProxyState.on("tasks", _drawTasks);
        ProxyState.on("lists", _saveState);
        ProxyState.on("tasks", _saveState);

        _loadState();

        _drawLists();
        _drawTasks();
    }

    createList()
    {
        window.event.preventDefault();
        try
        {
            const form = window.event.target;

            const newListData = 
            {
                name: form.name.value,
                color: form.color.value,
            };

            listsService.createList(newListData);
            form.reset();
        }
        catch(error)
        {
            console.error("[CREATE LIST ERROR]", error.message);
        }
    }
    
    async deleteList(listId)
    {
        try
        {
            const deleteTask = await Swal.fire({
                title: "Delete List?",
                text: "This cannot be undone.",
                icon: "warning",
                showCancelButton: true,
                cancelButtonColor: '#cbcbcb',
                confirmButtonColor: '#d33',
                confirmButtonText: "Delete"
              })
            if(deleteTask.isConfirmed)
            {
                tasksService.deleteTaskByListId(listId);
                listsService.deleteListById(listId);
            }
        }
        catch(error)
        {
            console.error("[DELETE LIST ERROR]", error.message);
        }
    }
    
    createTask(listId)
    {
        window.event.preventDefault();
        try
        {
            const form = window.event.target;

            const newTaskData = 
            {
                name: form.name.value,
                listId
            };

            tasksService.createTask(newTaskData);
            form.reset();
        }
        catch(error)
        {
            console.error("[CREATE TASK ERROR]", error.message);
        }
    }
    
    async deleteTask(taskId)
    {
        try
        {
            const deleteTask = await Swal.fire({
                title: "Delete Task?",
                text: "This cannot be undone.",
                icon: "warning",
                showCancelButton: true,
                cancelButtonColor: '#cbcbcb',
                confirmButtonColor: '#d33',
                confirmButtonText: "Delete"
              })
            if(deleteTask.isConfirmed)
            {
                tasksService.deleteTaskById(taskId);
            }
        }
        catch(error)
        {
            console.error("[DELETE TASK ERROR]", error.message);
        }
    }

    toggleTask(taskId)
    {
        try
        {
            tasksService.toggleTask(taskId);
        }
        catch(error)
        {
            console.error("[TOGGLE TASK ERROR]", error.message);
        }
    }
}