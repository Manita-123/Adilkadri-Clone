import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/pagination';
import { Grid, Pagination } from 'swiper/modules';

import s1 from "../assests/img/category-image-1.png"
import s2 from "../assests/img/category-image-2.png"
import s3 from "../assests/img/category-image-3.png"
import s4 from "../assests/img/category-image-4.png"
import s5 from "../assests/img/category-image-5.png"
import s6 from "../assests/img/category-image-6.png"
import s7 from "../assests/img/category-image-7.png"


function Category() {

    const slides = [
        { src: s1, desc: "Attar" },
        { src: s2, desc: "Luxury Attars" },
        { src: s3, desc: "Bakhoor" },
        { src: s4, desc: "Perfumes Spray" },
        { src: s5, desc: "Royal Attar" },
        { src: s6, desc: " Incense" },
        { src: s7, desc: " Body Spray" }
    ];
    return (
        <div className=' bg-white px-12 py-15 '>
            <h1 className='text-Amber-950 text-center text-3xl mb-9'>Shop By Category</h1>
            <Swiper
                modules={[Grid, Pagination]}
                slidesPerView={7}
                grid={{
                    rows: 1,
                }}
                spaceBetween={20}
                pagination={{
                    el: ".custom-swiper-pagination", clickable: true
                }}

                className="category-swiper pb-20"
                breakpoints={{
                    200: {
                        slidesPerView: 3,
                    },
                    640: {
                        slidesPerView: 4,
                    },
                    768: {
                        slidesPerView: 6,
                    },
                    1024: {
                        slidesPerView: 7,
                    },
                }}
            >
                {slides.map((s, i) => {
                    return (
                        <div key={i} className='mx-3'>
                            <SwiperSlide>
                                <img
                                    src={s.src}
                                    alt={`category-${i + 1}`}
                                    className="w-full h-auto object-contain block"
                                    loading="lazy"
                                    onError={(e) => {
                                        e.currentTarget.src = "https://via.placeholder.com/200x120?text=No+image";
                                    }}
                                />

                                <h3 className='text-Amber-950 text-center text-xl my-3'>{s.desc}</h3>
                            </SwiperSlide>
                        </div>
                    )
                })}
            </Swiper>

            <div className="custom-swiper-pagination mt-4 flex justify-center gap-2" />

            <style>
                {`.custom-swiper-pagination {padding-bottom: 2rem}
                  .custom-swiper-pagination .swiper-pagination-bullet {
                    width: 10px;
          height: 10px;
          background: rgba(0,0,0,0.5);
          opacity: 1;
          margin: 0 6px;
          border-radius: 50%;
        }
          .custom-swiper-pagination .swiper-pagination-bullet-active {
          background: #837129;
          transform: scale(1.1);
        }
                 `}
            </style>
        </div>
    )
}

export default Category
