export default function AllProducts() {
  return (
    <div>
      <div className="bg-white py-2 px-4 flex justify-between items-center">
        <h2 className="font-bold text-lg">All products</h2>
        <button className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all py-2 px-2 rounded-full">
          Upload Product
        </button>
      </div>
    </div>
  );
}
