import RequireAuth from '@/components/utils/RequireAuth'
import type {Metadata} from "next";

interface Props {
    children: React.ReactNode
}
export const metadata: Metadata = {
    title: "Жарим Варим  | Оформление заказа ",
    description: "Оформление заказа",
};

export default function Layout({children}: Props) {
    return <RequireAuth>{children}</RequireAuth>
}