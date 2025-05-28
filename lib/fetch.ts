export async function fetchListings({
  q,
  category,
  filters,
  sort,
  order,
  page,
  perPage,
}: {
  q?: string;
  category?: string;
  filters?: Record<string, string>;
  sort?: string;
  order?: string;
  page?: number;
  perPage?: number;
}) {
  const params = new URLSearchParams();

  if (q) params.append("q", q);
  if (category) params.append("category", category);
  if (sort) params.append("sort", sort);
  if (order) params.append("order", order);
  if (page) params.append("page", page.toString());
  if (perPage) params.append("perPage", perPage.toString());
  if (filters) params.append("filters", JSON.stringify(filters));

  const res = await fetch(`/api/search?${params.toString()}`);
  return res.json();
}
