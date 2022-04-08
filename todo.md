# **LAYOUT**

* [x] Models
  * [x] TaskModel
    * [o] .id (string)
    * [o] .name (string)
    * [o] .checked (bool)
    * [o] .listId (string)
    * [x] get Template (function)
  * [x] ListModel
    * [o] .id (string)
    * [o] .name (string)
    * [o] .color (string)
    * [x] get Template (function)
* [x] Services
  * [x] TasksService
  * [x] ListsService
* [x] Controllers
  * [x] ListsController
    * [x] .createList (function)
    * [x] .deleteList (function)
    * [x] .createTask (function)
    * [x] .deleteTask (function)
    * [x] ._drawLists (function)
    * [x] ._drawTasks (function)
    * [o] ._loadState (function)
    * [o] ._saveState (function)
* [x] HTML
  * [x] header
    * [x] Title text
  * [x] main
    * [x] New list form
      * [x] Name input
      * [x] color input
      * [x] create button
    * [x] Lists list (id will be lists)
      * [x] List header
        * [x] List name
        * [x] Done tasks count
      * [x] Tasks list (id will be listId + "-tasks")
        * [x] task templates
        * [x] **(scrollable)**
      * [x] New task form
        * [x] Name input
        * [x] create button
    * [x] delete modals

    TODO add delete modals
    TODO add checking and unchecking function