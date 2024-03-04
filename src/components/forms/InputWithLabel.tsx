import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {ChangeEvent} from "react";
import {Button} from "@/components/ui/button";
import Link from "next/link";
type Props = {
    children: React.ReactNode
    labelId: string
    type: string
    placeholder?: string
    value: string
    onChange: (event:ChangeEvent<HTMLInputElement>) => void
    required?:boolean
    link?: {
        linkText: string
        linkUrl: string
    }
};
const InputWithLabel = ({labelId, link, type, placeholder, onChange, value, required=false, children}: Props) => {
    return (
        <div className="grid w-full max-w-sm items-center gap-1.5">
            <div className={'flex justify-between items-center'}>
                <Label
                htmlFor={labelId}
            >
                {children}
            </Label>

                {link && (
                <div className={'text-right'}>
                    <Button variant={'link'} size={'sm'}><Link href={link.linkUrl}>{link.linkText}</Link></Button>
                </div>
            )}
            </div>



            <Input onChange={onChange}
                   value={value}
                   type={type}
                   id={labelId}
                   name={labelId}
                   placeholder={placeholder}
                   required={required}/>

        </div>
    );
};
export default InputWithLabel;
