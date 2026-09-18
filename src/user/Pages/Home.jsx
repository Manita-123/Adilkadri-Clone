
import HeroCarousel from '../component/HeroCarousel'
import Options from '../component/Options';
import banner1 from "../assests/img/carousel-image-1.png";
import banner2 from "../assests/img/carousel-image-2.png";
import banner3 from "../assests/img/carousel-image-3.png";
import banner4 from "../assests/img/carousel-image-4.png";
import banner5 from "../assests/img/carousel-image-5.jpg";

import banner1Sm from "../assests/img/carousel-image-1-mobile.png"
import banner2Sm from "../assests/img/carousel-image-2-mobile.png"
import banner3Sm from "../assests/img/carousel-image-3-mobile.png"
import banner4Sm from "../assests/img/carousel-image-4-mobile.jpg"
import banner5Sm from "../assests/img/carousel-image-5-mobile.jpg"

import ProductCard from '../component/ProductList';
import Category from '../component/Category';
import Range from '../component/Range';
import Founder from '../component/Founder';
import Trust from '../component/Trust';
import News from '../component/News';
import Launch from '../component/Launch';
import ComboProduct from '../component/ComboProducts';


function Home() {

  const slides = [
    { desktop: banner1, mobile: banner1Sm, alt: "Banner 1" },
    { desktop: banner2, mobile: banner2Sm, alt: "Banner 2" },
    { desktop: banner3, mobile: banner3Sm, alt: "Banner 3" },
    { desktop: banner4, mobile: banner4Sm, alt: "Banner 4" },
    { desktop: banner5, mobile: banner5Sm, alt: "Banner 5" },
  ];

  return (
    <>
      <main className=' bg-pink-50  pb-12'>
        <div className="w-full h-full mt-4 mb-12">
          <HeroCarousel slides={slides} />
        </div>
        <Options />
        <ProductCard title="" />
        <Category />
        <ProductCard title=" Explore Our Best Seller" />
        <Launch />
        <ComboProduct title="Combo Products"/>
        <Range />
        <Founder />
        <Trust />

        <News />
      </main>

      
    </>
  )
}

export default Home
