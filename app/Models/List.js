import { ProxyState } from "../AppState.js";
import { generateId } from "../Utils/generateId.js";

export class List
{
    constructor( { id, name, color })
    {
        if(!name)
        {
            throw new Error("New list made without a name");
        }

        this.id = id || generateId();
        this.name = name;
        this.color = color || "#000000";
    }

    get Template()
    {
        const tasks = ProxyState.tasks.filter(task => task.listId === this.id).length;
        const tasksDone = ProxyState.tasks.filter(task => task.listId === this.id && task.checked).length;

        return `
            <div class="px-5 rounded">
                <div class="rounded d-flex flex-column" style="position: relative">
                    <i class="mdi mdi-delete-forever text-danger on-hover action mdi-24px" style="position: absolute; right: 5px; top: 0px" title="Delete List" onclick="app.listsController.deleteList('${this.id}')"></i>
                    <div class="rounded-top d-flex align-items-center justify-content-center flex-column" style="background-color: ${this.color}; height: 20%;">
                        <h2>${this.name}</h2>
                        <h6>${tasksDone}/${tasks} tasks done</h6>
                    </div>
                    <div id="${this.id}-tasks" class="mt-1 ps-2 flex-grow-1"></div>
                    <div>
                        <form onsubmit="app.listsController.createTask('${this.id}')">
                            <label class="visually-hidden" for="name">New Task Name</label>
                            <div class="input-group mb-3 px-2">
                                <input type="text" class="form-control" name="name" id="name" placeholder="New Task"  minlength="3" maxlength="50" required>
                                <button type="submit" class="input-group-text">Add Task</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            `;

    }
}