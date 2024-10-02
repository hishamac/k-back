import mongoose, { Document, ObjectId, Schema } from 'mongoose';

interface IUser extends Document {
    _id: String;
    email: string;
    name: string;
    password: string;
}

const userSchema: Schema = new Schema({
    _id: { type: String, required: true, unique: true  },
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
});

const User = mongoose.model<IUser>("users", userSchema);
export default User;