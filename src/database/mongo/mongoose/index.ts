import mongoose from 'mongoose';

const port = process.env.MONGOOSE_PORT
const dbName = process.env.MONGOOSE_NAME

const mongoConnectionString =
    `mongodb://localhost:${port}/${dbName}?maxPoolSize=2-&w=majority`
const options = {
    autoIndex: false, // Don't build indexes
    maxPoolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4 // Use IPv4, skip trying IPv6
  };

export const connectToMongoose = async ()=>{
    try {
        await mongoose.connect(mongoConnectionString, options)
        console.log(`Successfully connected to mongoose database:${dbName} `)
    } catch (error) {
        console.log(error)
    }
}