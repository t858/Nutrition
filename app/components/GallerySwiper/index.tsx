"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";

import "./gallery-swiper.css";

export default function GallerySwiper() {
  return (
    <div className="containers">
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          modifier: 1,
          depth: 100,
        }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        modules={[EffectCoverflow, Navigation]}
        className="swiper_container"
      >
        {[
          "https://images.unsplash.com/photo-1566679056462-2075774c8c07?q=80&w=2675&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1494806812796-244fe51b774d?q=80&w=2667&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1670414701148-16ac8873a150?q=80&w=2648&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1590041794748-2d8eb73a571c?q=80&w=2856&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?q=80&w=2748&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1443632864897-14973fa006cf?q=80&w=2670&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?q=80&w=2670&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1446488547543-78c11468449a?q=80&w=2669&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1463693396721-8ca0cfa2b3b5?q=80&w=2670&auto=format&fit=crop",
        ].map((src, i) => (
          <SwiperSlide key={i}>
            <img src={src} alt={`Gallery image ${i + 1}`} />
          </SwiperSlide>
        ))}

        <div className="slider-controler">
          <div className="swiper-button-prev slider-arrow"></div>
          <div className="swiper-button-next slider-arrow"></div>
          <div className="swiper-pagination"></div>
        </div>
      </Swiper>
    </div>
  );
}
