import {
  Autoplay, EffectCoverflow, Navigation, Pagination,
} from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Utils } from '@/utils';

const { WavesButton } = Utils;

// TODO store data below to db
const sliderItems = [
  {
    img: '/images/featured/featured_home.jpeg',
    title: 'Shop Now',
    lineOne: 'B-Stock',
    lineTwo: 'Awesome discounts',
    link: '/shop',
    id: 'id23456829',
  },
  {
    img: '/images/featured/featured_home_2.jpeg',
    title: 'Shop Now',
    lineOne: 'Fender',
    lineTwo: 'Stratocasters on sale',
    link: '/shop',
    id: 'id34687105',
  },
  {
    img: '/images/featured/featured_home_3.jpg',
    title: 'Shop Now',
    lineOne: 'Custom',
    lineTwo: 'Shop our custom guitars',
    link: '/shop',
    id: 'id873294923',
  },
];

// TODO change the default styles of slide navigation prop
const Slider = (): JSX.Element => (
  <Swiper
    modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
    loop
    slidesPerGroup={1}
    speed={2000}
    navigation
    effect="coverflow"
    pagination={{
      clickable: true,
    }}
    autoplay={{
      delay: 10000,
      waitForTransition: true,
      disableOnInteraction: false,
    }}
  >
    {
      sliderItems.map((item) => (
        <SwiperSlide key={item.id}>
          <div className="relative mt-[88px] h-full w-full">
            <img
              className="h-screen w-screen object-cover"
              src={item.img}
              alt={item.lineOne}
            />
            <span className="absolute inset-0 bg-gradient-to-l from-black via-transparent to-black opacity-70" />
            <div className="pointer-events-none absolute left-40 top-36 -translate-x-1/2 -translate-y-1/2 md:left-60">
              <h1 className="text-3xl font-bold text-white drop-shadow-lg md:text-5xl">
                {item.lineOne}
              </h1>
              <p className="mt-5 rounded-md bg-gray-500/45 px-3 py-2 text-base font-light uppercase text-white drop-shadow-md backdrop-blur-md md:mt-10 md:text-2xl">
                {item.lineTwo}
              </p>
            </div>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2">
              <WavesButton
                isLinked
                label={item.title}
                link={item.link}
                styled="bg-white cursor-pointer p-2 font-rubik uppercase
                tracking-wider text-3xl font-semibold text-black border-1 border-white rounded-md shadow-lg hover:bg-white/70 transition-all duration-500 ease-in-out"
              />
            </div>
          </div>
        </SwiperSlide>
      ))
      }
  </Swiper>
);

export default Slider;
