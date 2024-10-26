const SummaryApi = {
  SignUP: {
    url: `${process.env.REACT_APP_BACKEND_URL}/api/signup`,
    method: "post",
  },
  SignIn: {
    url: `${process.env.REACT_APP_BACKEND_URL}/api/signin`,
    method: "post",
  },
  current_user: {
    url: `${process.env.REACT_APP_BACKEND_URL}/api/user-details`,
    method: "get",
  },
  logout_user: {
    url: `${process.env.REACT_APP_BACKEND_URL}/api/userLogout`,
    method: "get",
  },
  allUser: {
    url: `${process.env.REACT_APP_BACKEND_URL}/api/all-user`,
    method: "get",
  },
  updateUser: {
    url: `${process.env.REACT_APP_BACKEND_URL}/api/update-user`,
    method: "post",
  },
  uploadProduct: {
    url: `${process.env.REACT_APP_BACKEND_URL}/api/upload-product`,
    method: "post",
  },
  allProduct: {
    url: `${process.env.REACT_APP_BACKEND_URL}/api/get-product`,
    method: "get",
  },
  updateProduct: {
    url: `${process.env.REACT_APP_BACKEND_URL}/api/update-product`,
    method: "post",
  },
  categoryProduct: {
    url: `${process.env.REACT_APP_BACKEND_URL}/api/get-categoryProduct`,
    method: "get",
  },
  categoryWiseProduct: {
    url: `${process.env.REACT_APP_BACKEND_URL}/api/category-product`,
    method: "post",
  },
  productDetails: {
    url: `${process.env.REACT_APP_BACKEND_URL}/api/product-details`,
    method: "post",
  },
  addToCartProduct: {
    url: `${process.env.REACT_APP_BACKEND_URL}/api/addToCart`,
    method: "post",
  },
  addToCartProductCount: {
    url: `${process.env.REACT_APP_BACKEND_URL}/api/countAddToCartProduct`,
    method: "get",
  },
  addToCartProductView: {
    url: `${process.env.REACT_APP_BACKEND_URL}/api/view-cart-product`,
    method: "get",
  },
  updateCartProduct: {
    url: `${process.env.REACT_APP_BACKEND_URL}/api/update-cart-product`,
    method: "post",
  },
  deleteCartProduct: {
    url: `${process.env.REACT_APP_BACKEND_URL}/api/delete-cart-product`,
    method: "post",
  },
  searchProduct: {
    url: `${process.env.REACT_APP_BACKEND_URL}/api/search`,
    method: "get",
  },
  filterProduct: {
    url: `${process.env.REACT_APP_BACKEND_URL}/api/filter-product`,
    method: "post",
  },
  payment: {
    url: `${process.env.REACT_APP_BACKEND_URL}/api/checkout`,
    method: "post",
  },
};

export default SummaryApi;
