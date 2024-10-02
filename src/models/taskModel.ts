import mongoose, { Document, ObjectId, Schema } from 'mongoose';

export interface ITask extends Document {
    title: string;
    description: string;
    status: "pending" | "completed";
    user: string;
    skill: string;
}

const taskSchema: Schema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true  },
    status: { type: String, required: true },
    user: { type: String, ref: 'User' },
    skill: { type: String, ref: 'Skill' },
});

const Task = mongoose.model<ITask>("tasks", taskSchema);
export default Task;