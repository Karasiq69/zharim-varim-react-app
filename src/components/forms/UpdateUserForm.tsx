import {User} from "@/redux/features/authApiSlice";
import {Input} from "@/components/ui/input";
import LoadingButton from "@/components/ui/loading-button";
import {useUpdateUserMutation} from "@/api/mutations";
import {useState} from "react";

const UpdateUserForm = (props: Props) => {
    const {mutate, isPending: updateUserPending} = useUpdateUserMutation()
    const user = props.user

    const [formData, setFormData] = useState({
        email: user?.email || '',
        first_name: user?.first_name || '',
        phone: user?.phone || '',
    });

    const handleInputChange = (event: any) => {
        const {name, value} = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleFormSubmit = (event: any) => {
        event.preventDefault();
        console.log(formData);
        mutate(formData)

    };
    return (
        <form onSubmit={handleFormSubmit}>
            <div className={'max-w-xs space-y-5'}>

                <Input
                name="email"
                value={formData.email}
                type={'email'}
                placeholder={'email'}
                disabled
                autoComplete={'email'}
                onChange={handleInputChange}
              />
              <Input
                name="first_name"
                value={formData.first_name}
                type={'text'}
                placeholder={'Имя'}
                autoComplete={'name'}
                onChange={handleInputChange}
              />
              <Input
                name="phone"
                value={formData.phone}
                type={'tel'}
                placeholder={'Телефон'}
                autoComplete={'tel'}
                onChange={handleInputChange}
              />
              <LoadingButton
                type={'submit'}
                isLoading={updateUserPending}
                variant={'secondary'}
              >
                Сохранить
              </LoadingButton>
            </div>
        </form>

    )
        ;
};
type Props = {
    user: User
};
export default UpdateUserForm;
