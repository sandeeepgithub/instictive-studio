"use client";

import { useEffect, useState } from "react";
import { fetchListings } from "@/lib/fetch";
import { Listing, Facets } from "@/types";

export default function SearchPage() {
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("");
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [listings, setListings] = useState<Listing[]>([]);
  const [facets, setFacets] = useState<Facets>({});
  const [page, setPage] = useState(1);
  const perPage = 5;
  const [total, setTotal] = useState(0);

  useEffect(() => {
    (async () => {
      const data = await fetchListings({ q, category, filters, page, perPage });
      setListings(data.results);
      setFacets(data.facets || {});
      setTotal(data.total || 0);
    })();
  }, [q, category, filters, page]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(1);
  };

  const handleCategoryChange = (value: string) => {
    setCategory(value);
    setFilters({}); // Clear all other filters
    setPage(1);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto text-gray-900 dark:text-white">
      <h1 className="text-3xl font-bold mb-6">Search Listings</h1>

      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search..."
        className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 p-3 rounded w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <select
        value={category}
        onChange={(e) => handleCategoryChange(e.target.value)}
        className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 p-3 rounded w-full mb-4"
      >
        <option value="">All Categories</option>
        <option value="televisions">Televisions</option>
        <option value="running-shoes">Running Shoes</option>
      </select>

      {Object.entries(facets).map(([key, values]) => (
        <div key={key} className="mb-4">
          <label className="block font-medium mb-1 capitalize">{key}</label>
          <select
            value={filters[key] || ""}
            onChange={(e) => handleFilterChange(key, e.target.value)}
            className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 p-3 rounded w-full"
          >
            <option value="">Any</option>
            {values.map((val) => (
              <option key={val} value={val}>
                {val}
              </option>
            ))}
          </select>
        </div>
      ))}

      <div className="mt-8 space-y-6">
        {listings.map((listing) => (
          <div
            key={listing._id}
            className="border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 rounded-lg p-5 shadow-sm"
          >
            <h2 className="text-xl font-semibold mb-1">{listing.title}</h2>
            <p className="mb-2 text-gray-700 dark:text-gray-300">
              {listing.description}
            </p>
            <div className="text-sm space-y-1">
              {Object.entries(listing.attributes).map(([k, v]) => (
                <div key={k}>
                  <span className="font-medium capitalize">{k}:</span>{" "}
                  <span>{v}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mt-8 text-sm">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Prev
        </button>
        <span className="text-gray-700 dark:text-gray-300">
          Page {page} of {Math.ceil(total / perPage)}
        </span>
        <button
          onClick={() => setPage((p) => p + 1)}
          disabled={page * perPage >= total}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
}
