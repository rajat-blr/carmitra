import { Schema, model } from 'mongoose';

interface IGuide {
    uuid: string;
    title: string;
    summary: string;
    content: string;
    category: string;
    tags: string[];
    authorName: string;
    publishDate: Date;
    lastUpdated: Date;
    readTime: number; // in minutes
}

const guideSchema = new Schema<IGuide>({
    uuid: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    summary: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String, required: true, default: 'Buying Guide' },
    tags: { type: [String], default: [] },
    authorName: { type: String, required: true, default: 'CarMitra Team' },
    publishDate: { type: Date, default: Date.now },
    lastUpdated: { type: Date, default: Date.now },
    readTime: { type: Number, required: true, default: 5 }, // Default 5 minutes
});

const Guide = model<IGuide>('Guide', guideSchema);

export = Guide; 