import { useState, useEffect, useRef } from "react"
import { curses } from "../../api/db"
import { useParams } from "react-router-dom"

import { Swiper, SwiperSlide } from 'swiper/react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

import { Thumbs } from 'swiper/modules';

import Video from "../../components/Video/Video"

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';

import '../../components/Video/stylesVideo.css';


const Topic = () => {

  const [courseObj, setCourseObj] = useState({})
  const [infoSwiper, setInfoSwiper] = useState([])
  const [noLoop, setNoLoop] = useState(false)
  const swiperRef = useRef();
  const swiperRef2 = useRef();
  const [classSwiper, setClassSwiper] = useState('')
  const [isFirstSlide, setIsFirstSlide] = useState(true);
  const [isLastSlide, setIsLastSlide] = useState(false);

  const { category, course } = useParams()

  useEffect(() => {
    getCuorse()
  }, [])
  
  const getCuorse = () => {
    const course1 = curses.filter(item => item.category === category)
    setCourseObj(course1[0])

    const course2 = course1[0].courseContent.filter(item => item.sectionName === course)
    setInfoSwiper(course2)

    if (course2[0].content.length < 4) {
      setNoLoop(false)
      setClassSwiper('swiper-small')
    } else {
      setNoLoop(true)
      setClassSwiper('swiper-large')
    }

    if (course2[0].content.length === 1) {
      setIsFirstSlide(true)
      setIsLastSlide(true)
    }
  }

  const handleSlideChange = () => {
    const swiper = swiperRef.current;
    if (swiper) {
      setIsFirstSlide(swiper.isBeginning);
      setIsLastSlide(swiper.isEnd);
    }
  };

  return (    
    <>
      {/* <div className='container-slider-desktop mt-8'>

        <div className='big-container-swiper'>
          <Swiper
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper;
            }}
            slidesPerView={1}
            simulateTouch={false}
            loop={noLoop}
            onSlideChange={handleSlideChange}
            className="mySwiper"
          >
            {infoSwiper.map((item, i) => (
              <div key={i}>
                {item.content.map((infoVideo, i) => (
                  <SwiperSlide key={i}>

                    {infoSwiper[0] && (
                      <h2 className="mb-5 text-3xl font-bold">{infoSwiper[0].sectionName} - { courseObj.courseName }</h2>  
                    )}

                    <Video src={ infoVideo.video } />
                    
                    <h2 className="my-2 text-2xl font-bold">{ infoVideo.title }</h2>
                  
                    <p className="mb-3"><span className="my-3 text-xl font-bold ">Instructor:</span> { courseObj.instructor }</p>

                    <ul className="grid grid-cols-5 gap-3">
                      {infoVideo.tags.map((tag, i) => (
                        <div key={i} className="bg-black text-white text-sm font-medium px-2.5 py-1 rounded-full flex justify-center w-full">
                          <li key={i} className="w-full text-center">
                            { tag }
                          </li>
                        </div>
                      ))}
                    </ul>
                    
                  </SwiperSlide>
                ))}

              </div>
            ))}
          </Swiper>
        </div>

        <div className='container-swiper-desktop'>
          <div>
            <button 
              className={isFirstSlide && noLoop === false ? 'button-disabled' : 'button-custom-slide'} 
              onClick={() => {
                
                  swiperRef2.current?.slidePrev();
                  swiperRef.current?.slidePrev();
                
              }}
              disabled={(isFirstSlide && noLoop === false) ? true : false}
              ><FontAwesomeIcon icon={faChevronUp} /></button>
          </div>

          <Swiper
            onBeforeInit={(swiper) => {
              swiperRef2.current = swiper;
            }}
            simulateTouch={false}
            centeredSlides={true}
            centeredSlidesBounds={noLoop}
            slidesPerView={noLoop ? 3 : 1}
            spaceBetween={10}
            direction={'vertical'}
            loop={noLoop}
            className={ `${classSwiper}` }
          >
          
            {infoSwiper.map((item, i) => (
              <div key={i}>
                {item.content.map((img, j) => (
                  <SwiperSlide key={j}>
                    {({ isActive }) => (
                      <div className={`relative ${isActive ? "scale-105 transition-all duration-500" : ""}`}>
                        <div className={`absolute inset-0 w-full h-full flex justify-center items-center ${isActive ? "bg-black bg-opacity-50 rounded-xl" : ""}`}>
                          {isActive && (
                            <p className="text-white opacity-100 font-bold">{img.title}</p>
                          )}
                        </div>
                        <img src="https://picsum.photos/1920/1080" alt="kitty" />
                      </div>
                    )}
                  </SwiperSlide>
                ))}
              </div>
            ))}
            
          </Swiper>

          <div>
            <button 
              className={isLastSlide && noLoop === false ? 'button-disabled' : 'button-custom-slide'} 
              onClick={() => {
               
                  swiperRef2.current?.slideNext();
                  swiperRef.current?.slideNext();
                
                
              }}

              disabled={(isLastSlide && noLoop === false) ? true : false}
            >
              <FontAwesomeIcon icon={faChevronDown} /></button>
          </div>
        </div>
      </div> */}


      <div className='container-slider mt-8'>

      <div className='big-container-swiper'>
        <Swiper
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
          slidesPerView={1}
          simulateTouch={false}
          loop={noLoop}
          onSlideChange={handleSlideChange}
          className="mySwiper2"
        >
          {infoSwiper.map((item, i) => (
            <div key={i}>
              {item.content.map((infoVideo, i) => (
                <SwiperSlide key={i}>

                  {infoSwiper[0] && (
                    <h2 className="mb-5 text-3xl font-bold">{infoSwiper[0].sectionName} - { courseObj.courseName }</h2>  
                  )}

                  <Video src={ infoVideo.video } />
                  
                  <h2 className="my-2 text-2xl font-bold">{ infoVideo.title }</h2>
                
                  <p className="mb-3"><span className="my-3 text-xl font-bold ">Instructor:</span> { courseObj.instructor }</p>

                  <ul className="grid grid-cols-5 gap-3">
                    {infoVideo.tags.map((tag, i) => (
                      <div key={i} className="bg-black text-white text-sm font-medium px-2.5 py-1 rounded-full flex justify-center w-full">
                        <li key={i} className="w-full text-center">
                          { tag }
                        </li>
                      </div>
                    ))}
                  </ul>
                  
                </SwiperSlide>
              ))}

            </div>
          ))}
        </Swiper>
      </div>

      <div className='container-swiper'>
        <div>
          <button 
            className={isFirstSlide && noLoop === false ? 'button-disabled' : 'button-custom-slide'} 
            onClick={() => {
              
                swiperRef2.current?.slidePrev();
                swiperRef.current?.slidePrev();
              
            }}
            disabled={(isFirstSlide && noLoop === false) ? true : false}
            ><FontAwesomeIcon icon={ faChevronLeft } /></button>
        </div>

        <Swiper
          onBeforeInit={(swiper) => {
            swiperRef2.current = swiper;
          }}
          simulateTouch={false}
          slidesPerView={3}
          centeredSlides={true}
          centeredSlidesBounds={noLoop}
          spaceBetween={10}
          loop={noLoop}
          className={ `mySwiper3` }
        >
        
          {infoSwiper.map((item, i) => (
            <div key={i}>
              {item.content.map((img, j) => (
                <SwiperSlide key={j}>
                  {({ isActive }) => (
                    <div className={`relative ${isActive ? "scale-105 transition-all duration-500" : ""}`}>
                      <div className={`absolute inset-0 w-full h-full flex justify-center items-center ${isActive ? "bg-black bg-opacity-50 rounded-xl" : ""}`}>
                        {isActive && (
                          <p className="text-white opacity-100 font-bold">{img.title}</p>
                        )}
                      </div>
                      <img src="https://picsum.photos/1920/1080" alt="kitty" />
                    </div>
                  )}
                </SwiperSlide>
              ))}
            </div>
          ))}
          
        </Swiper>

        <div>
          <button 
            className={isLastSlide && noLoop === false ? 'button-disabled' : 'button-custom-slide'} 
            onClick={() => {
            
                swiperRef2.current?.slideNext();
                swiperRef.current?.slideNext();
              
              
            }}

            disabled={(isLastSlide && noLoop === false) ? true : false}
          >
            <FontAwesomeIcon icon={ faChevronRight } /></button>
        </div>
      </div>
      </div>

    </>
  
  )
}
export default Topic
