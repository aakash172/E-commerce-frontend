import { MdClose } from "react-icons/md";
import { useState } from "react";
import productCategory from "../helpers/productCategory";
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from "../helpers/uploadImage";
import DisplayImage from "./DisplayImage";
import { MdDelete } from "react-icons/md";
import SummaryApi from "../common";
import { toast } from "react-toastify";

const AdminEditProduct = ({ onClose, productData }) => {
  const [data, setData] = useState({
    productName: productData?.productName,
    brandName: productData?.brandName,
    category: productData?.category,
    productImage: productData?.productImage || [],
    description: productData?.description,
    price: productData?.price,
    sellingPrice: productData?.sellingPrice,
  });
  const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
  const [FullScreenImage, setFullScreenImage] = useState("");
  const handlleUploadProduct = async (e) => {
    const file = e.target.files[0];
    const uploadImageCloudinary = await uploadImage(file);
    setData((prev) => {
      return {
        ...prev,
        productImage: [...prev.productImage, uploadImageCloudinary.url],
      };
    });
  };
  const handleDeleteProductImage = (index) => {
    setData((prev) => {
      return {
        ...prev,
        productImage: prev.productImage.filter((_, i) => i !== index),
      };
    });
  };
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const fetchResponse = await fetch(SummaryApi.updateProduct.url, {
      method: SummaryApi.updateProduct.method,
      body: JSON.stringify(data),
      credentials: "include",
      headers: { "content-type": "application/json" },
    });
    const responseData = await fetchResponse.json();
    if (responseData.success) {
      toast.success(responseData?.message);
      onClose();
    } else {
      toast.error(responseData?.message);
    }
  };

  return (
    <div className="fixed w-full h-full bg-slate-200 bg-opacity-35 top-0 left-0 right-0 bottom-0 flex justify-center items-center">
      <div className="bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden">
        <div className="flex justify-between items-center pb-3">
          <h2 className="font-bold text-lg">Edit Product</h2>
          <div
            className="w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer"
            onClick={onClose}
          >
            <MdClose />
          </div>
        </div>

        <form
          className="grid p-4 gap-2 overflow-y-scroll h-full pb-5"
          onSubmit={handleSubmit}
        >
          <label htmlFor="productName">Product Name :</label>
          <input
            type="text"
            id="productName"
            name="productName"
            placeholder="Enter Product name"
            value={data.productName}
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
            required
          ></input>
          <label htmlFor="brandName" className="mt-3">
            Brand Name :
          </label>
          <input
            type="text"
            id="brandName"
            name="brandName"
            placeholder="Enter Brand name"
            value={data.brandName}
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
            required
          ></input>
          <label htmlFor="category" className="mt-3">
            Category :
          </label>

          <select
            value={data.category}
            className="p-2 bg-slate-100 border rounded"
            name="category"
            onChange={handleOnChange}
            required
          >
            <option value={""}>Select Category</option>
            {productCategory.map((el, index) => (
              <option value={el.value} key={el.value + { index }}>
                {el.label}
              </option>
            ))}
          </select>
          <label htmlFor="productImage" className="mt-3">
            Product Image :
          </label>
          <label htmlFor="uploadImageInput">
            <div className="p-2 cursor-pointer bg-slate-100  border rounded h-32 w-full flex justify-center items-center">
              <div className="text-slate-500 flex justify-center items-center flex-col gap-2">
                <span className="text-xl">
                  <FaCloudUploadAlt />
                </span>
                <p className="text-sm">Upload Product Image</p>
                <input
                  type="file"
                  id="uploadImageInput"
                  className="hidden"
                  onChange={handlleUploadProduct}
                />
              </div>
            </div>
          </label>
          <div>
            {data?.productImage[0] ? (
              <div className="flex items-center gap-2">
                {data.productImage.map((el, index) => {
                  return (
                    <div className="relative group">
                      <img
                        key={`el+${el + 1}`}
                        src={el}
                        width={80}
                        height={80}
                        className="bg-slate-100 border cursor-pointer"
                        onClick={() => {
                          setOpenFullScreenImage(true);
                          setFullScreenImage(el);
                        }}
                        alt="Product Image"
                      />
                      <div
                        className="absolute bottom-0 text-lg right-0 p-1 text-white bg-black rounded-full hidden group-hover:block cursor-pointer"
                        onClick={() => handleDeleteProductImage(index)}
                      >
                        <MdDelete />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-red-600 text-xs">
                *Please Upload Image Of product
              </p>
            )}
          </div>
          <label htmlFor="price" className="mt-3">
            Price:
          </label>
          <input
            type="number"
            id="price"
            name="price"
            required
            placeholder="Enter Price for your Product"
            value={data.price}
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
          ></input>
          <label htmlFor="sellingPrice" className="mt-3">
            Selling Price:
          </label>
          <input
            type="number"
            id="sellingPrice"
            name="sellingPrice"
            placeholder="Enter Selling Price for your Product"
            value={data.sellingPrice}
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
            required
          ></input>
          <label htmlFor="description" className="mt-3">
            Description:
          </label>
          <textarea
            className="h-28 bg-slate-100 border resize-none p-1"
            onChange={handleOnChange}
            name="description"
            rows={3}
            required
            value={data?.description}
          ></textarea>
          <button className="px-2 py-2 bg-red-600 text-white hover:bg-red-700">
            Save Product
          </button>
        </form>
      </div>
      {/* {Display FULL SCREEN IMAGE} */}
      {openFullScreenImage && (
        <DisplayImage
          onClose={() => setOpenFullScreenImage(false)}
          imgUrl={FullScreenImage}
        />
      )}
    </div>
  );
};
export default AdminEditProduct;
