"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-explicit-any */
var mongoose_1 = require("mongoose");
var CategorySchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    attributeSchema: { type: mongoose_1.Schema.Types.Mixed, required: true },
});
exports.default = mongoose_1.default.models.Category ||
    mongoose_1.default.model("Category", CategorySchema);
