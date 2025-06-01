import express from 'express';
import { generateManimScript } from '../services/generationService.js';
import { renderManimScript } from '../services/manimService.js';

const router = express.Router();

router.post('/generate', async (req, res) => {
  try {
    const { prompt } = req.body;
    const script = await generateManimScript(prompt);
    res.json({ script });
  } catch (error) {
    console.error('Error generating script:', error);
    res.status(500).json({ error: 'Failed to generate script' });
  }
});

router.post('/render', async (req, res) => {
  try {
    const { script } = req.body;
    const videoPath = await renderManimScript(script);
    res.json({ videoUrl: videoPath });
  } catch (error) {
    console.error('Error rendering script:', error);
    res.status(500).json({ error: 'Failed to render script' });
  }
});

export default router;
