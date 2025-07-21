import { CmsInformation } from "@/api/Customer";
import { useAuthStore } from "@/store/useAuthStore";
import { useParams, useRouter } from "next/navigation";
import React, { act, useEffect, useMemo, useRef, useState } from "react";

const CmsAboveMenu = ({ link, route }) => {
  const params = useParams();
  const getInformation = async () => {
    const data = await CmsInformation(params.slug);
    if (data.status == 200) {
      if (data?.data) {
        setCmsInfo(data?.data);
        console.log("CMSINFROMTIOn", data?.data);
      } else {
        setCmsInfo(null);
        CustomToast("Something went wrong", "top-right");
      }
    }
    // if()
  };
  //   const link = [
  //     { id: 1, label: "Contact Details & Outlets", slug: "contact-details" },
  //     { id: 2, label: "Contact Form", slug: "contact-form" },
  //   ];
  const router = useRouter();

  const [active, setActive] = useState();
  const { setCmsInfo } = useAuthStore((state) => state);

  useEffect(() => {
    if (!params?.slug) return;
    const current = link.find((link) => link.slug === params.slug);
    console.log("current", current);
    if (current) {
      setActive(current.id);
    } else {
      setActive(1);
    }
    if (current && current.id == 1) {
      getInformation();
    } else {
      getInformation();
    }
  }, [params?.slug]);

  const renderedDropdowns = useMemo(
    () => (
      <>
        <select
          className="form-select mt-2"
          value={active}
          onChange={(e) => {
            console.log("EEEEE", e.target.value);
            const current = link.find((link) => link.id == e.target.value);
            console.log("CUrrent", current);
            const newUrl = `/${route}/${current.slug}`;
            router.push(newUrl, { scroll: false, shallow: false });

            // Optional: update URL here or use router.push(...)
          }}
        >
          <option value="">Select</option>
          {link?.length > 0 &&
            link.map((cat) => (
              <option key={cat?.id} value={cat?.id}>
                {cat?.label}
              </option>
            ))}
        </select>
      </>
    ),
    [active]
  );

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

export default CmsAboveMenu;
