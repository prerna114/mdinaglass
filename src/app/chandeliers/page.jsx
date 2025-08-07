import dynamic from 'next/dynamic';
import React from 'react'
const SideMenu = dynamic(() => import("@/components/SideMenu"), {
  ssr: true,
  loading: () => <span className="visually-hidden">Loading...</span>,
});
const page = () => {
  return (
    <div>
  <div className="container">
          <div className="category-sidebar">
            <div className="category-bg">
              <div className="row  min-vh-100">
                {/* Category Sidebar */}
                <div className="col-lg-3 col-md-12  p-0">
                  <SideMenu />
                  {/* <CategorySidebar cateogryId={params?.productId} /> */}
                </div>
                {/* Product Listing */}

                <div className='col-md-9 col-12'>
                   
                   <div className='product-content-wrapper'>
                       <h2>Chandeliers</h2>
                       <p><b>Handmade, unique, inspirational... our new line of chandeliers made in various sizes and in the colours you want.</b></p>
                       <p>Mdina Glass has been developing a wide range of innovative lighting solutions for the past few years. The range includes hanging barrel and pot lights, lampshades and ball lights. These can all be viewed here.</p>
                       <p>Now the range has diversified further to include amazing, eye-catching and inspiring chandeliers. Each one, unique in it’s own right.</p>
                       <p>Our first chandelier was created in 2012 and became what is now known as ‘The Swirl’, a vibrant creation conveying movement and life.</p>
                        <p>‘The Swirl’ was inspired by previous installations based on long, individual glass swirls, such as a garden water fountain. It seemed to go perfectly with the concept of a centrepiece chandelier.</p>
                      <p>Over the next year our product designer, Olivia Said, and the team of skilled glassmakers, researched and experimented with other possible techniques and shapes so that the range of handmade, glass chandeliers could diversify and give clients a greater range of options.</p>
                     <p>To date we have four models of chandeliers available. These are:</p>
 
                   

                   <div className='row'>

                    <div className='col-md-12'>

                      <div className='product-wrapper'>
                        <img src="/assets/chandeliers.png"/>

                      </div>

<p>Each of our four chandelier models are handmade and created to order. Various sizes are available and clients can choose the colour combinations they want and that will compliment the piece’s final destination. The glass components are finished in clear and frosted glass.</p>
<p>Our chandeliers are ideal for various types of environments such as homes, hotels, restaurants and office building lobbies.</p>
<p>Of course, our product designer is always on hand to consult directly with our clients or with the client’s interior designer.</p>
<p>For more information about our chandeliers, contact us now and we will be all too pleased to assist.</p>
                   </div>
                    </div>

                   </div>
                 


                </div>
              
              </div>
            </div>
          </div>
        </div>



    </div>
  )
}

export default page