
import * as Mongoose from 'mongoose';
  
let database: Mongoose.Connection;
  
export const connect = () => {
    // Add your own uri below, here my dbName is UserDB
    // and we are using the local mongodb
    const uri =
        'mongodb://localhost:27017/UserDB';
  
    if (database) {
        return;
    }
    // In order to fix all the deprecation warnings, 
    // below are needed while connecting
	Mongoose.connect(uri, {
        useNewUrlParser: true,
        useFindAndModify: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    } as Mongoose.ConnectOptions);
  
    database = Mongoose.connection;
    // When mentioned database is available and successfully connects
    database.once('open', async () => {
        console.log('Connected to database successfully');
    });
  
    // In case of any error
    database.on('error', () => {
        console.log(`Error connecting to database. Check Whether mongoDB
        installed or you can try to give open-source Mongo Atlas database`);
    });
  
};
  
// Safer way to get disconnected
export const disconnect = () => {
    if (!database) {
        return;
    }
  
    Mongoose.disconnect();
};