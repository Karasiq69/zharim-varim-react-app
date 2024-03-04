'use client'
import MenuHome from "@/components/MenuHome";
import Container from "@/components/Container";
import {useProductsByCategory} from "@/api/queries";

const MenuPage = () => {
    const {data, isLoading} = useProductsByCategory()
    console.log(data)
    return (
        <Container>
            <div className={'my-10'}>dasadsexs</div>
            <div>{isLoading && 'loading...'}</div>
            <div>{data && data.map(item => (<div>
                <div>
                    <h3>{item.name}</h3>
                    {item.products.map(product => (
                        <div>{product.title}</div>
                    ))}

                </div>
            </div>))}</div>

        </Container>
    );
};
export default MenuPage;


