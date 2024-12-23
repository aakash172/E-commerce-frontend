import { useState, useEffect } from "react";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";

import image1 from "../assest/banner/img1.webp";
import image2 from "../assest/banner/img2.webp";
import image3 from "../assest/banner/img3.jpg";
import image4 from "../assest/banner/img4.jpg";
import image5 from "../assest/banner/img5.webp";

import image1Mobile from "../assest/banner/img1_mobile.jpg";
import image2Mobile from "../assest/banner/img2_mobile.webp";
import image3Mobile from "../assest/banner/img3_mobile.jpg";
import image4Mobile from "../assest/banner/img4_mobile.jpg";
import image5Mobile from "../assest/banner/img5_mobile.png";

const BannerProduct = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % desktopImages.length);
  };
  const previousImage = () => {
    setCurrentImage(
      (prev) => (prev - 1 + desktopImages.length) % desktopImages.length
    );
  };
  const desktopImages = [image1, image2, image3, image4, image5];
  const mobileImages = [
    image1Mobile,
    image2Mobile,
    image3Mobile,
    image4Mobile,
    image5Mobile,
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      nextImage();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentImage]);

  return (
    <div className="container mx-auto px-4 rounded ">
      <div className="h-56 md:h-72 w-full bg-slate-200 relative">
        <div className="absolute z-10 h-full w-full md:flex items-center hidden">
          <div className="flex justify-between w-full text-2xl">
            <button
              onClick={previousImage}
              className="bg-white shadow-md rounded-full p-2"
            >
              <FaAngleLeft />
            </button>
            <button
              onClick={nextImage}
              className="bg-white shadow-md rounded-full p-2"
            >
              <FaAngleRight />
            </button>
          </div>
        </div>
        {/* Desktop and tablet Version */}
        <div className="hidden md:flex h-full w-full overflow-hidden">
          {desktopImages.map((imageURL, index) => {
            return (
              <div
                className="w-full h-full min-w-full min-h-full transition-all"
                key={imageURL}
                style={{ transform: `translateX(-${currentImage * 100}%)` }}
              >
                <img src={imageURL} className="w-full h-full " />
              </div>
            );
          })}
        </div>

        {/* Mobile Version */}
        <div className="flex h-full w-full overflow-hidden md:hidden">
          {mobileImages.map((imageURL, index) => {
            return (
              <div
                className="w-full h-full min-w-full min-h-full transition-all"
                key={imageURL}
                style={{ transform: `translateX(-${currentImage * 100}%)` }}
              >
                <img src={imageURL} className="w-full h-full object-cover" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default BannerProduct;
