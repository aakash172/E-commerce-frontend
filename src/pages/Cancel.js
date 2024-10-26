import FAILUREIMAGE from "../assest/ERROR.webp";
import { Link } from "react-router-dom";

const Cancel = () => {
  return (
    <div className="bg-slate-200 w-full max-w-md mx-auto m-1 flex justify-center items-center flex-col p-4">
      <img src={FAILUREIMAGE} width={150} height={150} />
      <p className="text-red-500 font-bold text-xl">Payment Canceled</p>
      <Link
        to={"/cart"}
        className="p-2 px-3 mt-5 border-2  border-red-600 rounded  font-semibold text-red-600 hover:bg-red-600 hover:text-white"
      >
        Go to Cart
      </Link>
    </div>
  );
};

export default Cancel;
