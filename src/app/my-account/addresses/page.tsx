import {Separator} from "@/components/ui/separator";
import AddressesList from "@/app/my-account/addresses/addresses-list";
import AddressForm from "@/app/my-account/addresses/address-form";

type Props = {};
const Page = (props: Props) => {

    return (
        <>
            <div className="space-y-5">
                <div>
                    <h3 className="text-lg font-medium">Адреса</h3>
                    <p className="text-sm text-muted-foreground">
                        Здесь вы можете посмотреть свои адреса.
                    </p>
                </div>

                <Separator/>
                <div className={'bg-muted p-3 rounded-xl'}>
                    <AddressesList/>
                </div>
                <div>
                    <div className={'mt-20'}>
                        <h3 className="text-lg font-medium">Добавить новый адрес</h3>
                        <p className="text-sm text-muted-foreground">
                            Введите новый адрес и нажмите Добавить.
                        </p>
                    </div>
                    <Separator className={'mt-6'}/>
                    <div className={'mt-6'}>
                        <AddressForm/>
                    </div>
                </div>
            </div>


        </>
    );
};
export default Page;