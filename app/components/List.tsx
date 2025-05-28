import React from "react";

interface Listing {
  _id: string;
  title: string;
  description: string;
  attributes: Record<string, string>;
}

interface ListProps {
  listings: Listing[];
}

const List: React.FC<ListProps> = ({ listings }) => {
  return (
    <>
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
    </>
  );
};

export default List;
