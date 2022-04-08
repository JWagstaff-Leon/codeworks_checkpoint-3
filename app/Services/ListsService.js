import { ProxyState } from "../AppState.js";
import { List } from "../Models/List.js";

class ListsService
{
    createList(newListData)
    {
        const newList = new List(newListData);
        ProxyState.lists = [...ProxyState.lists, newList];
    }

    deleteListById(id)
    {
        ProxyState.lists = ProxyState.lists.filter(list => list.id != id);
    }
}

export const listsService = new ListsService();