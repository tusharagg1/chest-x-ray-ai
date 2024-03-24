// cite https://www.youtube.com/watch?v=QpsGo8kZiTo&ab_channel=CodeComplete
import Image from 'next/image';
import React, { useState } from 'react';
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from 'react-icons/bs';


export const Carousel = ({ data }) => {
  const [slide, setSlide] = useState(0);
  const nextSlide = () => {
    setSlide(slide === data.length - 1 ? 0 : slide + 1);
  };

  const prevSlide = () => {
    setSlide(slide === 0 ? data.length - 1 : slide - 1);
  };

  return (
    <div className='relative flex justify-center' style={{alignItems: 'center', width:'80%', height:'100%'}}>
      <BsArrowLeftCircleFill onClick={prevSlide} className='absolute' style={{filter: 'drop-shadow(0px 0px 5px #555)', width: '2rem', height: '2rem', color: 'white', left:'1rem'}} />
      {data.map((item, idx) => {
        return (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.src}
            alt={item.alt}
            key={idx}
            style={slide === idx ? {borderRadius: '0.5rem', width:'100%', height:'100%'} : {display: 'none'}}
          />
        );
      })}
      <BsArrowRightCircleFill
        onClick={nextSlide}
        className='absolute'
        style={{filter: 'drop-shadow(0px 0px 5px #555)', width: '2rem', height: '2rem', color: 'white', right:'1rem'}}
      />
      <span className='flex absolute'>
        {data.map((_, idx) => {
          return (
            <button
              key={idx}
              style={
                slide === idx ? {backgroundColor: 'white', height: '0.5rem', width: '0.5rem', borderRadius: '100%', border: 'none', outline: 'none', boxShadow: '0px 0px 5px #555', margin: '0 0.2rem', cursor: 'pointer'} : {backgroundColor: 'grey', height: '0.5rem', width: '0.5rem', borderRadius: '100%', border: 'none', outline: 'none', boxShadow: '0px 0px 5px #555', margin: '0 0.2rem', cursor: 'pointer'}
              }
              onClick={() => setSlide(idx)}
            ></button>
          );
        })}
      </span>
    </div>
  );
};
