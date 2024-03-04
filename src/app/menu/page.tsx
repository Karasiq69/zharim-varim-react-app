'use client'
import MenuHome from "@/components/MenuHome";
import Container from "@/components/Container";
import {useProductsByCategory} from "@/api/queries";

const MenuPage = () => {
    const {data, isLoading} = useProductsByCategory()
    console.log(data)
    return (
        <Container>
            menu page

        </Container>
    );
};
export default MenuPage;


