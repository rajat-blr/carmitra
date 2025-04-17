import { Schema, model } from 'mongoose';

interface ICar {
    carModel: string;
    rating: number;
    comment: string;
    dealershipName: string;
    city: string;
    purchaseDate: string; // MM/YYYY format
    salesExperienceRating: number;
    pricePaid: number;
    ownershipDuration: number; // in months
    pros: string[];
    cons: string[];
    fuelEfficiency: number; // kmpl
    variant: string;
    createdAt: Date;
}

const carSchema = new Schema<ICar>({
    carModel: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
    dealershipName: { type: String, required: true },
    city: { type: String, required: true },
    purchaseDate: { type: String, required: true },
    salesExperienceRating: { type: Number, required: true, min: 1, max: 5 },
    pricePaid: { type: Number, required: true, min: 0, default: 0 },
    ownershipDuration: { type: Number, required: true, min: 0, default: 0 },
    pros: { type: [String], required: true, default: [] },
    cons: { type: [String], required: true, default: [] },
    fuelEfficiency: { type: Number, required: true, min: 0, default: 0 },
    variant: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Car = model<ICar>('Car', carSchema);

export = Car;