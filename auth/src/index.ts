import mongoose from 'mongoose';
import { app } from './app';

const startMongoDb = async () => {
  try {
    await mongoose.connect('mongodb://auth-mongo-service:27017/auth', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
    console.log('Connected to MongoDb');

  } catch (error) {
    console.error(error);
  }
};

app.listen(3000, () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined in env');
  }

  console.log('Listening on port 3000');
  startMongoDb();
});
