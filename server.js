import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import mainRouter from './routes/indexrouting.js';

// Load environment variables
dotenv.config();

const db_user = process.env.DB_USER;
const db_name = process.env.DB_NAME;
const db_pass = process.env.DB_PASS;

// Create Express app
const app = express();

app.use(cors({
  origin:'http://localhost:5174',
  credentials: true,
   methods: ['GET', 'POST', 'PUT', 'DELETE'],
   allowedHeaders: ['Content-Type', 'Authorization']
 }));

app.use(express.json());
app.use('/', mainRouter);

// Improved MongoDB connection for serverless environments
const dbUri = `mongodb+srv://${db_user}:${encodeURIComponent(db_pass)}@cluster0.bp48c.mongodb.net/${db_name}?retryWrites=true&w=majority&appName=Cluster0`;


const connectDB = async () => {
  try {
  

    await mongoose.connect(dbUri);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Could not connect to MongoDB', err);
    process.exit(1);
  }
};
connectDB();

app.get('/', (req, res) => {
  res.send('Evuriro API is running');
});

if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5006;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;