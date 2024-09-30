import ROLE from "../common/role";

export default function ChangeUserRole() {
  return (
    <div className="fixed  w-full h-full z-10 flex  justify-between items-center">
      <div className="w-full max-w-sm p-4 shadow-md mx-auto bg-red-50">
        <h1 className="pb-4 text-lg font-medium">ChangeUserRole</h1>
        <p>Name:aksh</p>
        <p>Email:aks@gami</p>
        <p></p>
        <select>
          {Object.values(ROLE).map((el) => {
            return (
              <option value={el} key={el}>
                {el}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
}
