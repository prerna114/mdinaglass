export function buildProductUrl(categoryId, sortOrder, limit, page, slug) {
  return `/product/webshop/bycategory/${categoryId}/price/${sortOrder}/${limit}/${page}/${slug}.htm`;
}
