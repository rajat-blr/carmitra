import { Request, Response } from 'express';
import Guide from '../models/Guide';
import { v4 as uuidv4 } from 'uuid';

interface GuideRequest {
    title: string;
    content: string;
    category?: string;
}

class GuideController {
    // Get all guides
    async getGuides(_req: Request, res: Response) {
        try {
            console.log('Fetching all guides...');
            const guides = await Guide.find()
                .select('uuid title category createdAt')
                .sort({ createdAt: -1 })
                .lean()
                .exec();
            
            console.log(`Found ${guides.length} guides`);
            res.status(200).json(guides);
        } catch (error) {
            console.error('Error fetching guides:', error);
            res.status(500).json({ 
                success: false,
                message: 'Error fetching guides',
                error: process.env.NODE_ENV === 'development' ? error : undefined
            });
        }
    }

    // Get guide by uuid
    async getGuideByUuid(req: Request, res: Response) {
        try {
            const { uuid } = req.params;
            console.log(`Fetching guide with UUID: ${uuid}`);
            
            if (!uuid) {
                return res.status(400).json({
                    success: false,
                    message: 'Guide UUID is required'
                });
            }

            const guide = await Guide.findOne({ uuid })
                .lean()
                .exec();
            
            if (!guide) {
                return res.status(404).json({
                    success: false,
                    message: 'Guide not found'
                });
            }
            
            console.log(`Found guide: ${guide.title}`);
            res.status(200).json(guide);
        } catch (error) {
            console.error('Error fetching guide by UUID:', error);
            res.status(500).json({ 
                success: false,
                message: 'Error fetching guide',
                error: process.env.NODE_ENV === 'development' ? error : undefined
            });
        }
    }

    // Create a new guide
    async createGuide(req: Request<{}, {}, GuideRequest>, res: Response) {
        try {
            console.log('Creating new guide...');
            const { title, content, category } = req.body;
            
            // Input validation
            if (!title?.trim()) {
                return res.status(400).json({ 
                    success: false,
                    message: 'Title is required' 
                });
            }

            if (!content?.trim()) {
                return res.status(400).json({ 
                    success: false,
                    message: 'Content is required' 
                });
            }

            // Generate a UUID for the guide
            const uuid = uuidv4();
            
            // Create new guide in MongoDB
            const newGuide = await Guide.create({
                uuid,
                title: title.trim(),
                content: content.trim(),
                category: category?.trim() || 'Buying Guide'
            });

            console.log('Created guide in MongoDB:', newGuide.toObject());

            res.status(201).json({
                success: true,
                message: 'Guide created successfully',
                data: newGuide
            });
        } catch (error) {
            console.error('Error creating guide:', error);
            res.status(500).json({ 
                success: false,
                message: 'Error creating guide',
                error: process.env.NODE_ENV === 'development' ? error : undefined
            });
        }
    }
}

export = new GuideController(); 