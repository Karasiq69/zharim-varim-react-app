import CheckoutUserForm from "@/components/forms/CheckoutUserForm";
import Divider from "@/components/ui/Divider";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {Label} from "@/components/ui/label";
import {ChevronLeft, ChevronRight, CreditCard, HandCoins} from "lucide-react";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import CheckoutTotals from "@/app/checkout/components/CheckoutTotals";
import {Checkbox} from "@/components/ui/checkbox";
import {Textarea} from "@/components/ui/textarea";
import {Controller, useForm} from "react-hook-form";
import {User} from "@/redux/features/authApiSlice";
import {useState} from "react";

// interface User {
//     phone: string;
//     id: number;
//     email: string;
//     first_name: string;
// }

interface CheckoutFormProps {
    user?: User;
    isLoading: boolean;
}

const CheckoutForm = ({user, isLoading}: CheckoutFormProps) => {
    // const [paymentMethodState, setPaymentMethodState] = useState('card');

    const {register, handleSubmit, formState: {errors}, watch, control} = useForm({
        defaultValues: {
            user_id: user?.id ?? '',
            name: user?.first_name ?? '',
            phone: user?.phone ?? '',
            address: 'дефолть адрес в форме',
            paymentMethod: 'card',
        }
    });
    const onSubmit = (data: any) => {

        console.log(data);

    };


    return (
        <form onSubmit={handleSubmit(onSubmit)}>

            <div className="flex flex-col md:flex-row justify-between gap-10">

                <div className="md:w-2/5">
                    <section className={''}>
                        <h2 className={'font-medium'}>Оформление заказа</h2>

                        <div className={'mt-10'}>
                            <div className={'space-y-5'}>
                                <div className="grid w-full max-w-sm items-center gap-1.5">
                                    <Label htmlFor="name">Имя</Label>
                                    <Input {...register('name', {required: 'Это поле обязательно'})} type="text"
                                           id="name" placeholder="Имя"/>
                                    {errors.name && <p className={'text-destructive'}>{errors.name.message}</p>}
                                </div>
                                <div className="grid w-full max-w-sm items-center gap-1.5">
                                    <Label htmlFor="phone">Номер телефона</Label>
                                    <Input {...register('phone', {required: 'Это поле обязательно'})} type="tel"
                                           id="phone" placeholder="Телефон"/>
                                    {errors.phone?.message && (
                                        <p className={'text-destructive'}>{errors.phone.message.toString()}</p>
                                    )}

                                </div>
                                <div className="grid w-full max-w-sm items-center gap-1.5">
                                    <Label htmlFor="address">Адрес доставки</Label>
                                    <Textarea {...register('address', {required: 'Это поле обязательно'})} id="address"
                                              placeholder="Введите адрес доставки"/>
                                    {errors.address && <p className={'text-destructive'}>{errors.address.message}</p>}
                                </div>
                            </div>
                        </div>
                    </section>
                    <Divider/>
                    <section>
                        <h3 className={'font-medium'}>Оплата</h3>
                        <div className="flex w-full max-w-sm items-center">
                            <Controller
                                name="paymentMethod"
                                control={control}
                                render={({field: {onChange, value}}) => (
                                    <div className="flex w-full max-w-sm items-center">
                                        <div className="grid grid-cols-3 gap-4 mt-10">
                                            {/* Для каждой радио кнопки */}
                                            {["card", "sbp", "cash"].map((method, index) => (
                                                <div key={index}>
                                                    <input
                                                        type="radio"
                                                        value={method}
                                                        id={method}
                                                        className="peer sr-only"
                                                        checked={value === method}
                                                        onChange={() => onChange(method)}
                                                    />
                                                    <label
                                                        htmlFor={method}
                                                        className={`flex flex-col items-center justify-between rounded-md 
                                                        border-2 p-4 hover:bg-accent hover:text-accent-foreground ${value === method ? 'border-primary bg-popover' : 'border-muted'}`}
                                                    >
                                                        {/* Динамически изменяемые иконки и текст */}
                                                        {method === "card" && "Картой"}
                                                        {method === "sbp" && "СБП"}
                                                        {method === "cash" && "Наличными"}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            />


                        </div>
                    </section>
                    <Divider/>
                    <section className={'my-10 space-y-2'}>
                        <h4 className={'font-bold text-gray-700'}>Есть промокод?</h4>
                        <div className="flex w-full max-w-sm items-center space-x-2">
                            <Input type="text" placeholder="Промокод"/>
                            <Button>Применить</Button>
                        </div>
                    </section>

                </div>
                <div className="md:w-2/5">
                    <CheckoutTotals/>
                    <section className={'mt-10 space-y-5'}>
                        <div className="flex items-center space-x-2">
                            <Checkbox required id="terms"/>
                            <label
                                htmlFor="terms"
                                className="text-xs leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Продолжая оформление заказа, я принимаю условия пользования сайтом и согласен на
                                обработку моих персональных данных
                            </label>
                        </div>
                        <div className={'flex justify-between'}>
                            <div>
                                <Button size={'lg'} variant={'outline'}>
                                    <ChevronLeft/>
                                    Вернуться назад
                                </Button>
                            </div>
                            <div>
                                <Button type={"submit"} size={'lg'} variant={'default'}>
                                    Оформить заказ
                                    <ChevronRight/>
                                </Button>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </form>
    );
};
export default CheckoutForm;
