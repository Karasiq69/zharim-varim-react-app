'use client'

import ProductItem from "@/components/ProductItem";
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
                    <div className={'grid items-stretch lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4 auto-rows-fr'}>
                        {skeletons}
                    </div>
                </>
                :
                <>
                    {isSuccess && data?.map((category) => (
                        <div id={category?.slug} key={category?.id}>

                            <h3 className={'mb-10 font-bold'}>{category.name}</h3>
                            <div
                                className={'mb-20 mx-auto grid items-stretch lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-2 md:gap-4 '}>
                                {category?.products?.map((product) => (
                                    <div key={product.id}
                                         className={'flex flex-col bg-white rounded-2xl  p-2 md:p-4 group transition-all duration-300 hover:drop-shadow-xl'}>
                                        <ProductItem

                                            product={product}
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
