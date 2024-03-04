import MaxWidthWrapper from "@/components/MaxWidthWrapper";

type Props = {};
const Footer = (props: Props) => {
    return (
        <div className={'bg-muted h-20 '}>
            <MaxWidthWrapper className={'h-full  px-2'}>
                <div className={' flex   items-center justify-center h-full'}>
                    <p className={'text-gray-400'}> {new Date().getFullYear()}
                         © Варим Кофе Жарим Мясо
                    </p>
                </div>
            </MaxWidthWrapper>
        </div>
    );
};
export default Footer;
