import { Request, Response } from 'express';
import Guide from '../models/Guide';
import { v4 as uuidv4 } from 'uuid';

interface GuideRequest {
    title: string;
    summary: string;
    content: string;
    category?: string;
    tags?: string[];
    authorName?: string;
    readTime?: number;
}

class GuideController {
    async getAllGuides(req: Request, res: Response) {
        try {
            console.log('Fetching all guides...');
            const guides = await Guide.find()
                .select('uuid title summary category tags authorName publishDate readTime')
                .sort({ publishDate: -1 })
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

    async createGuide(req: Request<{}, {}, GuideRequest>, res: Response) {
        try {
            console.log('Creating new guide:', req.body.title);
            
            const { 
                title, 
                summary, 
                content, 
                category,
                tags,
                authorName,
                readTime
            } = req.body;

            // Input validation
            if (!title?.trim()) {
                return res.status(400).json({ 
                    success: false,
                    message: 'Title is required' 
                });
            }

            if (!summary?.trim()) {
                return res.status(400).json({ 
                    success: false,
                    message: 'Summary is required' 
                });
            }

            if (!content?.trim()) {
                return res.status(400).json({ 
                    success: false,
                    message: 'Content is required' 
                });
            }

            // Create a new guide with UUID
            const guideData = {
                uuid: uuidv4(),
                title: title.trim(),
                summary: summary.trim(),
                content: content.trim(),
                category: category || 'Buying Guide',
                tags: tags || [],
                authorName: authorName || 'CarMitra Team',
                readTime: readTime || Math.ceil(content.length / 1000), // Estimate read time based on content length
                publishDate: new Date(),
                lastUpdated: new Date()
            };

            const newGuide = await Guide.create(guideData);

            console.log('Created new guide:', newGuide.title);

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

    async updateGuide(req: Request, res: Response) {
        try {
            const { uuid } = req.params;
            const updateData = req.body;

            console.log(`Updating guide with UUID: ${uuid}`);
            
            if (!uuid) {
                return res.status(400).json({
                    success: false,
                    message: 'Guide UUID is required'
                });
            }

            // Add lastUpdated timestamp
            updateData.lastUpdated = new Date();
            
            const updatedGuide = await Guide.findOneAndUpdate(
                { uuid },
                updateData,
                { new: true, runValidators: true }
            );
            
            if (!updatedGuide) {
                return res.status(404).json({
                    success: false,
                    message: 'Guide not found'
                });
            }
            
            console.log(`Updated guide: ${updatedGuide.title}`);
            res.status(200).json({
                success: true,
                message: 'Guide updated successfully',
                data: updatedGuide
            });
        } catch (error) {
            console.error('Error updating guide:', error);
            res.status(500).json({
                success: false,
                message: 'Error updating guide',
                error: process.env.NODE_ENV === 'development' ? error : undefined
            });
        }
    }

    async deleteGuide(req: Request, res: Response) {
        try {
            const { uuid } = req.params;
            console.log(`Deleting guide with UUID: ${uuid}`);
            
            if (!uuid) {
                return res.status(400).json({
                    success: false,
                    message: 'Guide UUID is required'
                });
            }

            const deletedGuide = await Guide.findOneAndDelete({ uuid });
            
            if (!deletedGuide) {
                return res.status(404).json({
                    success: false,
                    message: 'Guide not found'
                });
            }
            
            console.log(`Deleted guide: ${deletedGuide.title}`);
            res.status(200).json({
                success: true,
                message: 'Guide deleted successfully'
            });
        } catch (error) {
            console.error('Error deleting guide:', error);
            res.status(500).json({
                success: false,
                message: 'Error deleting guide',
                error: process.env.NODE_ENV === 'development' ? error : undefined
            });
        }
    }
}

export = new GuideController(); 