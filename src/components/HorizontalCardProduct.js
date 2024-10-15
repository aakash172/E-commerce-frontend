import { useEffect, useRef, useState } from "react";
import fetchCategoryWiseProduct from "../helpers/fetchCategoryWiseProduct";
import DisplayCurrencyINR from "../helpers/displayCurrency";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import { Link } from "react-router-dom";
import addToCart from "../helpers/addToCart";

const HorizontalCardProduct = ({ category, heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const loadingList = new Array(13).fill(null);
  const [scroll, setScroll] = useState(0);
  const scrollElement = useRef();

  const fetchData = async () => {
    setLoading(true);
    const categoryProduct = await fetchCategoryWiseProduct(category);
    setLoading(false);
    setData(categoryProduct?.data);
  };

  useEffect(() => {
    fetchData();
  }, []);
  const scrollRight = () => {
    scrollElement.current.scrollLeft += 300;
  };
  const scrollLeft = () => {
    scrollElement.current.scrollLeft -= 300;
  };

  return (
    <div className="container mx-auto px-4 my-6 relative">
      <h2 className="text-2xl font-semibold py-4">{heading}</h2>
      <div
        className="flex items-center gap-4 md:gap-6 overflow-scroll scrollbar-none transition-all"
        ref={scrollElement}
      >
        <button
          className="bg-white shadow-md rounded-full p-2 absolute left-0 text-lg hidden md:block"
          onClick={scrollLeft}
        >
          <FaAngleLeft />
        </button>
        <button
          className="bg-white shadow-md rounded-full p-2 absolute right-0 text-lg hidden md:block"
          onClick={scrollRight}
        >
          <FaAngleRight />
        </button>
        {loading
          ? loadingList.map((product, index) => {
              return (
                <div className="w-full max-w-[280px] md:min-w-[320px]  min-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow flex">
                  <div className="bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px] hover:scale-110 transition-all animate-pulse"></div>
                  <div className="p-4 grid  w-full gap-2">
                    <h2 className="font-md text-base md:text-lg text-ellipsis line-clamp-1 p-1 text-black bg-slate-200 animate-pulse rounded-full"></h2>
                    <p className="capitalize text-slate-500 p-1 bg-slate-200 animate-pulse  rounded-full"></p>
                    <div className="flex gap-3 w-full">
                      <p className="text-green-600 font-medium p-1 bg-slate-200 w-full animate-pulse  rounded-full"></p>
                      <p className="text-slate-500 line-through p-1 bg-slate-200 w-full animate-pulse  rounded-full"></p>
                    </div>
                    <button className="text-sm text-white px-white px-3 py-1 bg-slate-200 rounded-full w-full animate-pulse ">
                      AA
                    </button>
                  </div>
                </div>
              );
            })
          : data.map((product, index) => {
              return (
                <Link
                  to={"/product/" + product?._id}
                  key={product?.productName + index}
                  className="w-full max-w-[280px] md:min-w-[320px]  min-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow flex"
                >
                  <div className="bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px] hover:scale-110 transition-all">
                    <img
                      src={product.productImage[0]}
                      className="object-scale-down h-full"
                    />
                  </div>
                  <div className="p-4 grid">
                    <h2 className="font-md text-base md:text-lg text-ellipsis line-clamp-1 text-black">
                      {product?.productName}
                    </h2>
                    <p className="capitalize text-slate-500 ">
                      {product?.category}
                    </p>
                    <div className="flex gap-3">
                      <p className="text-green-600 font-medium">
                        {DisplayCurrencyINR(product?.sellingPrice)}
                      </p>
                      <p className="text-slate-500 line-through">
                        {DisplayCurrencyINR(product?.price)}
                      </p>
                    </div>
                    <button
                      className="text-sm bg-red-600 hover:bg-red-700 text-white px-white px-3 py-1 rounded-full"
                      onClick={(e) => addToCart(e, product?._id)}
                    >
                      Add TO cart
                    </button>
                  </div>
                </Link>
              );
            })}
      </div>
    </div>
  );
};
export default HorizontalCardProduct;
