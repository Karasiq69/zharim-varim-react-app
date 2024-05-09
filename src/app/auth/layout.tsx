'use client'
// import {useAppSelector} from "@/redux/hooks";

import {Suspense} from "react";
import {Loader} from "lucide-react";

type Props = {
    children: React.ReactNode
};
const Layout = ({children}: Props) => {
    // const {isAuthenticated} = useAppSelector(state => state.auth);

    return (
        <div className={''}>
            <Suspense fallback={<span className={'animate-spin'}><Loader/></span>}>{children}
            </Suspense>

        </div>
    );
};
export default Layout;
