import { Schema, model } from 'mongoose';

interface ICar {
    carModel: string;
    rating: number;
    comment: string;
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
    pricePaid: { type: Number, required: true },
    ownershipDuration: { type: Number, required: true },
    pros: { type: [String], required: true },
    cons: { type: [String], required: true },
    fuelEfficiency: { type: Number, required: true },
    variant: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Car = model<ICar>('Car', carSchema);

export = Car;