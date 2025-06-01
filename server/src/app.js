import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs/promises';
import generationRoutes from './routes/generationRoutes.js';
import healthRoutes from './routes/healthRoutes.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const VIDEOS_DIR = path.join(__dirname, '../public/videos');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Ensure videos directory exists
fs.mkdir(VIDEOS_DIR, { recursive: true }).catch(console.error);

// Serve static files from the public directory
app.use('/videos', express.static(VIDEOS_DIR, {
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.mp4')) {
      res.set('Content-Type', 'video/mp4');
      res.set('Accept-Ranges', 'bytes');
      res.set('Cache-Control', 'no-cache');
    }
  }
}));

// Add error handling for video files
app.use('/videos', async (req, res, next) => {
  try {
    const filePath = path.join(VIDEOS_DIR, path.basename(req.path));
    await fs.access(filePath);
    next();
  } catch (error) {
    res.status(404).json({ error: 'Video not found' });
  }
});

// Routes
app.use('/api', generationRoutes);
app.use('/api', healthRoutes);

export { app, port }; 