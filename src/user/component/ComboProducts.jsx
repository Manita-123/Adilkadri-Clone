import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Mousewheel } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import { ArrowLeft, ArrowRight } from "lucide-react";
import ProductCard from "./ProductCard";
import { ComboProducts } from "../data";

export default function ComboProduct({ items = ComboProducts, title = "" }) {
  const swiperRef = useRef(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);



  const onSwiperInit = (swiper) => {
    swiperRef.current = swiper;
    setCanPrev(!swiper.isBeginning);
    setCanNext(!swiper.isEnd);
  };

  const onSlideChange = (swiper) => {
    setCanPrev(!swiper.isBeginning);
    setCanNext(!swiper.isEnd);
  };

  const goPrev = () => swiperRef.current?.slidePrev();
  const goNext = () => swiperRef.current?.slideNext();

  return (
    <section className="py-6 pl-8 mb-9 transition-colors products duration-300">
      <div className="w-full bg-white p-5 rounded-3xl">
        <div className="flex justify-between items-center mb-7">
          {title && <h1 className="text-4xl text-amber-950">{title}</h1>}

          <div className="flex gap-3">
            <button
              type="button"
              onClick={goPrev}
              disabled={!canPrev}
              aria-label="Previous"
              className={`p-2 rounded-full border bg-white hover:bg-Amber-800 focus:ring-2 focus:ring-amber-800 ${
                !canPrev ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <ArrowLeft className="w-6 h-6" />
            </button>

            <button
              type="button"
              onClick={goNext}
              disabled={!canNext}
              aria-label="Next"
              className={`p-2 rounded-full border bg-white hover:bg-Amber-800 focus:ring-2 focus:ring-amber-800 ${
                !canNext ? "opacity-40 cursor-not-allowed" : ""
              }`}
            >
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="mx-auto">
          <Swiper
            modules={[FreeMode, Mousewheel]}
            freeMode={true}
            grabCursor={true}
            slidesPerView={4}
            spaceBetween={25}
            mousewheel={{ forceToAxis: true }}
            preventClicks={false}
            preventClicksPropagation={false} 
            slideToClickedSlide={true}
            breakpoints={{
              350: { slidesPerView: 1},
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
            }}
            onSwiper={onSwiperInit}
            onSlideChange={onSlideChange}
          >
            {items.map((p) => (
              <SwiperSlide key={p.id} className="w-auto" >
                <ProductCard product={p}  />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
