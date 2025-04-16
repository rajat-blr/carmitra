import { Request, Response } from 'express';
import type Dealership from '../models/Dealership';

class DealershipController {
    private dealerships: Dealership[] = [
        {
            id: 1,
            name: "AutoMax Honda",
            location: "Mumbai",
            rating: 4.5,
            brand: "Honda"
        },
        {
            id: 2,
            name: "Toyota City",
            location: "Delhi",
            rating: 4.8,
            brand: "Toyota"
        },
        {
            id: 3,
            name: "Hyundai Plus",
            location: "Bangalore",
            rating: 4.3,
            brand: "Hyundai"
        }
    ];
    private nextId = 4;

    async getDealerships(req: Request, res: Response) {
        try {
            const { city, brand } = req.query;

            if (!city || !brand) {
                return res.status(400).json({ message: 'City and brand are required' });
            }

            const filteredDealerships = this.dealerships.filter(d => 
                d.location.toLowerCase() === (city as string).toLowerCase() &&
                d.brand.toLowerCase() === (brand as string).toLowerCase()
            );

            res.status(200).json(filteredDealerships);
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

            const newDealership: Dealership = {
                id: this.nextId++,
                name,
                location,
                rating,
                brand
            };

            this.dealerships.push(newDealership);
            res.status(201).json(newDealership);
        } catch (error) {
            console.error('Error adding dealership:', error);
            res.status(500).json({ message: 'Error adding dealership' });
        }
    }
}

export = new DealershipController();