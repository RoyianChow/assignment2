import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ContactSchema = new Schema({
    name: String,
    email: String,
    company: String,
    address: String,   
    number: Number
}, {
    timestamps: true, 
    collection: 'contact'
});

export default mongoose.model("contact", ContactSchema);

