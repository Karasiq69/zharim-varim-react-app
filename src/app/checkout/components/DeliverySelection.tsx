import {useGetUsersAddresses} from "@/api/queries";
import {Card, CardContent} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {CreditCard, Trash2} from "lucide-react";
import {useLocalStorage} from "@/hooks/useLocalStorage";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {Label} from "@/components/ui/label";

type Props = {};
const DeliverySelection = (props: Props) => {
    const {data: addresses, isLoading, isSuccess} = useGetUsersAddresses();

    const [selectedAddress, setSelectedAddress] = useLocalStorage('selectedAddress', '');
    const handleValueChange = (e: any) => {
        setSelectedAddress(e);
        console.log(e)
    };
    return (
        <div>
            <RadioGroup

                onValueChange={handleValueChange}
                defaultValue={selectedAddress}
                className="gap-4">
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 w-full gap-4">

                    {addresses?.map((address: any) => {
                        return (

                            <div key={address.id}>
                                <RadioGroupItem value={address.id} id={address.id} className="peer sr-only"/>
                                <Label
                                    htmlFor={address.id}
                                    className="flex flex-col items-center justify-between rounded-md
                                        border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground
                                        peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                                >
                                    <div className=" ">
                                        <p className="font-medium"> {address.city}</p>
                                        <p className="text-sm">
                                            {address.address}
                                        </p>
                                        <p><span className={'text-muted-foreground'}> {address.place}</span></p>
                                    </div>
                                </Label>
                            </div>


                        )
                    })}

                </div>
            </RadioGroup>

        </div>
    );
};
export default DeliverySelection;
