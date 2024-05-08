import {Button} from "@/components/ui/button";

type Props = {
    provider: 'google' | 'yandex'
    children: React.ReactNode
};
const SocialButton = ({provider, children}: Props) => {
    return (
        <Button variant={'default'}>Войти с помощшью {provider}{children}</Button>
    );
};
export default SocialButton;
