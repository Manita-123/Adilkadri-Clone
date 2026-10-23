import React from 'react'
import LunchImg1 from '../assets/img/Launch.png'
import AttarImg2 from '../assets/img/Attar.png'

function Launch() {
  return (
    <div className="container mx-auto  px-8 pt-13 mb-19">
      {/* mobile: 1 column (stacked rows). md and up: 2 columns (single row with two images) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-9 items-center">
        <div className="flex justify-center">
          <img
            src={LunchImg1}
            alt="LaunchImg"
            className="block max-w-full h-auto object-contain"
            loading="lazy"
            decoding="async"
          />
        </div>

        <div className="flex justify-center">
          <img
            src={AttarImg2}
            alt="AttarImg2"
            className="block max-w-full h-auto object-contain"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    </div>
  );
}


export default Launch
