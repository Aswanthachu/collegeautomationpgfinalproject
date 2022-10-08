import mongoose from "mongoose";

const resumeSchema = mongoose.Schema({
    userRef: mongoose.Schema.ObjectId,
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    bio: {
        type: String,
        default: null
    },
    address: {
        type: String,
        default: null
    },
    linkedin: {
        type: String,
        default: null,
    },
    github: {
        type: String,
        default: null
    },
    position: {
        type: String,
        default: null
    },
    skills: {
        type: Array,
        default:[]
    },
    resume: {
        type: String,
        default: null
    }
});

const resume = mongoose.model('resume', resumeSchema);

export default resume;