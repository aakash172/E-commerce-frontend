import { useState } from "react";
import loginIcon from "./../assest/signin.gif";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import imageTobase64 from "../helpers/imageTobase64";
import SummaryApi from "../common/index.js";
import { toast } from "react-toastify";

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(false);
  const [data, setdata] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
    profilePic: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setdata((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const handleUploadPic = async (e) => {
    const file = e.target.files[0];
    const imagePic = await imageTobase64(file);
    setdata((prev) => {
      return {
        ...prev,
        profilePic: imagePic,
      };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if password and confirmPassword match
    if (data.confirmPassword !== data.password) {
      console.log("Password and ConfirmPassWord do not match");
      toast.error("Passwords do not match");
      return;
    }
    try {
      // Make the API request
      const dataResponse = await fetch(SummaryApi.SignUP.url, {
        method: SummaryApi.SignUP.method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data), // Send user data
      });

      const dataapi = await dataResponse.json(); // Parse response

      if (dataapi.success) {
        toast.success(dataapi.message);
        navigate("/"); // Navigate to home page on success
      } else {
        toast.error(dataapi.message); // Display error from API
      }
    } catch (error) {
      console.error("Error:"); // Log error
      toast.error(error.message);
    }
  };

  return (
    <section id="signup">
      <div className="mx-auto container p-4">
        <div className="bg-white p-5 w-full max-w-sm mx-auto rounded-xl">
          <div className="w-20 h-20 mx-auto relative overflow-hidden rounded-full">
            <div>
              <img src={data.profilePic || loginIcon} alt="Login icon"></img>
            </div>
            <form>
              <label>
                <div className="text-xs bg-slate-200 bg-opacity-80 cursor-pointer pb-4 pt-2 text-center absolute bottom-0 w-full">
                  Upload Photo
                </div>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleUploadPic}
                ></input>
              </label>
            </form>
          </div>
          <form className="p-6 flex flex-col gap-2" onSubmit={handleSubmit}>
            <div className="grid">
              <label>Name :</label>
              <div className="bg-slate-100 p-2">
                <input
                  type="name"
                  placeholder="Enter Your Name"
                  required
                  name="name"
                  value={data.name}
                  onChange={handleChange}
                  className="w-full h-full outline-none bg-transparent"
                />
              </div>
            </div>
            <div className="grid">
              <label>Email :</label>
              <div className="bg-slate-100 p-2">
                <input
                  type="email"
                  placeholder="Enter Email"
                  required
                  name="email"
                  value={data.email}
                  onChange={handleChange}
                  className="w-full h-full outline-none bg-transparent"
                />
              </div>
            </div>
            <div>
              <label>Password :</label>
              <div className="bg-slate-100 p-2 flex">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Password"
                  required
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
            </div>
            <div>
              <label>Confirm Password :</label>
              <div className="bg-slate-100 p-2 flex">
                <input
                  type={confirmPassword ? "text" : "password"}
                  placeholder="Enter Password"
                  required
                  name="confirmPassword"
                  value={data.confirmPassword}
                  onChange={handleChange}
                  className="w-full h-full outline-none bg-transparent"
                />
                <div
                  className="cursor-pointer text-xl"
                  onClick={() => setConfirmPassword((prev) => !prev)}
                >
                  <span>{confirmPassword ? <FaEyeSlash /> : <FaEye />}</span>
                </div>
              </div>

              <Link
                to="/forgot-password"
                className="block w-fit ml-auto hover:underline hover:text-red-500"
              >
                Forgot Password
              </Link>
            </div>
            <button className="bg-red-500 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 hover:bg-red-700 transition-all mx-auto block mt-4">
              Sign up
            </button>
          </form>
          <p className="py-5">
            Alreday have an account ?{" "}
            <Link to={"/login"} className="hover:text-red-700 hover:underline">
              {" "}
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
export default SignUp;
