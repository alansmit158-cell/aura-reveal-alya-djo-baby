import mongoose from 'mongoose';

const timelineSchema = new mongoose.Schema({
    time: String,
    title: String,
    iconName: String,
    description: String
}, { _id: false });

const weddingSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    theme: { type: String, default: 'theme1' },
    bride: String,
    groom: String,
    date: String,
    formattedDate: String,
    location: String,
    welcomeLocation: String,
    mapLocationName: String,
    mapIframeSrc: String,
    mapLinkInfo: String,
    timeline: [timelineSchema],
    maxGuests: { type: Number, default: 200 },
    confirmedGuests: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model('Wedding', weddingSchema);
