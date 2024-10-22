import { useLocation } from "react-router-dom";
import SummaryApi from "../common";
import { useEffect, useState } from "react";
import VerticalCard from "../components/VerticalCard";

const SearchProduct = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const query = useLocation();
  const fetchProduct = async () => {
    setLoading(true);
    const response = await fetch(SummaryApi.searchProduct.url + query.search, {
      method: SummaryApi.searchProduct.method,
    });
    const dataResponse = await response.json();
    setLoading(false);
    setData(dataResponse.data);
  };
  useEffect(() => {
    fetchProduct();
  }, [query]);
  return (
    <div className="container mx-auto p-4">
      {loading && <p className="text-lg text-center">Loading..........</p>}
      <p className="text-lg font-semibold my-3">
        Search Result : {data?.length}
      </p>
      {data?.length === 0 && !loading && (
        <p className="bg-white text-lg items-center p-4">NO data Found</p>
      )}

      {data?.length !== 0 && !loading && (
        <VerticalCard loading={loading} data={data} />
      )}
    </div>
  );
};
export default SearchProduct;
