import { ProxyState } from "../AppState.js";
import { generateId } from "../Utils/generateId.js";

export class Task
{
    constructor( { id, name, checked, listId } )
    {
        if(!name)
        {
            throw new Error("New task made without a name");
        }
        if(!listId)
        {
            throw new Error("New task made without a parent listId");
        }

        this.id = id || generateId();
        this.name = name;
        this.checked = checked || false;
        this.listId = listId; 
    }

    get Template()
    {
        const iconClass = this.checked ? "mdi mdi-24px mdi-checkbox-marked-circle-outline" : "mdi mdi-24px mdi-circle-outline";
        const textStyle = this.checked ? "text-decoration: line-through; " : ""
        
        const parentList = ProxyState.lists.find(list => list.id === this.listId);
        
        if(!parentList)
        {
            throw new Error("Task is missing a parent List.")
        }

        const iconStyle = `color: ${parentList.color};`;

        return `
            <div class="d-flex align-items-center">
                <div onclick="app.listsController.toggleTask('${this.id}')" class="d-flex align-items-center flex-grow-1 selectable no-select">
                    <i class="${iconClass} me-2" style="${iconStyle}"></i>
                    <span style="${textStyle}">${this.name}</span>
                </div>
                <i class="mdi mdi-24px action mdi-delete-forever on-hover text-danger ms-2" onclick="app.listsController.deleteTask('${this.id}')"></i>
            </div>
        `;
    }
}