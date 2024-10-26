import { useEffect, useState } from "react";
import SummaryApi from "../common";
import moment from "moment";
import DisplayCurrencyINR from "../helpers/displayCurrency";
const OrderPage = () => {
  const [data, setData] = useState([]);

  const fetchOrderDetails = async () => {
    const response = await fetch(SummaryApi.getOrder.url, {
      method: SummaryApi.getOrder.method,
      credentials: "include",
    });
    const responseData = await response.json();
    setData(responseData.data);
  };
  useEffect(() => {
    fetchOrderDetails();
  }, []);
  return (
    <div>
      {!data[0] && <p>No Order availble</p>}

      <div>
        {data.map((item, index) => {
          return (
            <div key={item.userId + index}>
              <p className="font-medium text-lg">
                {moment(item.createdAt).format("LL")}
              </p>
              <div>
                {item?.productDetails.map((product, index1) => {
                  return (
                    <div
                      key={product.productId + index1}
                      className="flex items"
                    >
                      <img
                        src={product.image[0]}
                        className="w-28 h-28 bg-slate-200 object-scale-down p-2"
                      />
                      <div>{product.name}</div>
                      <div className="flex items-center gap-5">
                        <div>{DisplayCurrencyINR(product.price)}</div>
                        <p>Quantity : {product.quantity}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div>
                <div>Payment Details:</div>
                <p>
                  Payment method : {item.paymentDetails.payment_method_types[0]}
                </p>
                <p>Payment status : {item.paymentDetails.payment_status}</p>
              </div>

              <div>
                <div>Shipping Details</div>
                {item.shipping_options.map((shipping, index) => {
                  return (
                    <div key={shipping.shipping_rate}>
                      Shipping Amount :{shipping.shipping_amount}
                    </div>
                  );
                })}
              </div>

              <div>Total Amount:{item.totalAmount}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default OrderPage;
