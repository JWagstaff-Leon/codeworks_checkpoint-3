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
        const iconClass = this.checked ? "mdi mdi-checkbox-marked" : "mdi mdi-checkbox-blank-outline";
        const textStyle = this.checked ? "text-decoration: strikethrough; " : ""
        
        const parentList = ProxyState.lists.find(list => list.id === this.listId);
        
        if(parentList)
        {
            const iconStyle = `color: ${parentList.color};`;
        }

        return `
            <div class="d-flex align-items-center">
                <i class="${iconClass} me-2" style="iconStyle" onclick="app.listsController.toggleTask('${this.id}')"></i>
                <span class="me-auto">${this.name}</span>
                <i class="mdi mdi-18px action mdi-delete-forever on-hover text-danger ms-2" onclick="app.listsController.deleteTask('${this.id}')"></i>
            </div>
        `;
    }
}