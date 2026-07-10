const mongoose = require('mongoose');
//require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;
console.log(process.env.MONGODB_URI) 
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (!MONGODB_URI) {
    throw new Error('Переменная окружения MONGODB_URI не задана');
  }

  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((m) => m);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

module.exports = connectDB;