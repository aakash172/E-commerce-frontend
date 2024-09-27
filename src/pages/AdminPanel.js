import { FaRegCircleUser } from "react-icons/fa6";
import { useSelector } from "react-redux";
export default function AdminPanel() {
  const user = useSelector((state) => state?.user?.user);
  return (
    <div className="min-h-[calc(100vh-120px)] flex">
      <aside className="bg-white min-h-full w-full max-w-60 customShadow">
        <div className="h-32 bg-red-500 flex flex-col justify-center items-center">
          <div className="text-5xl cursor-pointer relative  flex justify-center">
            {user && user.profilePic ? (
              <img
                src={user.profilePic}
                className="h-20 w-20 rounded-full"
                alt={user?.name}
              />
            ) : (
              <FaRegCircleUser />
            )}
          </div>
          <p className="capitalize text-lg font-semibold">{user?.name}</p>
          <p className="capitalize text-lg font-semibold">{user?.role}</p>
        </div>
      </aside>
      <main></main>
    </div>
  );
}
