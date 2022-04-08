import { List } from "./Models/List.js";
import { Task } from "./Models/Task.js";
import { EventEmitter } from "./Utils/EventEmitter.js"
import { isValidProp } from "./Utils/isValidProp.js"

// BEGIN TEST DATA
const tempList1 = new List({name:"temp task 1", color:"#FF0000", id:"1"})
const tempList2 = new List({name:"temp task 2", color:"#00FF00", id:"2"})
const tempList3 = new List({name:"temp task 3", color:"#0000FF", id:"3"})
const tempList4 = new List({name:"temp task 4", color:"#909090", id:"4"})
// END TEST DATA

class AppState extends EventEmitter
{
    lists = [tempList1, tempList2, tempList3, tempList4];
    tasks = [];
    // lists = [];
    // tasks = [];
}

export const ProxyState = new Proxy(new AppState(), {
  get(target, prop) {
    isValidProp(target, prop)
    return target[prop]
  },
  set(target, prop, value) {
    isValidProp(target, prop)
    target[prop] = value
    target.emit(prop, value)
    return true
  }
})
