'use client'
import {Input} from "@/components/ui/input";
import LoadingButton from "@/components/ui/loading-button";
import {Plus} from "lucide-react";
import {useState} from "react";
import {useAddAddressMutation} from "@/api/mutations";

type Props = {};
const AddressForm = (props: Props) => {
    const {mutate, isPending, isSuccess} = useAddAddressMutation();

    const formDefaults = {
        city: 'Москва',
        address: '',
        place: '',
        address_name: '',
    };

    const [formData, setFormData] = useState(formDefaults);
    const handleChange = (e: any) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const resetForm = () => {
        setFormData(formDefaults)
    };


    const handleSubmit = (e: any) => {
        e.preventDefault();
        console.log(formData);
        mutate(formData, {
            onSuccess: () => {
                setFormData(formDefaults);
            },
        });
    };

    return (
        <form onSubmit={handleSubmit} className={''}>
            <div className={' space-y-5 max-w-md'}>
                <Input type="text" value={formData.address_name} className={''} name={'address_name'}
                       placeholder="Название адреса (например: Дом, Рабочий, Офис)"
                       onChange={handleChange}
                       required/>
                <div>
                    <label htmlFor={'address'}>
                        <p className={'text-sm text-muted-foreground'}>Россия, Москва,</p>
                        <Input name={'address'} type="text" className={''}
                               value={formData.address}
                               placeholder="Улица, дом, квартира"
                               required
                               onChange={handleChange}/>
                    </label>
                </div>
                <Input type="text" name={'place'} required value={formData.place} className={'w-40'}
                       placeholder="Подъезд, этаж"
                       onChange={handleChange}/>
                <LoadingButton isLoading={isPending} type="submit"> {!isPending &&
                    <Plus size={20}/>}Добавить</LoadingButton>
            </div>

        </form>
    );
};
export default AddressForm;