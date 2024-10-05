import { useState } from "react";
import { MdEdit } from "react-icons/md";
import AdminEditProduct from "./AdminEditProduct";
const AdminProductCart = ({ data }) => {
  const [editProduct, setEditProduct] = useState(false);
  return (
    <div className="bg-white p-4 rounded">
      <img src={data?.productImage[0]} width={120} height={120}></img>
      <h1>{data.productName}</h1>
      <div
        className="w-fit ml-auto p-2 cursor-pointer bg-green-500 rounded-full hover:text-white hover:bg-green-600"
        onClick={() => setEditProduct(true)}
      >
        <MdEdit />
      </div>
      {editProduct && (
        <AdminEditProduct
          productData={data}
          onClose={() => setEditProduct(false)}
        />
      )}
    </div>
  );
};
export default AdminProductCart;
