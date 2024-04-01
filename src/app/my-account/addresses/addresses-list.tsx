import {useGetUsersAddresses} from "@/api/queries";
import {Card, CardContent} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {FileEditIcon, Loader2, Trash2} from "lucide-react";
import {useDeleteAddressMutation, useUpdateAddressMutation} from "@/api/mutations";
import LoadingButton from "@/components/ui/loading-button";
import {Badge} from "@/components/ui/badge";
import Link from "next/link";
import React from "react";

type Props = {};
const AddressesList = (props: Props) => {
    const {data: addresses, isLoading, isSuccess} = useGetUsersAddresses();
    const {mutate, isPending} = useDeleteAddressMutation();
    const {mutate:updateAddress, isPending:updateAddressIsPending} = useUpdateAddressMutation();
    console.log(addresses)
    const handleDeleteClick = (id: number) => {
        mutate(id)
    }
    if (isLoading) {
        return <div>Загрузка адресов..</div>
    }
    if (addresses.length === 0) {
        return <p className={'p-10 text-muted-foreground text-center'}>У вас не добавлено ни одного адреса</p>
    }

    const handleSetPrimaryAddress = (id:number) => {
        console.log('handleSetPrimaryAddress')
        !updateAddressIsPending &&
                updateAddress({ id, data: { is_primary: true } });

    }
    return (
        <div className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 w-full gap-4">
            {addresses?.map((address: any) => {
                return (
                    <Card key={address?.id}>
                        <CardContent className="p-0">
                            <div className=" ">
                                <div className="flex items-center gap-4 p-4">
                                    <div className="flex-1">
                                        {address?.is_primary ?
                                            <Badge variant={'default'}>Основной</Badge>
                                            :
                                            <div className={'flex items-center'}>
                                            <Badge variant={'outline'}
                                                   className={'hover:cursor-pointer hover:bg-gray-200'}
                                                   onClick={()=>handleSetPrimaryAddress(address?.id)}>
                                              Сделать основным
                                            </Badge>
                                            {updateAddressIsPending && <Loader2 className="ml-2 h-3 w-3 animate-spin" />}
                                            </div>
                                        }

                                        <p className="font-medium mt-3">{address?.city}</p>
                                        <p className="text-sm">
                                            {address?.address}
                                        </p>
                                        <p><span className={'text-muted-foreground'}> {address.place}</span></p>
                                    </div>
                                    <Button className="h-8 w-8" size="icon" variant="outline" disabled={isPending}>
                                        <Trash2 onClick={() => handleDeleteClick(address.id)} className="w-4 h-4"/>
                                        <span className="sr-only">Edit</span>
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )
            })}
        </div>
    );
};
export default AddressesList;
