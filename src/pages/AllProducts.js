import SummaryApi from "../common";
import AdminProductCart from "../components/AdminProductCart";
import UploadProduct from "../components/UploadProducts";
import { useEffect, useState } from "react";

export default function AllProducts() {
  const [openUploadProduct, setOpenUploadProduct] = useState(false);
  const [allProduct, setallProduct] = useState([]);
  const fetchAllProduct = async () => {
    const fetchResponse = await fetch(SummaryApi.allProduct.url);
    const dataResponse = await fetchResponse.json();
    setallProduct(dataResponse?.data || []);
  };
  useEffect(() => {
    fetchAllProduct();
  }, []);

  return (
    <div>
      <div className="bg-white py-2 px-4 flex justify-between items-center">
        <h2 className="font-bold text-lg">All products</h2>
        <button
          className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all py-2 px-2 rounded-full"
          onClick={() => setOpenUploadProduct(true)}
        >
          Upload Product
        </button>
      </div>

      <div className="flex items-center gap-5 py-4">
        {allProduct.map((product, index) => {
          return (
            <AdminProductCart
              data={product}
              key={`${index}+${product.productName}`}
            />
          );
        })}
      </div>

      {/* Upload Product */}
      {openUploadProduct && (
        <UploadProduct onClose={() => setOpenUploadProduct(false)} />
      )}
    </div>
  );
}
