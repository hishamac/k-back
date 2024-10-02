import express from 'express';
import connectDB from './config/database';
import postRoutes from './routes/posts';
import userRoutes from './routes/userRoute';
import taskRoutes from './routes/taskRoute';
import skillRoutes from './routes/skillRoute';

import dotenv from 'dotenv';
dotenv.config();


const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(express.json());
app.use('/api', [userRoutes, taskRoutes, skillRoutes]);
app.use('/api/posts', postRoutes);

app.all("*", (req, res) => {
  res.status(400).json({
    error: `${req.originalUrl} [${req.method}] is not found in this server`,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});
