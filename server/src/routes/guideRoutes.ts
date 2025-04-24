import express from 'express';
import fs from 'fs';
import path from 'path';

const router = express.Router();

// Get all guides
router.get('/', (req, res) => {
  try {
    const guidesData = fs.readFileSync(path.join(__dirname, '../data/guides.json'), 'utf8');
    const guides = JSON.parse(guidesData);
    res.json(guides);
  } catch (error) {
    console.error('Error fetching guides:', error);
    res.status(500).json({ message: 'Failed to fetch guides' });
  }
});

// Get guide by UUID
router.get('/:uuid', (req, res) => {
  try {
    const { uuid } = req.params;
    const guidesData = fs.readFileSync(path.join(__dirname, '../data/guides.json'), 'utf8');
    const guides = JSON.parse(guidesData);
    
    const guide = guides.find((g: any) => g.uuid === uuid);
    
    if (!guide) {
      return res.status(404).json({ message: 'Guide not found' });
    }
    
    res.json(guide);
  } catch (error) {
    console.error('Error fetching guide:', error);
    res.status(500).json({ message: 'Failed to fetch guide' });
  }
});

export default (app: express.Router) => {
  app.use('/api/guides', router);
};