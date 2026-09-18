import React from 'react'
import  NewsImg1 from "../assests/img/News1.png";
import  NewsImg2 from "../assests/img/News2.png";
import  NewsImg3 from "../assests/img/New3.png";
import  NewsImg4 from "../assests/img/New4.png";

function News() {
    const data=[NewsImg1, NewsImg2,NewsImg3,NewsImg4];
  return (
    <div className='mt-8'>
    <h2 className="text-center text-3xl my-9">In the News</h2>
    <div className='grid grid-cols-4 my-7 md:mx-24 gap-5' >
        
      {data.map((d,i)=> (
        <img key={i} src={d} alt={i} />
      ))}
    </div>
    </div>
  )
}

export default News
