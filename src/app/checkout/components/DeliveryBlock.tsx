import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import LocalPickupSelection from "@/app/checkout/components/LocalPickupSelection";
import DeliverySelection from "@/app/checkout/components/DeliverySelection";
import {useLocalStorage} from "@/hooks/useLocalStorage";

type Props = {
    deliveryMethod: string;
    setDeliveryMethod: (value: string) => void;
    selectedAddressId: string;
    setSelectedAddressId: (value: string) => void;
};
const DeliveryBlock = ({deliveryMethod, setDeliveryMethod, selectedAddressId, setSelectedAddressId}: Props) => {
    const isDeliveryDisabled = process.env.NEXT_PUBLIC_DELIVERY_ON === 'false';

    const handleTabChange = (value: string) => {
        setDeliveryMethod(value);
    }

    return (
        <div>
            <Tabs defaultValue={'local_pickup'} value={deliveryMethod} onValueChange={handleTabChange}
                  className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="local_pickup">Самовывоз</TabsTrigger>
                    <TabsTrigger value="delivery" disabled={isDeliveryDisabled}>Доставка</TabsTrigger>
                </TabsList>
                <span className={'text-xs text-muted-foreground'}>В данный момент доставка доступна только через сервис Яндекс.Еда</span>
                <TabsContent value="local_pickup" className={'mt-5'}>
                    <LocalPickupSelection/>
                </TabsContent>
                <TabsContent value="delivery" className={'mt-5 w-full'}>
                    <DeliverySelection
                        selectedAddressId={selectedAddressId}
                        setSelectedAddressId={setSelectedAddressId}
                    />
                </TabsContent>
            </Tabs>

        </div>
    );
};
export default DeliveryBlock;
