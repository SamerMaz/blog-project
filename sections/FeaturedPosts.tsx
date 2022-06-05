import React, { useEffect, useState } from 'react'
import Carousel from 'react-multi-carousel'
import { getFeaturedPosts } from '../services'
import 'react-multi-carousel/lib/styles.css';

import { FeaturedPostCard } from '../components';

const responsive ={
  superLargeDesktop: {
    breakpoint: { max:4000, min:1024},
    items:5
  },
  desktop:{
    breakpoint: {max:1024, min: 768},
    items:3
  },
  tablet: {
    breakpoint: { max: 768, min: 640 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 640, min: 0 },
    items: 1,
  },
}


interface IFeaturedPost {
  post: string[]
}

const FeaturedPosts:React.FC = () => {
  const [featuredPosts, setFeaturedPosts] = useState<IFeaturedPost[] | null>(null)
  const [dataLoaded, setDataLoaded] = useState(false)
  
  useEffect(()=>{
    // const ac = new AbortController();
//TODO  fix, cancel all subscriptions and asynchronous tasks in the componentWillUnmount method.
      // getFeaturedPosts({signal: ac.signal}).then((result:any)=>{
      //   setFeaturedPosts(result);
      //   setDataLoaded(true);
      // })
    getFeaturedPosts().then((result:any)=>{
      setFeaturedPosts(result);
      setDataLoaded(true);
    })
    // return () => {
    //   if(cancelSubsription){
    //     setDataLoaded(true)
    //   }
    // };
// return ()=>ac.abort();

  }, [])
  
  const ArrowFix = (arrowProps:any) => { const {carouselState, children, ...restArrowProps} = arrowProps; return ( <span {...restArrowProps}> {children} </span> ); };

  const customLeftArrow = (
    <ArrowFix>
    <div className='absolute arrow-btn right-0 text-center py-3 cursor-pointer bg-blue-800 rounded-full'>
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 text-white w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
      </svg>
    </div>
    </ArrowFix>
  );

  const customRightArrow = (
    <ArrowFix>
    <div className="absolute arrow-btn right-0 text-center py-3 cursor-pointer bg-blue-800 rounded-full">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 text-white w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
      </svg>
    </div>
    </ArrowFix>
  );

  
  return (
    <div className='mb-8'>
      <Carousel  infinite customLeftArrow={customLeftArrow} customRightArrow={customRightArrow} responsive={responsive} itemClass='px-4'>
        {dataLoaded && featuredPosts?.map((post, index) => (
          <FeaturedPostCard key={index} post={post}/>
        ))}
      </Carousel>
    </div>
  )
}

export default FeaturedPosts