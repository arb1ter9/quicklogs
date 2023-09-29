import mongoose from "mongoose";

const logSchema = mongoose.Schema(
    {
        log_id: {
            type: Number,
            required: true,
        },
        title: {
          type: String
        },
        match_length: {
            type: Number
        },
        players: {
            type: Number
        }
    },
    {
        timestamps: true,
    }
);

export const Log = mongoose.model('Log', logSchema)