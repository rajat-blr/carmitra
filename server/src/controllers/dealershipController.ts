import { Request, Response } from 'express';
import Car from '../models/Car';
import type { PipelineStage } from 'mongoose';

class DealershipController {
    async getDealerships(req: Request, res: Response) {
        try {
            const { city, brand } = req.query;
            
            // Create base aggregation pipeline
            const pipeline: PipelineStage[] = [
                {
                    $group: {
                        _id: {
                            dealershipName: '$dealershipName',
                            city: '$city'
                        },
                        avgSalesRating: { $avg: '$salesExperienceRating' },
                        avgRating: { $avg: '$rating' },
                        reviewCount: { $sum: 1 },
                        brands: { $addToSet: { $arrayElemAt: [{ $split: ['$carModel', ' '] }, 0] } }
                    }
                },
                {
                    $project: {
                        _id: 0,
                        name: '$_id.dealershipName',
                        location: '$_id.city',
                        salesRating: { $round: ['$avgSalesRating', 1] },
                        rating: { $round: ['$avgRating', 1] },
                        reviewCount: 1,
                        brands: 1
                    }
                },
                {
                    $sort: { salesRating: -1 }
                }
            ];

            // Add city filter if provided
            if (typeof city === 'string' && city.trim()) {
                pipeline.unshift({
                    $match: {
                        city: new RegExp(`^${city.trim()}$`, 'i')
                    }
                });
            }

            // Add brand filter if provided
            if (typeof brand === 'string' && brand.trim()) {
                pipeline.push({
                    $match: {
                        brands: new RegExp(brand.trim(), 'i')
                    }
                });
            }

            const dealerships = await Car.aggregate(pipeline);

            res.status(200).json(dealerships);
        } catch (error) {
            console.error('Error fetching dealerships:', error);
            res.status(500).json({ message: 'Error fetching dealerships' });
        }
    }

    async addDealership(req: Request, res: Response) {
        try {
            const { name, location, rating, brand } = req.body;

            if (!name || !location || !rating || !brand) {
                return res.status(400).json({ message: 'All fields are required' });
            }

            if (rating < 1 || rating > 5) {
                return res.status(400).json({ message: 'Rating must be between 1 and 5' });
            }

            const newDealership = {
                id: Math.random(), // Placeholder for ID generation
                name,
                location,
                rating,
                brand
            };

            // Placeholder for adding dealership logic
            res.status(201).json(newDealership);
        } catch (error) {
            console.error('Error adding dealership:', error);
            res.status(500).json({ message: 'Error adding dealership' });
        }
    }
}

export = new DealershipController();