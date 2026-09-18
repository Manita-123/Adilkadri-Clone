import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

export default function HeroCarousel({ slides = [], mobileBreakpoint = 768, autoplayDelay = 3000, }) {
  const [current, setCurrent] = useState(0);
  const swiperRef = useRef(null);

  return (
    <div className="overflow-hidden relative bg-taupe-300 ">
      <Swiper
        modules={[Autoplay]}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={(swiper) => setCurrent(swiper.realIndex)}
        autoplay={{ delay: autoplayDelay, disableOnInteraction: false }}
        loop={true}
        slidesPerView={1}
      >
        {slides.map((s, i) => {
          const desktop = s.desktop || "";
          const mobile = s.mobile || null;
          const alt = s.alt || `slide-${i}`;

          return (
            <SwiperSlide key={i}>
              <picture>
                {mobile && (
                  <source media={`(max-width: ${mobileBreakpoint}px)`} srcSet={mobile} />
                )}
                <img
                  src={desktop}
                  alt={alt}
                  className="w-full h-full object-cover block"
                  loading="lazy"
                />
              </picture>

            </SwiperSlide>
          );
        })}
      </Swiper>

      {/* custom pagination */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3 pointer-events-auto z-20">
        {slides.map((_, i) => {
          const active = i === current;
          return (
            <button
              key={i}
              onClick={() => {
                if (!swiperRef.current) return;
                swiperRef.current.slideToLoop(i); // works with loop mode
                setCurrent(i);
              }}
              aria-label={`Go to slide ${i + 1}`}
              className={`rounded-full transition-all duration-300 focus:outline-none ${active ? "bg-white w-10 h-1" : "bg-gray-400 w-6 h-1"
                }`}
            />
          );
        })}
      </div>
    </div>
  );
}