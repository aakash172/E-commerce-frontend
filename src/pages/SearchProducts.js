import { useLocation } from "react-router-dom";
import SummaryApi from "../common";
import { useEffect, useState } from "react";

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
    setData(response.data);
  };
  useEffect(() => {
    fetchProduct();
  }, [query]);
  return (
    <div className="container mx-auto p-4">
      <p>Search Result:{data.length}</p>
    </div>
  );
};
export default SearchProduct;
