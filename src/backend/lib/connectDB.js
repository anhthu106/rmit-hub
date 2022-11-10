import mongoose from 'mongoose';

const connectDB = async () => mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true }, () => {
    console.log('connected');
});

export default connectDB;