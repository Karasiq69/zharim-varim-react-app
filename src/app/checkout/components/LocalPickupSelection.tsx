import {Button} from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {Badge} from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";

type Props = {};

const LocalPickupSelection = (props: Props) => {
    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle><Badge variant="secondary">Основной ресторан</Badge></CardTitle>
                    <CardTitle>Москва,</CardTitle>
                    <CardTitle>1-я Магистральная ул., 8, стр. 7</CardTitle>
                    <CardDescription>Самовывоз из ресторана.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button asChild variant={'link'} className={'p-0'}>
                        <Link href={'https://yandex.ru/maps/-/CDRnUDpL'}>Открыть в Я.Карты</Link>
                    </Button>
                </CardContent>

            </Card>
        </div>
    );
};
export default LocalPickupSelection;
