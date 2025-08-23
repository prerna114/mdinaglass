export function buildProductUrl(
  categoryId,
  sortOrder,
  limit,
  page,
  slug,
  sortBy,
  size
) {
  return `/product/webshop/bycategory/${categoryId}/${
    sortBy ? sortBy : "price"
  }/${sortOrder}/${limit}/${page}${size ? `/size/${size}` : ""}/${slug}.htm`;
}
