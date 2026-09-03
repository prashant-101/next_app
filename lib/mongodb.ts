import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define MONGODB_URI in .env.local");
}

const globalForMongoose = globalThis as unknown as {
  mongoose: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
};

const cached = globalForMongoose.mongoose || {
  conn: null,
  promise: null,
};

export async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  // Define local variable or use non-null assertion operator (!)
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    // MONGODB_URI! tells TypeScript that this string is guaranteed to be defined
    cached.promise = mongoose.connect(MONGODB_URI!, opts);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

if (process.env.NODE_ENV !== "production") {
  globalForMongoose.mongoose = cached;
}