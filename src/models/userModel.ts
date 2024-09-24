import mongoose, { Document, Schema } from 'mongoose';

interface IUser extends Document {
    id: string;
    email: string;
    name: string;
    password: string;
}

const userSchema: Schema = new Schema({
    id: { type: String, required: true, unique: true  },
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
});

const User = mongoose.model<IUser>("users", userSchema);
export default User;