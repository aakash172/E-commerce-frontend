import { useParams } from "react-router-dom";

const CategoryProduct = () => {
  const params = useParams();
  //{params?.CategoryName}

  return (
    <div className="container mx-auto p-4">
      {/* Desktop Version */}
      <div className="hidden lg:grid grid-cols-[200px,1fr]">
        {/* Left Side */}
        <div className="bg-white p-2 min-h-[calc(100vh-120px)]">
          <div>
            <h3 className="text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-500">
              Sort By
            </h3>
            <form className="text-sm flex flex-col gap-2 py-2">
              <div className="flex items-center gap-3">
                <input type="radio" name="sortBy" />
                <label>Price: Low to High</label>
              </div>
              <div className="flex items-center gap-3">
                <input type="radio" name="sortBy" />
                <label>Price: High to Low</label>
              </div>
            </form>
          </div>
        </div>
        {/* Right Side */}
        <div>Display product</div>
      </div>
    </div>
  );
};

export default CategoryProduct;
