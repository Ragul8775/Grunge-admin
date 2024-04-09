import mongoose from "mongoose";

export async function mongooseConnect() {
    try {
        if (mongoose.connection.readyState === 1) {
            return mongoose.connection.asPromise();
        } else {
            const uri = process.env.MONGODB_URI;
            if (!uri) {
                throw new Error("MongoDB URI is not provided in the environment variables.");
            }
            return await mongoose.connect(uri, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
               
            });
        }
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
        throw error; // Rethrow the error to be caught by the caller
    }
}