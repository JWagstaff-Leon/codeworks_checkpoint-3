# **LAYOUT**

* [o] Models
  * [o] TaskModel
    * [o] .id (string)
    * [o] .name (string)
    * [o] .checked (bool)
    * [o] .listId (string)
    * [x] get Template (function)
  * [o] ListModel
    * [o] .id (string)
    * [o] .name (string)
    * [o] .color (string)
    * [o] get Template (function)
* [o] Services
  * [o] TasksService
  * [o] ListsService
* [o] Controllers
  * [o] ListsController
    * [o] .createList (function)
    * [o] .deleteList (function)
    * [o] .createTask (function)
    * [o] .deleteTask (function)
    * [o] ._drawLists (function)
    * [o] ._drawTasks (function)
    * [o] ._loadState (function)
    * [o] ._saveState (function)
    * [o] toggleTask (function)
* [x] HTML
  * [o] header
    * [o] Title text
  * [x] main
    * [o] New list form
      * [o] Name input
      * [o] color input
      * [o] create button
    * [o] Lists list (id will be lists)
      * [o] List header
        * [o] List name
        * [o] Done tasks count
      * [o] Tasks list (id will be listId + "-tasks")
        * [o] task templates
        * [o] **(scrollable)**
      * [o] New task form
        * [o] Name input
        * [o] create button
    * [x] delete modals

    TODO add delete modals