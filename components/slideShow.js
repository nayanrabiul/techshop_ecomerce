import Image from "next/image";
import React from "react";
import { Fade } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

const Slideshow = ({ images }) => {
  return (
    <div >
      
      <Fade className="mx-8">
        {images.map((img, index) => (

            <div className="flex flex-row items-center justify-center" key={index}>
              <Image
                src={`https://techshopapi.imnayan.xyz/public/${img}`}
                alt="alt"
                height={200}
                width={1280}
              />
     
            <h2>{img.caption}</h2>
          </div>
        ))}
      </Fade>
    </div>
  );
};

export default Slideshow;
