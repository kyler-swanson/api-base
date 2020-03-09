import mongoose, { Mongoose } from 'mongoose';

mongoose.Promise = global.Promise;

const createConnection = async (): Promise<Mongoose> => 
  mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

export default createConnection;