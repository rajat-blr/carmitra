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
    pricePaid: number;
    ownershipDuration: number;
    pros: string[];
    cons: string[];
    fuelEfficiency: number;
    variant: string;
}

class CarController {
    async getReviews(_req: Request, res: Response) {
        try {
            console.log('Fetching reviews...');
            const reviews = await Car.find()
                .sort({ createdAt: -1 })
                .select('carModel rating comment dealershipName city purchaseDate salesExperienceRating createdAt pricePaid ownershipDuration pros cons fuelEfficiency variant')
                .lean()
                .exec();
            
            console.log(`Found ${reviews.length} reviews`);
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

    async getReviewById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            console.log(`Fetching review with ID: ${id}`);
            
            if (!id) {
                return res.status(400).json({
                    success: false,
                    message: 'Review ID is required'
                });
            }

            const review = await Car.findById(id)
                .select('carModel rating comment dealershipName city purchaseDate salesExperienceRating createdAt pricePaid ownershipDuration pros cons fuelEfficiency variant')
                .lean()
                .exec();
            
            if (!review) {
                return res.status(404).json({
                    success: false,
                    message: 'Review not found'
                });
            }
            
            console.log(`Found review for ${review.carModel}`);
            res.status(200).json(review);
        } catch (error) {
            console.error('Error fetching review by ID:', error);
            res.status(500).json({ 
                success: false,
                message: 'Error fetching review',
                error: process.env.NODE_ENV === 'development' ? error : undefined
            });
        }
    }

    async submitReview(req: Request<{}, {}, ReviewRequest>, res: Response) {
        try {
            console.log('Raw request body:', req.body);
            
            const { 
                carModel, 
                rating, 
                comment, 
                dealershipName, 
                city, 
                purchaseDate, 
                salesExperienceRating,
                pricePaid,
                ownershipDuration,
                pros,
                cons,
                fuelEfficiency,
                variant
            } = req.body;

            // Log each field for debugging
            console.log('Parsed fields:', {
                carModel,
                rating,
                comment,
                dealershipName,
                city,
                purchaseDate,
                salesExperienceRating,
                pricePaid,
                ownershipDuration,
                pros,
                cons,
                fuelEfficiency,
                variant
            });

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

            if (!variant?.trim()) {
                return res.status(400).json({ 
                    success: false,
                    message: 'Variant is required' 
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

            if (!Array.isArray(pros) || pros.some(pro => typeof pro !== 'string')) {
                return res.status(400).json({
                    success: false,
                    message: 'Pros must be an array of strings'
                });
            }

            if (!Array.isArray(cons) || cons.some(con => typeof con !== 'string')) {
                return res.status(400).json({
                    success: false,
                    message: 'Cons must be an array of strings'
                });
            }

            const numericFuelEfficiency = Number(fuelEfficiency);
            if (isNaN(numericFuelEfficiency) || numericFuelEfficiency < 0) {
                return res.status(400).json({
                    success: false,
                    message: 'Fuel efficiency must be a positive number'
                });
            }

            const numericPricePaid = Number(pricePaid);
            if (isNaN(numericPricePaid) || numericPricePaid < 0) {
                return res.status(400).json({
                    success: false,
                    message: 'Price paid must be a positive number'
                });
            }

            // Clean and prepare the data
            const sanitizedPros = Array.isArray(pros) ? pros.filter(p => p.trim()) : [];
            const sanitizedCons = Array.isArray(cons) ? cons.filter(c => c.trim()) : [];
            
            const reviewData = {
                carModel: carModel.trim(),
                rating: numericRating,
                comment: comment.trim(),
                dealershipName: dealershipName.trim(),
                city: city.trim(),
                purchaseDate: purchaseDate.trim(),
                salesExperienceRating: numericSalesRating,
                pricePaid: numericPricePaid,
                ownershipDuration: Number(ownershipDuration),
                pros: sanitizedPros,
                cons: sanitizedCons,
                fuelEfficiency: numericFuelEfficiency,
                variant: variant.trim()
            };

            console.log('Sanitized review data:', reviewData);

            // Create new review in MongoDB
            const newReview = await Car.create(reviewData);

            console.log('Created review in MongoDB:', newReview.toObject());

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