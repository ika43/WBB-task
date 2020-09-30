import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

const dbOptions:  mongoose.ConnectionOptions = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true
};

export default (dsn: string): Promise<typeof mongoose> => mongoose.connect(dsn, dbOptions);