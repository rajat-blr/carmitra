import { Request, Response } from 'express';
import Car from '../models/Car';

interface ReviewRequest {
    carModel: string;
    rating: number;
    comment: string;
}

class CarController {
    async getReviews(_req: Request, res: Response) {
        try {
            // Get reviews from MongoDB and sort by date, newest first
            const reviews = await Car.find()
                .sort({ createdAt: -1 })
                .exec();
            
            res.status(200).json(reviews);
        } catch (error) {
            console.error('Error fetching reviews:', error);
            res.status(500).json({ 
                success: false,
                message: 'Error fetching reviews',
                error: process.env.NODE_ENV === 'development' ? error : undefined
            });
        }
    }

    async submitReview(req: Request<{}, {}, ReviewRequest>, res: Response) {
        try {
            const { carModel, rating, comment } = req.body;

            // Input validation
            if (!carModel?.trim()) {
                return res.status(400).json({ 
                    success: false,
                    message: 'Car model is required' 
                });
            }

            if (!comment?.trim()) {
                return res.status(400).json({ 
                    success: false,
                    message: 'Review comment is required' 
                });
            }

            const numericRating = Number(rating);
            if (isNaN(numericRating) || numericRating < 1 || numericRating > 5) {
                return res.status(400).json({ 
                    success: false,
                    message: 'Rating must be a number between 1 and 5' 
                });
            }

            // Create new review in MongoDB
            const newReview = await Car.create({
                carModel: carModel.trim(),
                rating: numericRating,
                comment: comment.trim()
            });

            res.status(201).json({
                success: true,
                message: 'Review submitted successfully',
                data: newReview
            });
        } catch (error) {
            console.error('Error submitting review:', error);
            res.status(500).json({ 
                success: false,
                message: 'Error submitting review',
                error: process.env.NODE_ENV === 'development' ? error : undefined
            });
        }
    }
}

export = new CarController();