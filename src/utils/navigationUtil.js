import { ProductLists } from "@/store/product";
import { useMenuStore } from "@/store/useCategoryStore";

// utils/navigationHelpers.ts
export const navigateToCategory = async (id, slug) => {
  const { subCategoryMap, parentMap, setSubCategory, setExpanded } =
    useMenuStore.getState();
  const { setProducts, setCategory } = ProductLists.getState();

  // Rebuild full path
  const buildCategoryPath = (catId) => {
    const path = [catId];
    let current = catId;
    while (parentMap[current]) {
      current = parentMap[current];
      path.unshift(current);
    }
    return path;
  };

  const pathToId = buildCategoryPath(id);

  // Fetch subcategories (if not already cached)
  for (let i = 0; i < pathToId.length; i++) {
    const catId = pathToId[i];
    if (!subCategoryMap[catId]) {
      const data = await getProductCateogry(catId);
      if (data?.status === 200) {
        setSubCategory(catId, data.data.sub_categories || []);

        const isLast = i === pathToId.length - 1;
        if (isLast) {
          if (data.data.sub_categories?.length) {
            setCategory(data.data.sub_categories);
            setProducts([]);
          } else {
            setCategory([]);
            setProducts(data.data.products || []);
          }
        }
      }
    }
  }

  // Set sidebar state
  setExpanded(pathToId);

  // Push to URL
  const newUrl = createUrl(pathToId, slug);
  useRouter().push(newUrl);
};
