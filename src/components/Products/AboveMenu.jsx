import { createUrl } from "@/constant";
import { ProductLists } from "@/store/product";
import { useMenuStore } from "@/store/useCategoryStore";
import { useParams, usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useRef, useState } from "react";

const AboveMenu = () => {
  const [levels, setLevels] = useState([]);
  const sideMenu = useMenuStore((state) => state.sideMenu);
  const setLoading = useMenuStore((state) => state.setLoading);

  const [cateogryArray, setCateogryArray] = useState([]);
  const [theLastI, setTheLastI] = useState("");
  const router = useRouter();

  const {
    setProducts,
    filterOption,
    products,
    category,
    setCategory,
    allProduct,
    setFilterOption,
    setHeading,
  } = ProductLists((state) => state);
  const pathname = usePathname();
  const params = useParams();
  const allParams = useMemo(() => params?.params || [], [params]);
  const renderedDropdowns = useMemo(
    () => (
      <>
        {levels?.length > 0 &&
          levels.map((levelItems, index) => (
            <select
              key={index}
              className="form-select mt-2"
              value={cateogryArray[index] ?? ""} // 👈 Set selected value
              onChange={(e) => {
                const selectedId = Number(e.target.value);
                const element = levelItems.find((cat) => cat.id == selectedId);
                console.log("Selected Category", element);
                // handleClick(element);

                // Replace category IDs after this level
                const newArray = [...cateogryArray.slice(0, index), selectedId];
                setCateogryArray(newArray);
                //  const selectedId = Number(e.target.value);
                const newPath = [...cateogryArray.slice(0, index), selectedId];
                setCateogryArray(newPath);

                // Get selected item for slug
                const selectedItem = levels[index].find(
                  (cat) => cat.id === selectedId
                );
                const slug = selectedItem?.slug || "category";

                // Push to new URL
                const newUrl = createUrl(newPath, slug);
                console.log("New URL", newUrl);
                setProducts([]);
                setCategory([]);
                // getProductByCategory(selectedId, filterData);

                router.push(newUrl, { scroll: false, shallow: false });
                setHeading(element?.name);

                // Optional: update URL here or use router.push(...)
              }}
            >
              <option value="">Select</option>
              {levelItems?.length > 0 &&
                levelItems.map((cat, index) => (
                  <option key={index} value={cat?.id}>
                    {cat?.name}
                  </option>
                ))}
            </select>
          ))}
      </>
    ),
    [levels, cateogryArray]
  );
  const getLevels = () => {
    console.log("GetLEVELcall", sideMenu, cateogryArray);
    if (!sideMenu || !Array.isArray(cateogryArray)) return;

    let currentLevel = Array.isArray(sideMenu) ? sideMenu : [];
    let newLevels = [];
    let children = [];

    for (let i = 0; i < cateogryArray.length; i++) {
      newLevels.push(currentLevel);

      const selectedId = Number(cateogryArray[i]);
      const match = currentLevel.find((cat) => cat.id == selectedId);
      console.log("currentLevel", match, selectedId);
      if (match) {
        console.log("currentLevel", currentLevel);
      }
      if (!match) {
        console.warn(`Category ID ${selectedId} not found at level ${i}`);
        currentLevel = [];
        break; // Stop further nesting
      }

      currentLevel = match.children || [];
    }

    console.log("Next Level", currentLevel);
    if (currentLevel.length > 0) {
      newLevels.push(currentLevel); // allow next level
    }

    setLevels(newLevels);
  };
  const intiziliaseDataChild = () => {
    console.log("Rohan0987");
    const isNumeric = (value) => !isNaN(Number(value));

    const categoryIds = allParams
      .filter((segment) => isNumeric(segment)) // only keep category IDs like 3, 658, etc.
      .map(Number);

    const lastId = categoryIds[categoryIds.length - 1];

    const subCateogry = localStorage.getItem("subCateogry");
    const parsedCateogry = subCateogry ? JSON.parse(subCateogry) : [];

    console.log("Category Ids", categoryIds, lastId, parsedCateogry);

    setCateogryArray(categoryIds);
    if (lastId) {
      setTheLastI(lastId);
    }
    const idPath = Array.isArray(categoryIds)
      ? categoryIds.join("/")
      : String(categoryIds);

    const findCategoryById = async (categories, targetId) => {
      for (const cat of categories) {
        if (cat.id === targetId) return cat;
        if (cat.children?.length) {
          const found = findCategoryById(cat.children, targetId);
          if (found) return found;
        }
      }
      return null;
    };
    const selectedCategory = findCategoryById(parsedCateogry, lastId);
    console.log("✅ selectedCategory", selectedCategory?.children);
    if (selectedCategory?.children?.length > 0) {
      setCategory(selectedCategory?.children);
      setProducts([]);
      setLoading(false);
      console.log("selectedCategory if");
    } else {
      console.log("selectedCategory else");
      setProducts([]);
      setCategory([]);
      // getProductByCategory(lastId, filterData);
    }
  };
  useEffect(() => {
    setTimeout(() => {
      getLevels();
    }, 0);
  }, [sideMenu, cateogryArray]);
  const hasRunOnce = useRef(false);

  useEffect(() => {
    const intiziliaseData = async () => {
      if (hasRunOnce.current) return;
      hasRunOnce.current = true;

      intiziliaseDataChild();

      const data = localStorage.getItem("filterdData");
      // if (data) {
      //   const parsedData = JSON.parse(data);
      //   setSelectedFilter(parsedData);
      //   console.log("Parsed Data", parsedData);
      // }
    };
    setTimeout(() => {
      intiziliaseData();
    }, 0);
  }, [pathname]);
  return (
    <div className="filter-are">
      <div className="row mb-4">
        <div className="side-bar-mobi">
          <div className="row">
            <div className="col-12">
              <h4 className="mb-3">Filter</h4>

              {renderedDropdowns}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboveMenu;
