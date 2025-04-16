import { Request, Response } from 'express';
import Car from '../models/Car';

interface ReviewRequest {
    carModel: string;
    rating: number;
    comment: string;
    dealershipName: string;
    city: string;
    purchaseDate: string;
    salesExperienceRating: number;
}

class CarController {
    async getReviews(_req: Request, res: Response) {
        try {
            const reviews = await Car.find()
                .sort({ createdAt: -1 })
                .select('carModel rating comment dealershipName city purchaseDate salesExperienceRating createdAt')
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
            const { 
                carModel, 
                rating, 
                comment, 
                dealershipName, 
                city, 
                purchaseDate, 
                salesExperienceRating 
            } = req.body;

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

            if (!dealershipName?.trim()) {
                return res.status(400).json({ 
                    success: false,
                    message: 'Dealership name is required' 
                });
            }

            if (!city?.trim()) {
                return res.status(400).json({ 
                    success: false,
                    message: 'City is required' 
                });
            }

            if (!purchaseDate?.trim() || !/^\d{2}\/\d{4}$/.test(purchaseDate)) {
                return res.status(400).json({ 
                    success: false,
                    message: 'Purchase date is required in MM/YYYY format' 
                });
            }

            const numericRating = Number(rating);
            if (isNaN(numericRating) || numericRating < 1 || numericRating > 5) {
                return res.status(400).json({ 
                    success: false,
                    message: 'Rating must be a number between 1 and 5' 
                });
            }

            const numericSalesRating = Number(salesExperienceRating);
            if (isNaN(numericSalesRating) || numericSalesRating < 1 || numericSalesRating > 5) {
                return res.status(400).json({ 
                    success: false,
                    message: 'Sales experience rating must be a number between 1 and 5' 
                });
            }

            // Create new review in MongoDB with all required fields
            const newReview = await Car.create({
                carModel: carModel.trim(),
                rating: numericRating,
                comment: comment.trim(),
                dealershipName: dealershipName.trim(),
                city: city.trim(),
                purchaseDate: purchaseDate.trim(),
                salesExperienceRating: numericSalesRating,
                // Set default values for other required fields
                pricePaid: 0,
                ownershipDuration: 0,
                pros: [],
                cons: [],
                fuelEfficiency: 0,
                variant: 'base'
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