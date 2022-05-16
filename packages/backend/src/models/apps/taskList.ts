import { Schema, model } from "mongoose";

// #region Types
export type Task = {
    id: string;
    content: string;
    done: boolean;
    createdAt: number;
};

type TaskList = {
    id: string;
    userId: string;
    tasks: Task[];
};
// #endregion

/**
    Schema für `TaskList`.
*/
const taskListSchema = new Schema<TaskList>({
    id: { type: String, required: true },
    userId: { type: String, required: true },
    tasks: [
        {
            id: { type: String, required: true },
            content: { type: String, required: true },
            done: { type: Boolean, required: true },
            createdAt: { type: Number, required: true }
        }
    ]
});

/**
    Model für `TaskList`.
*/
const TaskList = model<TaskList>("TaskList", taskListSchema);

export default TaskList;