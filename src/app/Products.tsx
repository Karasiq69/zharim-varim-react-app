'use client'
import StickyMenuNav from "@/components/StickyMenuNav";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import {useProductsByCategory} from "@/api/queries";
import MenuHome from "@/components/MenuHome";

type Props = {};

const Products = (props: Props) => {
    const {data = [], isLoading, isSuccess} = useProductsByCategory();

    return (
        <>
            <StickyMenuNav data={data} isLoading={isLoading} isSuccess={isSuccess}/>

            <section className={'py-10 bg-gray-200'}>
                <MaxWidthWrapper>
                    <MenuHome data={data} isLoading={isLoading} isSuccess={isSuccess}/>
                </MaxWidthWrapper>
            </section>
        </>
    );
};
export default Products;
