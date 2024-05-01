'use client'
import StickyMenuNav from "@/components/StickyMenuNav";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import {useProductsByCategory} from "@/api/queries";
import MenuHome from "@/components/MenuHome";
import CartIconFloating from "@/components/CartIconFloating";

type Props = {};

const Products = (props: Props) => {
    const {data = [], isLoading, isSuccess} = useProductsByCategory();

    return (
        <>
            <StickyMenuNav data={data} isLoading={isLoading} isSuccess={isSuccess}/>

            <section className={'py-10 bg-stone-100'}>
                <MaxWidthWrapper>
                    <MenuHome data={data} isLoading={isLoading} isSuccess={isSuccess}/>
                </MaxWidthWrapper>
            </section>
            <CartIconFloating/>
        </>
    );
};
export default Products;
