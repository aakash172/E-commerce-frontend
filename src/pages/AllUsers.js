import { useEffect, useState } from "react";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import moment from "moment";
import { MdModeEdit } from "react-icons/md";
import ChangeUserRole from "../components/ChangeUserRole";

export default function AllUsers() {
  const [allUser, setAllUsers] = useState([]);
  const fetchAllUsers = async () => {
    const fetchData = await fetch(SummaryApi.allUser.url, {
      method: SummaryApi.allUser.method,
      credentials: "include",
    });
    const dataResponse = await fetchData.json();
    console.log(dataResponse);
    if (dataResponse.success) {
      setAllUsers(dataResponse.data);
    } else {
      toast.error(dataResponse.message);
    }
  };
  useEffect(() => {
    fetchAllUsers();
  }, []);
  return (
    <div className="bg-white pb-4">
      <table className="w-full userTable">
        <thead>
          <tr>
            <th>Sr No.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Created Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {allUser &&
            allUser.map((el, index) => {
              return (
                <tr key={el?.email}>
                  <td>{index + 1}</td>
                  <td>{el?.name}</td>
                  <td>{el?.email}</td>
                  <td>{el?.role}</td>
                  <td>{moment(el?.createdAt).format("ll")}</td>
                  <td>
                    <button className="bg-green-100 p-2 rounded-full cursor-pointer hover:bg-green-300 hover:text-white">
                      <MdModeEdit />
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <ChangeUserRole />
    </div>
  );
}
