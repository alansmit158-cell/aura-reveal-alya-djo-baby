import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import BabyReveal from './models/BabyReveal.js';

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/wedding-platform';

let isConnected = false;

const connectDB = async () => {
    if (isConnected) return;
    try {
        await mongoose.connect(MONGODB_URI);
        isConnected = true;
        console.log('MongoDB Connected');
    } catch (err) {
        console.error('MongoDB Error:', err);
    }
};

// Vercel Serverless Handler
export default async (req, res) => {
    await connectDB();

    const { method, url } = req;

    // Extract ID and action from URL if possible, or use query
    const urlParts = url.split('/').filter(Boolean);
    const id = urlParts[2] || req.query.id;
    const action = urlParts[3] || req.query.action;

    // Handle Baby Reveal Routes
    if (url.includes('/api/baby-reveal')) {
        try {
            if (method === 'GET' && id) {
                let reveal = await BabyReveal.findOne({ id });
                if (!reveal) {
                    reveal = new BabyReveal({ id });
                    await reveal.save();
                }
                return res.json(reveal);
            }

            if (method === 'POST' && id && action === 'vote') {
                const { name, choice } = req.body;
                if (!name || !choice) return res.status(400).json({ message: 'Name and choice required' });

                const reveal = await BabyReveal.findOne({ id });
                if (!reveal) return res.status(404).json({ message: 'Reveal not found' });

                reveal.votes.push({ name, choice });
                await reveal.save();
                return res.status(201).json(reveal);
            }

            if (method === 'PUT' && id && action === 'config') {
                const { revealDate, revealResult } = req.body;
                const reveal = await BabyReveal.findOneAndUpdate(
                    { id },
                    { revealDate, revealResult },
                    { new: true, upsert: true }
                );
                return res.json(reveal);
            }
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    res.status(404).json({ message: 'Not Found' });
};
