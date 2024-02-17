import mongoose from "mongoose";
import config from "./config";
import Task from "./models/Task";
import User from "./models/User";

const dropCollection = async (db: mongoose.Connection, collectionName: string) => {
    try {
        await db.dropCollection(collectionName);
    } catch (e) {
        console.log(`Collection ${collectionName} was missing, skipping drop...`)
    }
}
const run = async () => {
    await mongoose.connect(config.mongoose.db);
    const db = mongoose.connection;
    const collections = ['tasks', 'users'];
    for (const collectionName of collections) {
        await dropCollection(db, collectionName)
    }
    const [user1, user2, user3] = await User.create({
            username: 'Misha',
            password: "123",
            token: crypto.randomUUID()
        },
        {
            username: 'Anna',
            password: '0000',
            token: crypto.randomUUID()
        },
        {
            username: 'John',
            password: "456",
            token: crypto.randomUUID()
        }
    );
    const [task1, task2, task3] = await Task.create({
            title: 'Buy milk',
            description: 'Go to market near at home',
            status: 'new',
            user: user1.id
        },
        {
            title: 'Create labwork',
            description: 'Exercise 84 on Attractor',
            status: 'in_progress',
            user: user1.id
        },
        {
            title: 'Go to school',
            description: 'Today lesson by 30 minutes',
            status: 'new',
            user: user2.id
        },
        {
            title: 'Game',
            description: 'Go to walk',
            status: 'complete',
            user: user3.id
        },
        {
            title: 'Film',
            description: 'Go to cinema',
            status: 'new',
            user: user3.id
        },
    )
    await db.close();
};

void run();