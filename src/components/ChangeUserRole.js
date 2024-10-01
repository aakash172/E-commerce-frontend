import { useState } from "react";
import ROLE from "../common/role";
import { MdClose } from "react-icons/md";
export default function ChangeUserRole() {
  const [userRole, setUserRole] = useState("");
  const handlerChangeRole = (e) => {
    setUserRole(e.target.value);
    console.log(e.target.value);
  };
  return (
    <div className="fixed top-0 bottom-0 right-0  w-full h-full z-10 flex  justify-between items-center">
      <div className="w-full max-w-sm p-4 shadow-md mx-auto bg-red-50">
        <button className="block ml-auto">
          <MdClose />
        </button>
        <h1 className="pb-4 text-lg font-medium">Change User Role</h1>
        <p>Name:aksh</p>
        <p>Email:aks@gami</p>
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
        <button className="w-fit mx-auto block  py-1  px-3 rounded-full bg-red-600 text-white hover:bg-red-700 ">
          Change Role
        </button>
      </div>
    </div>
  );
}
