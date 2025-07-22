export function buildProductUrl(
  categoryId,
  sortOrder,
  limit,
  page,
  slug,
  sortBy
) {
  return `/product/webshop/bycategory/${categoryId}/${
    sortBy ? sortBy : "price"
  }/${sortOrder}/${limit}/${page}/${slug}.htm`;
}
