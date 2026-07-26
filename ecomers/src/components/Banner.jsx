import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import compu from "../assets/compu.webp";
import escritorio from "../assets/escritorio.webp"
import rtx from "../assets/rtx.webp";

import "swiper/css";
import "./Banner.css";


function Banner() {

  const banners = [
    {
      img: compu,
      titulo: "Potencia para tu Setup",
      texto: "Componentes gamer de alto rendimiento"
    },
    {
      img: escritorio,
      titulo: "Arma tu espacio ideal",
      texto: "Todo para tu PC y escritorio"
    },
    {
      img: rtx,
      titulo: "Nueva generación gráfica",
      texto: "Las mejores GPU para gaming"
    }
  ];


  return (

    <Swiper
      className="banner-swiper"

      modules={[Autoplay]}

      autoplay={{
        delay:4000,
        disableOnInteraction:false
      }}

      loop={true}

      speed={900}
    >

      {banners.map((banner,index)=>(

        <SwiperSlide key={index}>

          <div className="banner-slide">

            <img
              src={banner.img}
              alt={banner.titulo}
              loading={index === 0 ? "eager" : "lazy"}
            />


            <div className="banner-overlay">

              <h2>
                {banner.titulo}
              </h2>

              <p>
                {banner.texto}
              </p>

              <button>
                Ver productos
              </button>

            </div>

          </div>


        </SwiperSlide>

      ))}


    </Swiper>

  );
}


export default Banner;