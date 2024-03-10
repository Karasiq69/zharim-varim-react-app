'use client'
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import {useRetrieveUserQuery} from "@/redux/features/authApiSlice";
import CheckoutForm from "@/components/forms/CheckoutForm";

type Props = {};
const Page = (props: Props) => {
    const {data:user, isLoading, isFetching} = useRetrieveUserQuery();

    return (
        <>
            <MaxWidthWrapper className={'mt-10 mb-20 h-full'}>
                {!isLoading && <>
                    <CheckoutForm user={user} isLoading={isLoading}/>
                </>}
            </MaxWidthWrapper>


        </>
    );
};
export default Page;
