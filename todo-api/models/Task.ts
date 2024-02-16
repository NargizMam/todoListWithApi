import mongoose, { Schema, Types } from 'mongoose';
import User from './User';

const TaskSchema = new Schema({
    user: {
        type: String,
        required: true,
        ref: 'User',
        validate: {
            validator: async (value: Types.ObjectId) => {
                const user = await User.findById(value);
                return Boolean(user);
            },
            message: 'Пользователь не найден!',
        },
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    status: {
        type: String,
        enum: ["new" || "in_progress" || "complete"],
        default: "new"
    }

}, {timestamps: true});

const Task = mongoose.model('Task', TaskSchema);

export default Task;
