import CheckoutUserForm from "@/components/forms/CheckoutUserForm";
import Divider from "@/components/ui/Divider";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {Label} from "@/components/ui/label";
import {ChevronLeft, ChevronRight, CreditCard, HandCoins, Nfc} from "lucide-react";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import CheckoutTotals from "@/app/checkout/components/CheckoutTotals";
import {Checkbox} from "@/components/ui/checkbox";
import {Textarea} from "@/components/ui/textarea";
import {Controller, useForm} from "react-hook-form";
import {User} from "@/redux/features/authApiSlice";
import {useCreateOrderMutation} from "@/api/mutations";
import {useLocalStorage} from "@/hooks/useLocalStorage";
import {useShoppingCart} from "@/app/context/ShoppingCartContext";
import LoadingButton from "@/components/ui/loading-button";


interface CheckoutFormProps {
    user?: User;
    isLoading: boolean;
}


const testOrder = {

    "address": 2,
    "comment": "Пожалуйста, доставьте заказ как можно скорее",
    "order_type": "delivery",
    "payment_method": "cash",
    "items": [
        {
            "product": 1,
            "quantity": 2,
            "attribute_values": [
                3
            ]
        },
        {
            "product": 2,
            "quantity": 1
        },
        {
            "product": 3,
            "quantity": 3,
            "attribute_values": [
                1,
                2
            ]
        }
    ]
}


const CheckoutForm = ({ user, isLoading }: CheckoutFormProps) => {
    const { cartItems, calculateTotalCost } = useShoppingCart();
    const totalCost = calculateTotalCost();
    const { mutate, isSuccess, isPending, data } = useCreateOrderMutation();
    const [selectedPaymentOption, setSelectedPaymentOption] = useLocalStorage('selectedPaymentOption', 'card');

    data && console.log(data.data.url, 'DATA  use create order checkout form');

    const { register, handleSubmit, formState: { errors }, watch, control } = useForm({
        defaultValues: {
            user_id: user?.id ?? '',
            name: user?.first_name ?? '',
            phone: user?.phone ?? '',
            address: 'дефолть адрес в форме',
            // paymentMethod: selectedPaymentOption,
        }
    });
    const onSubmit = (formData: any) => {
        const transformedItems = cartItems.map(item => ({
            product: item.product.id,
            quantity: item.quantity,
            attribute_values: item.product.selectedAttribute ? [item.product.selectedAttribute.id] : []
        }));

        const orderData = {
            items: transformedItems,
            total_cost: totalCost,
            order_type: 'delivery',
            comment: 'test comment',
            payment_method: selectedPaymentOption,
            status: "pending",
            address: {
                zipcode: '123312132',
                city: 'Москва',
                address: formData.address,
                place: 'выфвфывфы',
                address_name: 'фыввыфвфы'
            }
        };

        mutate(orderData);
        console.log(orderData, 'FROM checkoutForm ttsx');
    };

    const handleValueChange = (e: any) => {
        setSelectedPaymentOption(e);
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
                                    <Textarea {...register('address', {required: 'Это поле обязательно'})}
                                              id="address"
                                              placeholder="Введите адрес доставки"/>
                                    {errors.address &&
                                        <p className={'text-destructive'}>{errors.address.message}</p>}
                                </div>
                            </div>
                        </div>
                    </section>
                    <Divider/>

                    <section>
                        <h3 className={'font-medium'}>Оплата</h3>
                        <div className={'my-7'}>
                            <RadioGroup onValueChange={handleValueChange}
                                        defaultValue={selectedPaymentOption}
                                        className="grid grid-cols-3 gap-4">
                                <div>
                                    <RadioGroupItem value="card" id="card" className="peer sr-only"/>
                                    <Label
                                        htmlFor="card"
                                        className="flex flex-col items-center justify-between rounded-md
                                        border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground
                                        peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                                    >
                                        <CreditCard height={40}/>
                                        Картой
                                    </Label>
                                </div>
                                <div>
                                    <RadioGroupItem
                                        value="sbp"
                                        id="sbp"
                                        className="peer sr-only"
                                    />
                                    <Label
                                        htmlFor="sbp"
                                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                                    >
                                        <Nfc height={40}/>
                                        СБП
                                    </Label>
                                </div>
                                <div>
                                    <RadioGroupItem value="cash" id="cash" className="peer sr-only"/>
                                    <Label
                                        htmlFor="cash"
                                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                                    >
                                        <HandCoins height={40}/>
                                        Наличными
                                    </Label>
                                </div>
                            </RadioGroup>
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
                                <LoadingButton isLoading={isPending} type={"submit"} size={'lg'} variant={'default'}>
                                    Оформить заказ
                                    <ChevronRight/>
                                </LoadingButton>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </form>
    );
};
export default CheckoutForm;
