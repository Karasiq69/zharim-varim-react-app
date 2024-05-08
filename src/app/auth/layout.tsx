'use client'
// import {useAppSelector} from "@/redux/hooks";

type Props = {
    children: React.ReactNode
};
const Layout = ({children}: Props) => {
    // const {isAuthenticated} = useAppSelector(state => state.auth);

    return (
        <div className={''}>{children}</div>
    );
};
export default Layout;
