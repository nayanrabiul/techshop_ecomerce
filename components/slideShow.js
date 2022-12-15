import Image from "next/image";
import React from "react";
import { Fade } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

const Slideshow = ({ images }) => {
  return (
    <div>
      {/* {console.log(images)} */}
      <div className="slide-container">
        <Fade>
          {images.map((img, index) => (
            <div className="each-fade max-w-full"  key={index}>
              <div className="image-container relative">
                <Image
                  src={img}
                  alt="alt"
                 
                  height={500}
                  width={1000}
                />
              </div>
              <h2>{img.caption}</h2>
            </div>
          ))}
        </Fade>
      </div>
    </div>
  );
};

export default Slideshow;