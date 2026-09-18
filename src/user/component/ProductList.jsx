import { Swiper, SwiperSlide } from "swiper/react";
import { useState, useMemo } from "react";
import { FreeMode, Mousewheel } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/free-mode'
import "swiper/css/navigation";
import Collection from "./Collection";
import { useCart } from "../../context/CartContext";


import ProductCard from "./ProductCard";

export default function ProductList({ title = "" }) {

  const { products } = useCart();


  const [category, setCategory] = useState("All");

  // build categories from `items`
  const categories = useMemo(() => {
    const set = new Set();
    products.forEach((p) => {
      const cat = (p.category || "Uncategorized").trim();
      if (cat) set.add(cat);
    });
    return Array.from(set);
  }, [products]);



  const filtered = useMemo(() => {
    if (category === "All") return products || [];
    return products.filter((p) => (p.category || "").trim().toLowerCase() === category.toLowerCase());
  }, [products, category]);

   const shuffledProducts = useMemo(() => {
    return [...filtered].sort(() => Math.random() - 0.5);
  }, [filtered]);
  return (
    <section className={`py-6 pl-8 mb-9 transition-colors duration-300 products ${title ? "bg-amber-950" : "bg-none"}`}>
      <div className=" w-full  mx-auto px-4">

        {title && <h2 className="text-4xl text-white mb-9 ">{title}</h2>}

        {!title && <Collection categories={categories} value={category} onChange={setCategory} title="Collection" />}

        {/* viewport: 300px card + 150px peek (450px total). Use min(100%,450px) for mobile friendliness */}
        <div className="mx-auto" >
          <Swiper
            modules={[FreeMode, Mousewheel]}
            freeMode={true}
            grabCursor={true}
            slidesPerView={"auto"}
            spaceBetween={25}
            mousewheel={{
              forceToAxis: true,
            }}
          >
            {shuffledProducts.map((p) => (
              <SwiperSlide key={p.id} className="w-auto" >
                {/* fixed slide width, prevent shrinking */}
                <ProductCard product={p} />
              </SwiperSlide>
            ))}
          </Swiper>

        </div>


      </div>
    </section>
  );
}

