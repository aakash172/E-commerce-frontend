import { useState } from "react";
import { MdEdit } from "react-icons/md";
import AdminEditProduct from "./AdminEditProduct";
import DisplayCurrencyINR from "../helpers/displayCurrency";
const AdminProductCart = ({ data, fetchAllProduct }) => {
  const [editProduct, setEditProduct] = useState(false);
  return (
    <div className="bg-white p-4 rounded">
      <div className="w-40">
        <div className="w-32 h-32 flex justify-center items-center">
          <img
            src={data?.productImage[0]}
            width={120}
            height={120}
            className="mx-auto object-fill h-full"
          ></img>
        </div>
        <h1 className="text-ellipsis line-clamp-2">{data.productName}</h1>
        <div>
          <p className="font-semibold">
            {DisplayCurrencyINR(data.sellingPrice)}
          </p>

          <div
            className="w-fit ml-auto p-2 cursor-pointer bg-green-500 rounded-full hover:text-white hover:bg-green-600"
            onClick={() => setEditProduct(true)}
          >
            <MdEdit />
          </div>
        </div>
      </div>
      {editProduct && (
        <AdminEditProduct
          productData={data}
          onClose={() => setEditProduct(false)}
          fetchAllProduct={fetchAllProduct}
        />
      )}
    </div>
  );
};
export default AdminProductCart;
