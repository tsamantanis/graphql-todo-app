const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
require('dotenv').config();

const schema = buildSchema(`
    type Todo {
        name: String!
        completed: Boolean!
        date: String!
        id: Int!
    }

    type Query {
        getAllTodos: [Todo!]
        getTodo(id: Int): Todo
        getCompletedTodos(completed: Boolean): [Todo!]
    }

    type Mutation {
        addTodo(name: String, date: String, id: Int): Todo!
        completeTodo(id: Int): Todo
    }
`);

const todos = [];

const root = {
    // Queries
    getAllTodos: () => todos,
    getTodo: ({ id }) => (todos.filter((todo) => todo.id === id).length > 0
        ? todos.filter((todo) => todo.id === id)[0] : null),
    getCompletedTodos: ({ completed }) => todos.filter((todo) => todo.completed === completed),
    // Mutations
    addTodo: ({ name, date, id }) => {
        const newTodo = {
            name,
            date,
            id,
            completed: false,
        };
        todos.push(newTodo);
        return newTodo;
    },
    completeTodo: ({ id }) => {
        const filtered = todos.filter((todo) => todo.id === id);
        if (filtered) {
            filtered[0].completed = true;
        }
        return filtered[0];
    },
};

const app = express();

app.use('/graphql', graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true,
}));

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Running on port: ${port}`);
});
