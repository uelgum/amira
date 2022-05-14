import { Schema, model } from "mongoose";

// #region Types
type Notes = {
    id: string;
    userId: string;
    content: string;
};
// #endregion

/**
    Schema für `Notes`.
*/
const notesSchema = new Schema<Notes>({
    id: { type: String, required: true },
    userId: { type: String, required: true },
    content: {
        type: String, 
        required: function(this: Notes) {
            return (typeof this.content === "string") ? false : true;
        }
    }
});

/**
    Model für `Notes`.
*/
const Notes = model<Notes>("Notes", notesSchema);

export default Notes;