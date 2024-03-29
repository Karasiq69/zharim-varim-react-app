import {ReactNode} from "react";
import {cn} from "@/lib/utils";

type Props = {
    className?: string
    children: ReactNode
};
const MaxWidthWrapper = (props: Props) => {
    return (
        <div className={cn(
            ' relative container max-w-6xl  p-4 md:p-2',
            props.className
        )}>
            {props.children}
        </div>
    );
};
export default MaxWidthWrapper;
