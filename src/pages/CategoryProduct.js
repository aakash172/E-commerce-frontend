import { useParams } from "react-router-dom";

const CategoryProduct = () => {
    const params = useParams();
   
    return(
        <div>
{params?.CategoryName}
        </div>
    )
};

export default CategoryProduct;
