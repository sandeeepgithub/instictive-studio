"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var Category_1 = require("../models/Category");
var Listing_1 = require("../models/Listing");
var categories_json_1 = require("../data/categories.json");
var listings_json_1 = require("../data/listings.json");
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/b2b-marketplace";
function seed() {
    return __awaiter(this, void 0, void 0, function () {
        var insertedCategories, categoryMap_1, listingsWithIds, insertedListings, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 6, , 7]);
                    return [4 /*yield*/, mongoose_1.default.connect(MONGODB_URI)];
                case 1:
                    _a.sent();
                    console.log("Connected to MongoDB");
                    // Clear existing data
                    return [4 /*yield*/, Category_1.default.deleteMany({})];
                case 2:
                    // Clear existing data
                    _a.sent();
                    return [4 /*yield*/, Listing_1.default.deleteMany({})];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, Category_1.default.insertMany(categories_json_1.default)];
                case 4:
                    insertedCategories = _a.sent();
                    console.log("Inserted ".concat(insertedCategories.length, " categories"));
                    categoryMap_1 = insertedCategories.reduce(function (acc, cat) {
                        acc[cat.slug] = cat._id;
                        return acc;
                    }, {});
                    listingsWithIds = listings_json_1.default.map(function (listing) { return (__assign(__assign({}, listing), { categoryId: categoryMap_1[listing.categoryId] || listing.categoryId })); });
                    return [4 /*yield*/, Listing_1.default.insertMany(listingsWithIds)];
                case 5:
                    insertedListings = _a.sent();
                    console.log("Inserted ".concat(insertedListings.length, " listings"));
                    process.exit(0);
                    return [3 /*break*/, 7];
                case 6:
                    err_1 = _a.sent();
                    console.error(err_1);
                    process.exit(1);
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    });
}
seed();
