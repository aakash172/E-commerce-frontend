import BannerProduct from "../components/BannerProduct";
import CategoryList from "../components/CategoryList";
import HorizontalCardProduct from "../components/HorizontalCardProduct";
import VerticalCardProduct from "../components/VerticalCardProduct";

function Home() {
  return (
    <div>
      <CategoryList />
      <BannerProduct />
      <HorizontalCardProduct category={"airpodes"} heading={"Top Airpodes"} />
      <HorizontalCardProduct
        category={"trimmers"}
        heading={"Popular Trimmers"}
      />
      <VerticalCardProduct category={"camera"} heading={"Capture Memories "} />
      <VerticalCardProduct category={"mouse"} heading={"Mouse"} />
    </div>
  );
}
export default Home;
