import React from 'react'
import FounderImg from '../assests/img/founder.png'

function Founder() {
    return (
        <div className="container mx-0 my-16  md:my-22">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center justify-center">
                {/* Text: on small screens appears after the image (order-last), on md+ appears first */}
                <div className="col-span-12 md:col-span-6 pl-8 order-last md:order-first mx-2">
                    <h1 className="text-4xl text-amber-950 mb-9 ">Meet the Founder</h1>

                    <p className=" mb-7 sm:text-xl  ">
                        Adil Qadri, the visionary Founder &amp; CEO of "Adil Qadri," has carved a niche for himself in the premium perfume industry, building a brand synonymous with luxury and sophistication. His collection is celebrated for its exceptional quality and high-end scents, each meticulously crafted to deliver a memorable olfactory experience. With a deep commitment to excellence, Adil has transformed traditional perfumery by integrating modern sensibilities, ensuring that his fragrances resonate with today’s discerning consumers.
                    </p>

                    <p className="sm:text-xl">
                        Understanding the evolving preferences of his loyal clientele, Adil Qadri has introduced a distinctive range of attars designed to seamlessly complement contemporary lifestyles. Each fragrance captures the essence of elegance, offering a variety of scents suitable for both formal and casual occasions. By marrying tradition with innovation, Adil Qadri has redefined the art of luxury perfumery, creating an experience that elevates everyday moments into something truly extraordinary.
                    </p>
                </div>

                {/* Image: on small screens appears first (order-first), on md+ appears second */}
                <div className="col-span-12 sm:col-span-5 order-first md:order-last flex justify-center items-center mx-2">
                    <img
                        src={FounderImg}
                        alt="Founder Adil Qadri"
                        className="w-full h-full object-cover rounded-md"
                        loading="lazy"
                    />
                </div>
            </div>
        </div>
    )
}

export default Founder
