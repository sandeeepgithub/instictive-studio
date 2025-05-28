"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-explicit-any */
var mongoose_1 = require("mongoose");
var ListingSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    location: { type: String, required: true },
    categoryId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    },
    attributes: { type: mongoose_1.Schema.Types.Mixed, required: true },
}, { timestamps: true });
exports.default = mongoose_1.default.models.Listing ||
    mongoose_1.default.model("Listing", ListingSchema);
