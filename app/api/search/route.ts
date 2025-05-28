/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import Listing from "@/models/Listing";
import Category from "@/models/Category";
import dbConnect from "@/lib/mongoose";
import mongoose from "mongoose";

interface CategoryType {
  _id: string;
  name: string;
  slug: string;
  attributeSchema: Record<string, any>;
  uid: string;
}

export async function GET(req: NextRequest) {
  await dbConnect();

  const { searchParams } = new URL(req.url);

  const q = searchParams.get("q")?.toLowerCase() || "";
  const categorySlug = searchParams.get("category");
  const filters = searchParams.get("filters")
    ? JSON.parse(searchParams.get("filters")!)
    : {};
  const sort = searchParams.get("sort") || "createdAt";
  const order = searchParams.get("order") === "asc" ? 1 : -1;
  const page = parseInt(searchParams.get("page") || "1", 10);
  const perPage = parseInt(searchParams.get("perPage") || "10", 10);

  let category = null;

  if (categorySlug) {
    category = await Category.findOne({
      slug: categorySlug,
    }).lean<CategoryType>();
    if (!category) {
      return NextResponse.json({ results: [], facets: {}, total: 0 });
    }
  }

  const matchStage: any = {};

  if (q) {
    matchStage.$or = [
      { title: { $regex: q, $options: "i" } },
      { description: { $regex: q, $options: "i" } },
    ];
  }

  if (category && "_id" in category) {
    matchStage.categoryId = new mongoose.Types.ObjectId(category._id);
  }

  for (const [key, value] of Object.entries(filters)) {
    matchStage[`attributes.${key}`] = value;
  }

  const pipeline: any[] = [
    { $match: matchStage },
    {
      $facet: {
        results: [
          { $sort: { [sort]: order } },
          { $skip: (page - 1) * perPage },
          { $limit: perPage },
        ],
        totalCount: [{ $count: "count" }],
        facets: [
          { $project: { attributes: 1 } },
          { $replaceRoot: { newRoot: "$attributes" } },
          { $group: { _id: null, fields: { $push: "$$ROOT" } } },
          {
            $project: {
              facets: {
                $reduce: {
                  input: "$fields",
                  initialValue: {},
                  in: {
                    $mergeObjects: [
                      "$$value",
                      {
                        $arrayToObject: {
                          $map: {
                            input: { $objectToArray: "$$this" },
                            as: "kv",
                            in: {
                              k: "$$kv.k",
                              v: {
                                $cond: [
                                  {
                                    $in: [
                                      "$$kv.k",
                                      Object.keys(
                                        category?.attributeSchema || {}
                                      ),
                                    ],
                                  },
                                  {
                                    $setUnion: [
                                      ["$$kv.v"],
                                      {
                                        $ifNull: [
                                          {
                                            $getField: {
                                              field: "$$kv.k",
                                              input: "$$value",
                                            },
                                          },
                                          [],
                                        ],
                                      },
                                    ],
                                  },
                                  {
                                    $ifNull: [
                                      {
                                        $getField: {
                                          field: "$$kv.k",
                                          input: "$$value",
                                        },
                                      },
                                      [],
                                    ],
                                  },
                                ],
                              },
                            },
                          },
                        },
                      },
                    ],
                  },
                },
              },
            },
          },
        ],
      },
    },
    {
      $project: {
        results: 1,
        facets: { $arrayElemAt: ["$facets.facets", 0] },
        total: { $arrayElemAt: ["$totalCount.count", 0] },
      },
    },
  ];

  const [data] = await Listing.aggregate(pipeline);

  return NextResponse.json({
    results: data.results,
    facets: data.facets || {},
    total: data.total || 0,
    page,
    perPage,
  });
}
