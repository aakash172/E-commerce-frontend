import { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SummaryApi from "../common";
import { FaStar, FaStarHalf } from "react-icons/fa";
import DisplayCurrencyINR from "../helpers/displayCurrency";
import CategoryWiseProductDisplay from "../components/CategoryWiseProductDisplay";
import addToCart from "../helpers/addToCart";
import Context from "../context";
const ProductDetails = () => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: "",
  });
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState("");
  const [zoomImageCoordinate, setZoomImageCoordinate] = useState({
    x: 0,
    y: 0,
  });
  const [zoomImage, setZoomImage] = useState(false);
  const params = useParams();
  const { fetchUserAddToCart } = useContext(Context);
  const navigate = useNavigate();

  const productImageListLoading = new Array(4).fill(null);

  const fetchProductDetails = async () => {
    setLoading(true);
    const response = await fetch(SummaryApi.productDetails.url, {
      method: SummaryApi.productDetails.method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        productId: params?.id,
      }),
    });
    setLoading(false);
    const dataResponse = await response.json();

    setData(dataResponse?.data);
    setActiveImage(dataResponse?.data?.productImage[0]);
  };
  useEffect(() => {
    fetchProductDetails();
  }, [params]);

  const handleMouseEnterProduct = (imagURL) => {
    setActiveImage(imagURL);
  };
  const handleZoomImage = useCallback(
    (e) => {
      setZoomImage(true);
      const { left, top, width, height } = e.target.getBoundingClientRect();

      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;

      setZoomImageCoordinate({
        x,
        y,
      });
    },
    [zoomImageCoordinate]
  );
  const handleLeaveImageZoom = () => {
    setZoomImage(false);
  };

  const handleAddtoCart = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddToCart();
  };
  const handleBuy = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddToCart();
    navigate("/cart");
  };
  return (
    <div className="container mx-auto p-4">
      <div className="min-h-[200px] flex flex-col lg:flex-row gap-4">
        {/* Product Image */}
        <div className="h-96 flex flex-col lg:flex-row-reverse gap-4">
          <div className="h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200 relative p-2">
            <img
              src={activeImage}
              className="h-full w-full object-scale-down mix-blend-multiply"
              onMouseMove={handleZoomImage}
              onMouseLeave={handleLeaveImageZoom}
            />
            {/* Product Zoom on hover */}

            {zoomImage && (
              <div className="hidden lg:block absolute w-full h-full min-w-[500px] min-h-[400px] bg-slate-200 p-1 -right-[510px] top-0 overflow-hidden">
                <div
                  className="w-full h-full min-h-[400px] min-w-[500px] mix-blend-multiply scale-150"
                  style={{
                    backgroundImage: `url(${activeImage})`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: `${zoomImageCoordinate.x * 100}% ${
                      zoomImageCoordinate.y * 100
                    }%`,
                  }}
                ></div>
              </div>
            )}
          </div>
          <div className="h-full">
            {loading ? (
              <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full">
                {productImageListLoading.map((el, index) => {
                  return (
                    <div className="h-20 w-20 bg-slate-200 rounded animate-pulse"></div>
                  );
                })}
              </div>
            ) : (
              <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full">
                {data?.productImage.map((imgURL, index) => {
                  return (
                    <div
                      className="h-20 w-20 bg-slate-200 rounded p-1"
                      key={imgURL}
                    >
                      <img
                        src={imgURL}
                        className="h-full w-full object-scale-down mix-blend-multiply cursor-pointer"
                        onMouseEnter={() => handleMouseEnterProduct(imgURL)}
                        onClick={() => handleMouseEnterProduct(imgURL)}
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
        {/* Product Details */}
        {loading ? (
          <div className="grid gap-1 w-full">
            <p className="bg-slate-200 animate-pulse h-6 rounded w-full inline-block"></p>
            <h2 className="text-2xl lg:text-4xl font-medium h-6 bg-slate-200 animate-pulse rounded  w-full lg:h-8"></h2>
            <p className="capitalize text-slate-400 bg-slate-200 min-w-[100px] animate-pulse h-6 rounded w-full lg:h-8"></p>
            <div className="text-red-600 flex items-center gap-1 bg-slate-200 h-6 animate-pulse rounded w-full lg:h-8"></div>
            <div className="flex items-center gap-2 text-2xl lg:text-3xl py-1 font-medium my-1 h-6 animate-pulse w-full lg:h-8">
              <p className="text-red-600 bg-slate-200 w-full lg:h-8"></p>
              <p className="text-slate-500 line-through bg-slate-200 w-full lg:h-8"></p>
            </div>
            <div className="flex items-center gap-3 my-2 w-full lg:h-8">
              <button className="h-6 bg-slate-200 rounded animate-pulse w-full lg:h-8"></button>
              <button className="h-6 bg-slate-200 rounded animate-pulse w-full lg:h-8"></button>
            </div>

            <div>
              <p className="text-slate-600 font-medium my-1 h-6 bg-slate-200 rounded animate-pulse w-full lg:h-8"></p>
              <p className="text-slate-600 font-medium my-1 h-10 bg-slate-200 rounded animate-pulse w-full lg:h-16"></p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-1">
            <p className="bg-yellow-400 text-red-600 px-2 rounded-md inline-block w-fit">
              {data?.brandName}
            </p>
            <h2 className="text-2xl lg:text-4xl font-medium">
              {data?.productName}
            </h2>
            <p className="capitalize text-slate-400">{data?.category}</p>
            <div className="text-red-600 flex items-center gap-1">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStarHalf />
            </div>
            <div className="flex items-center gap-2 text-2xl lg:text-3xl py-1 font-medium my-1">
              <p className="text-red-600">
                {DisplayCurrencyINR(data?.sellingPrice)}
              </p>
              <p className="text-slate-500 line-through">
                {DisplayCurrencyINR(data?.price)}
              </p>
            </div>
            <div className="flex items-center gap-3 my-2">
              <button
                className="border-2 border-red-600 rounded px-3 py-1 min-w-[100px] text-red-600 font-medium hover:bg-red-600 hover:text-white"
                onClick={(e) => handleBuy(e, data?._id)}
              >
                Buy Now
              </button>
              <button
                className="border-2 border-red-600 rounded px-3 py-1 min-w-[100px] font-medium text-white bg-red-600 hover:text-red-600 hover:bg-white"
                onClick={(e) => handleAddtoCart(e, data?._id)}
              >
                Add to Cart
              </button>
            </div>

            <div>
              <p className="text-slate-600 font-medium my-1">Description :</p>
              <p>{data?.description}</p>
            </div>
          </div>
        )}
      </div>
      {data.category && (
        <CategoryWiseProductDisplay
          category={data?.category}
          heading={"Recommended Product"}
        />
      )}
    </div>
  );
};
export default ProductDetails;
