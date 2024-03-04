import {getProduct} from "@/api/api";
import {useParams} from "next/navigation";

const ProductPage = async ({params}) => {

    const productsData = await getProduct(params.slug)


    return (
        <div>
            <div>
                <h3>товар {productsData.title}</h3>
                <p>{productsData.regular_price}</p>
            </div>
        </div>
    );
};
export default ProductPage;

