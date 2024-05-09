import {Loader} from "lucide-react";

type Props = {};
const LoaderSpinner = (props: Props) => {
    return (
        <div className='my-8'>
            <div className='flex justify-center my-8'>
                <span className={'animate-spin'}><Loader/></span>
            </div>
        </div>
    );
};
export default LoaderSpinner;
