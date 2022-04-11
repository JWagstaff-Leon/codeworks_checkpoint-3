import { ProxyState } from "../AppState.js";
import { generateId } from "../Utils/generateId.js";
import { rgbToHsl } from "../Utils/rgbToHsl.js";

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
        let tasksBackgroundColor = "#FFFFFF"
        console.log(this.name, ",", rgbToHsl(this.color).lightness)
        if(rgbToHsl(this.color).lightness >= 192)
        {
            tasksBackgroundColor = "#606060";
        }
        else if(rgbToHsl(this.color).lightness >= 128)
        {
            tasksBackgroundColor = "#707070";
        }
        else if(rgbToHsl(this.color).lightness >= 64)
        {
            tasksBackgroundColor = "#B0B0B0";
        }
        else
        {
            tasksBackgroundColor = "#C0C0C0";
        }

        const titleColor = rgbToHsl(this.color).lightness >= 128 ? "text-dark" : "text-light";
        const taskColor = rgbToHsl(this.color).lightness >= 128 ? "text-light" : "text-dark";

        // const taskCountText = `${tasksDone === tasks ? "All" : tasksDone + "/" + tasks} tasks done`;
        const taskCountText = `${tasksDone === tasks ? "All tasks done" : tasks - tasksDone  + " task" + (tasks - tasksDone === 1 ? "" : "s") + " / " + tasks + " left"}`;
        

        return `
            <div class="px-5 rounded">
                <div class="rounded d-flex flex-column ${titleColor}" style="position: relative">
                    <i class="mdi mdi-delete-forever text-danger on-hover action mdi-24px" style="position: absolute; right: 5px; top: 0px" title="Delete List" onclick="app.listsController.deleteList('${this.id}')"></i>
                    <div class="rounded-top d-flex align-items-center justify-content-center flex-column" style="background-color: ${this.color}; height: 20%;">
                        <h2>${this.name}</h2>
                        <h6>${taskCountText}</h6>
                    </div>
                    <div id="${this.id}-tasks" style="background-color: ${tasksBackgroundColor};" class="py-1 ps-2 flex-grow-1 ${taskColor}"></div>
                    <div>
                        <form onsubmit="app.listsController.createTask('${this.id}')">
                            <label class="visually-hidden" for="name">New Task Name</label>
                            <div class="input-group pb-3 px-2" style="background-color: ${tasksBackgroundColor};">
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