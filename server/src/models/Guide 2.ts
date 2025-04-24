import { Schema, model } from 'mongoose';

interface IGuide {
    uuid: string;
    title: string;
    content: string;
    category: string;
    createdAt: Date;
}

const guideSchema = new Schema<IGuide>({
    uuid: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String, required: true, default: 'Buying Guide' },
    createdAt: { type: Date, default: Date.now }
});

const Guide = model<IGuide>('Guide', guideSchema);

export = Guide; 