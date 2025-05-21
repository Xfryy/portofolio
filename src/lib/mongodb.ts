import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

type MongooseConnection = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

type GlobalWithMongoose = typeof globalThis & {
  mongoose?: MongooseConnection;
};

const globalWithMongoose = global as GlobalWithMongoose;

if (!globalWithMongoose.mongoose) {
  globalWithMongoose.mongoose = {
    conn: null,
    promise: null,
  };
}

async function dbConnect(): Promise<typeof mongoose> {
  if (globalWithMongoose.mongoose?.conn) {
    return globalWithMongoose.mongoose.conn;
  }

  if (!globalWithMongoose.mongoose?.promise) {
    const opts: mongoose.ConnectOptions = {
      bufferCommands: true,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
    };

    globalWithMongoose.mongoose!.promise = mongoose.connect(MONGODB_URI, opts);
  }

  try {
    const mongoose = await globalWithMongoose.mongoose!.promise;
    globalWithMongoose.mongoose!.conn = mongoose;
  } catch (e) {
    globalWithMongoose.mongoose!.promise = null;
    throw e;
  }

  return globalWithMongoose.mongoose!.conn;
}

export default dbConnect;
