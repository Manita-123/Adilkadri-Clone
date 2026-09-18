import React from 'react'
import TrustImg1 from '../assests/img/trust-image-1.png'
import TrustImg2 from '../assests/img/trust-image-2.png'
import TrustImg3 from '../assests/img/trust-image-3.png'
import TrustImg4 from '../assests/img/trust-image-4.png'
import TrustImg5 from '../assests/img/trust-image-5.png'
import TrustImg6 from '../assests/img/trust-image-6.png'


function Trust() {

    const slides = [
        {src: TrustImg1, desc:"Cruelty Free"},
        {src: TrustImg2, desc:"Premium quality"},
        {src: TrustImg3, desc:"Long Lasting"},
        {src: TrustImg4, desc:"Variety ofFragrances"},
        {src: TrustImg5, desc:"Derma Tested"},
        {src: TrustImg6, desc: "100% Vegan"}
    ]
    
  return (
    <section className="bg-amber-950 text-white py-17">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-3xl mb-9">Why Trust Us?</h2>

      
      <div
          className="grid grid-cols-3 sm:grid-cols-6  justify-center  gap-6"
        >
          {slides.map((s, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-between p-4"
            >
              <div className=" mb-3 flex items-center justify-center">
                <img
                  src={s.src}
                  alt={s.desc}
                  className="w-full h-full object-contain"
                  loading="lazy"
                  onError={(e) =>
                    (e.currentTarget.src =
                      "https://via.placeholder.com/80?text=No+img")
                  }
                />
              </div>

              <p className="text-center text-sm font-medium">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      </section>

  )
}

export default Trust
