import { Schema, model } from "mongoose";

// #region Types
type Task = {
    id: string;
    content: string;
    important: boolean;
    done: boolean;
    createdAt: number;
};

type TodoList = {
    id: string;
    userId: string;
    tasks: Task[]; 
};
// #endregion

/**
    Schema für `TodoList`.
*/
const todoListSchema = new Schema<TodoList>({
    id: { type: String, required: true },
    userId: { type: String, required: true },
    tasks: [
        {
            id: { type: String, required: true },
            content: { type: String, required: true },
            important: { type: Boolean, required: true },
            done: { type: Boolean, required: true },
            createdAt: { type: Number, required: true }
        }
    ]
});

/**
    `TodoList`-Modell.
*/
const TodoList = model("TodoList", todoListSchema);

export default TodoList;