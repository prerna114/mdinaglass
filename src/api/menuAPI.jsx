export const getMenuCategories = async () => {
  console.log("Get Catrogires is clling");
  const myHeaders = new Headers();
  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  try {
    const res = await fetch(
      "https://mdinaglasses.blackbullsolution.com/api/menu-categories",
      requestOptions
    );
    const data = await res.json(); // ✅ this is what you need

    console.log("data", data[0]?.children);
    setCategoriesData(data[0]?.children);
    localStorage.setItem("cart", JSON.stringify(data[0]?.children));

    if (data[0]?.children) {
      setShowMenu(true);
    }
  } catch (error) {
    console.log("eror", error);
  }
};
