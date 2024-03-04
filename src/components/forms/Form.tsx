import {ChangeEvent, FormEvent} from "react";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {InputWithLabel} from "@/components/forms/index";
import LoadingButton from "@/components/ui/loading-button";

interface RegisterFormConfig {
    labelText: string
    labelId: string
    type: string
    value: string
    required?: boolean
    placeholder: string
    link?: {
        linkText: string
        linkUrl: string
    }

}

type Props = {
    config: RegisterFormConfig[]
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (event: FormEvent<HTMLFormElement>) => void;
    isLoading: boolean
    btnText: string
};


const Form = ({onSubmit, isLoading, btnText, onChange, config}: Props) => {
    return (
        <form className="space-y-6" onSubmit={onSubmit}>

            {config.map((input) => {
                return (
                    <InputWithLabel
                        key={input.labelId}
                        labelId={input.labelId}
                        type={input.type}
                        onChange={onChange}
                        value={input.value}
                        placeholder={input.placeholder}
                        required={input.required}
                        link={input.link}

                    >
                        {input.labelText}
                    </InputWithLabel>
                )
            })}

            <div>
                <LoadingButton className={'w-full'}
                    isLoading={isLoading}>
                    {btnText}
                </LoadingButton>
            </div>

        </form>
    );
};
export default Form;
