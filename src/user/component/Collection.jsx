import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Scrollbar } from "swiper/modules"; // <-- Scrollbar (capital S)
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/scrollbar";


export default function Collection({
  categories = [],
  value = "All",
  onChange = () => {},
  title=""
}) {
  const normalized = Array.from(
    new Set(
      (categories || []).map((c) => String(c || "").trim()).filter(Boolean)
    )
  );
  const tabs = ["All", ...normalized];

  return (
    <div className="collection">
      {title && (
        <h1 className="text-amber-950 text-center text-3xl mb-8">Collection</h1>
      )}

      <div className="mb-6 overflow-auto">
        <Swiper
          modules={[FreeMode, Scrollbar]}
          slidesPerView={4}
          spaceBetween={30}
          scrollbar={{ draggable: true }}
          breakpoints={{
            440: { slidesPerView: 3 },
            768: { slidesPerView: 5 },
            1024: { slidesPerView: 6 },
          }}
          className="pl-4 overflow-x-auto whitespace-nowrap px-4"
        >
          <div>
            {tabs.map((cat) => {
            const isActive =
              String(cat).toLowerCase() === String(value).toLowerCase();
            return (
              <SwiperSlide key={cat} style={{ width: "auto" }}>

                <button
                  onClick={() => onChange(cat)}
                  aria-pressed={isActive}
                  className={`inline-block shrink-0 *:w-full whitespace-nowrap pb-2 mb-6 border-b-2 transition-colors duration-200 focus:outline-none px-2  ${
                    isActive
                      ? "border-yellow-900 text-amber-900 font-medium"
                      : "border-transparent hover:border-yellow-900 text-gray-700"
                  }`}
                >
                  {cat}
                </button>
              </SwiperSlide>
            );
          })}
          </div>
        </Swiper>
      </div>
    </div>
  );
}