# **LAYOUT**

* [x] Models
  * [x] TaskModel
    * [x] .id (string)
    * [x] .name (string)
    * [x] .checked (bool)
    * [x] .listId (string)
    * [x] get Template (function)
  * [x] ListModel
    * [x] .id (string)
    * [x] .name (string)
    * [x] .color (string)
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
* [x] HTML
  * [x] header
    * [x] Title text
  * [x] main
    * [x] New list form
      * [x] Name input
      * [x] color input
      * [x] create button
    * [x] Lists list
      * [x] List header
        * [x] List name
        * [x] Done tasks count
      * [x] Tasks list
        * [x] task templates
        * [x] **(scrollable)**
      * [x] New task form
        * [x] Name input
        * [x] create button