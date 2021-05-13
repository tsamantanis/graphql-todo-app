# TODO app server with GraphQL

## Installation
In the root project directory, use:
```
npm install
```
to install project dependencies

## Initialization

```
npm run start
```

Runs the app in the development mode.\
Open [http://localhost:5000/graphql](http://localhost:5000/graphql) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## Usage


- List all todos
```
{
    getAllTodos {
        name
        date
        completed
        id
    }
}
```
- Add a new todo: name: "Complete the final assessment"
```
mutation addFirstTodo {
    addTodo(name: "Complete the final assessment", date: "2021-05-13", id: 1) {
      name
      date
      completed
      id
    }
}
```
- Show the: "Completed final assessment" todo
```
{
    getTodo(id: 1) {
        name
        date
        completed
        id
    }
}
```
- Complete the: "Complete final assessment" todo
```
mutation completeFirstTodo {
    completeTodo(id: 1) {
      name
      date
      completed
      id
    }
}
```
- Show all completed todos
```
{
    getCompletedTodos(completed: true) {
        name
        date
        completed
        id
    }
}
```
- Show all not completed todos
```
{
    getCompletedTodos(completed: false) {
        name
        date
        completed
        id
    }
}
```
