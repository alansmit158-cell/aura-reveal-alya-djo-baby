import mongoose from 'mongoose';

const voteSchema = new mongoose.Schema({
    name: { type: String, required: true },
    choice: { type: String, enum: ['boy', 'girl'], required: true },
    timestamp: { type: Date, default: Date.now }
}, { _id: false });

const babyRevealSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true }, // e.g., 'aura-reveal'
    revealDate: { type: String, default: '2026-04-12T18:00:00' },
    revealResult: { type: String, enum: ['boy', 'girl'], default: 'boy' },
    votes: [voteSchema]
}, { timestamps: true });

export default mongoose.model('BabyReveal', babyRevealSchema);
