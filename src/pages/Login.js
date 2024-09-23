import { useState } from "react";
import loginIcon from "./../assest/signin.gif";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import SummaryApi from "../common/index.js";
import { toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [data, setdata] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setdata((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataResponse = await fetch(SummaryApi.SignIn.url, {
      method: SummaryApi.SignIn.method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const dataApi = await dataResponse.json();
    if (dataApi.success) {
      toast.success(data.message);
      navigate("/");
    } else {
      toast.error(data.message);
    }
  };

  return (
    <section id="login">
      <div className="mx-auto container p-4">
        <div className="bg-white p-5 w-full max-w-sm mx-auto rounded-xl">
          <div className="w-20 h-20 mx-auto">
            <img src={loginIcon} alt="Login icon"></img>
          </div>
          <form className="p-6" onSubmit={handleSubmit}>
            <div className="grid">
              <label>Email :</label>
              <div className="bg-slate-100 p-2">
                <input
                  type="email"
                  placeholder="Enter Email"
                  name="email"
                  value={data.email}
                  onChange={handleChange}
                  className="w-full h-full outline-none bg-transparent"
                />
              </div>
            </div>
            <div>
              <label>PassWord :</label>
              <div className="bg-slate-100 p-2 flex">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Password"
                  name="password"
                  value={data.password}
                  onChange={handleChange}
                  className="w-full h-full outline-none bg-transparent"
                />
                <div
                  className="cursor-pointer text-xl"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  <span>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
                </div>
              </div>

              <Link
                to="/forgot-password"
                className="block w-fit ml-auto hover:underline hover:text-red-500"
              >
                Forgot PassWord
              </Link>
            </div>
            <button className="bg-red-500 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 hover:bg-red-700 transition-all mx-auto block mt-4">
              Login
            </button>
          </form>
          <p className="py-5">
            Don't have a account ?{" "}
            <Link
              to={"/sign-up"}
              className="hover:text-red-700 hover:underline"
            >
              {" "}
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
export default Login;
