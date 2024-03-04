'use client'

import ProductItem from "@/components/ProductItem";
import {useProducts} from "@/api/queries";
import SkeletonCard from "@/components/SkeletonCard";
import {Skeleton} from "@/components/ui/skeleton";
import {Category} from '@/types/types'



const MenuHome = ({data, isLoading, isSuccess}: { data: Category[], isLoading: boolean, isSuccess: boolean }) => {
    const skeletons = [...Array(8)].map((_, index) => (
            <div key={index} className={'flex flex-col bg-white rounded-sm drop-shadow-md hover:drop-shadow-xl'}>
                <SkeletonCard key={index}/></div>
    ));

    return (
        <>

            {isLoading ?
                <>
                    <div className={'my-10'}>
                        {isLoading && <Skeleton className="h-7 w-[60px]"></Skeleton>}
                    </div>
                    <div className={' grid items-stretch lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4 auto-rows-fr'}>
                        {skeletons}
                    </div>
                </>
                :
                <>

                    {isSuccess && data?.map((category) => (
                        <div id={category.slug} key={category.id}>
                            <h3 className={'my-10'}>{category.name}</h3>
                            <div
                                className={'mx-auto grid items-stretch lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4 auto-rows-fr'}>
                                {category.products.map((product) => (
                                    <div key={product.id}
                                         className={'flex flex-col bg-white rounded-sm drop-shadow-md hover:drop-shadow-xl'}>
                                        <ProductItem
                                            id={product.id}
                                            title={product.title}
                                            imageURL={product?.product_image && product?.product_image[0]?.image || ''}
                                            regular_price={product.regular_price}
                                            discount_price={product.discount_price}
                                            description={product.description}
                                            alt_text={product?.product_image &&  product?.product_image[0]?.alt_text || ''}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}

                </>
            }
        </>
    );
};
export default MenuHome;
