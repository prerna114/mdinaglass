
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ProductDetails from "@/components/ProductDetails";
import ProductShow from "@/components/ProductShow";
import CategorySidebar from "@/components/CategorySidebar";
import MegaMenu from "@/components/Megamenu";

import React from "react";
const page = () => {
  return (
    <>
     <Header />
     <MegaMenu />

      <div  style={{
                 background:"#f1f1f1",
                }}>

                    <div className='header-product bg-white'>
      
      <h1>Jewellery</h1>
     <h5>We offer a selection of affordable contemporary costume jewellery with glass beads.</h5>

    </div>
    <div className="container">
    <div className="category-sidebar">
      <div className="category-bg">
        <div className="row  min-vh-100">
          {/* Category Sidebar */}
          <div className="col-lg-3 col-md-12  p-0">
            <CategorySidebar />
          </div>
          {/* Product Listing */}
          <div className="col-lg-9 col-md-12">
            <div className="container">
           <ProductDetails/>
          
           
         </div>
           <ProductShow/>
        </div>
        </div>
      </div>
    </div>
      </div>
      </div>
   
      <Footer/>
    </>
  )
}

export default page