import { useParams } from "next/navigation";
import { useMemo } from "react";

const useCategoryIdString = () => {
  const params = useParams();
  const allParams = useMemo(() => params?.params || [], [params]);

  const priceIndex = allParams.findIndex((p) => p === "price");

  const categoryIds = useMemo(() => {
    const rawIds =
      priceIndex !== -1
        ? allParams.slice(0, priceIndex).map(Number)
        : allParams.map(Number);

    const validIds = rawIds.filter((id) => !isNaN(id));

    return validIds.length > 0 ? validIds.join("/") : "1";
  }, [allParams, priceIndex]);

  return categoryIds;
};

export default useCategoryIdString;
