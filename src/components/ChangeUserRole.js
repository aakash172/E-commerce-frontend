import { useState } from "react";
import ROLE from "../common/role";
import { MdClose } from "react-icons/md";
import SummaryApi from "../common";
import { toast } from "react-toastify";
export default function ChangeUserRole({
  name,
  email,
  role,
  userId,
  onClose,
  updateAllUser,
}) {
  const [userRole, setUserRole] = useState(role);
  const handlerChangeRole = (e) => {
    setUserRole(e.target.value);
  };
  const updateUserRole = async () => {
    const fetchResponse = await fetch(SummaryApi.updateUser.url, {
      method: SummaryApi.updateUser.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        role: userRole,
      }),
    });
    const responseData = await fetchResponse.json();

    if (responseData.success) {
      toast.success(responseData.message);
      onClose();
      updateAllUser();
    } else {
      toast.error(responseData.message);
    }
  };
  return (
    <div className="fixed top-0 bottom-0 right-0  w-full h-full z-10 flex  justify-between items-center bg-slate-200 bg-opacity-50">
      <div className="w-full max-w-sm p-4 shadow-md mx-auto bg-red-50">
        <button className="block ml-auto" onClick={onClose}>
          <MdClose />
        </button>
        <h1 className="pb-4 text-lg font-medium">Change User Role</h1>
        <p>Name:{name}</p>
        <p>Email:{email}</p>
        <div className="flex items-center justify-between my-4">
          <p>Role</p>
          <select
            className="border px-4 py-1"
            value={userRole}
            onChange={handlerChangeRole}
          >
            {Object.values(ROLE).map((el) => {
              return (
                <option value={el} key={el}>
                  {el}
                </option>
              );
            })}
          </select>
        </div>
        <button
          className="w-fit mx-auto block py-1 px-3 rounded-full bg-red-600 text-white hover:bg-red-700 "
          onClick={updateUserRole}
        >
          Change Role
        </button>
      </div>
    </div>
  );
}
