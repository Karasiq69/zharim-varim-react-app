import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {User} from "@/redux/features/authApiSlice";

type Props = {
    user: User
    onUpdate: any;
};
const CheckoutUserForm = (props: Props) => {
    const handleChange = (e: { target: { id: any; value: any; }; }) => {
        props.onUpdate(e.target.id, e.target.value);
    };
    return (
        <div className={'space-y-5'}>
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="email">Имя</Label>
                <Input defaultValue={props?.user?.first_name} onChange={handleChange} type="text" id="name" placeholder="Имя"/>
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="email">Номер телефона</Label>
                <Input defaultValue={props?.user?.phone} onChange={handleChange} type="tel" id="phone" placeholder="Телефон"/>
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="email">Адрес доставки</Label>
                <Textarea placeholder={'Введите адрес доставки'} onChange={handleChange}/>
            </div>


        </div>
    );
};
export default CheckoutUserForm;
