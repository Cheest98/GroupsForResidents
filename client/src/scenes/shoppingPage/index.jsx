import { Box, useMediaQuery } from "@mui/material";
import Navbar from "../../scenes/navbar";
import ShoppinglistWidget from "../widgets/ShoppingListWidgets/ShoppingListWidget"
import NewListWidget from "../widgets/ShoppingListWidgets/NewListWidget"

const ShoppingListPage = () => {
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");


    return (
        <Box>
            <Navbar />
            <Box
                width="100%"
                padding="2rem 6%"
                gap="0.5rem"
                display="flex"
                justifyContent="space-around"
                alignItems="center"
            >
                <Box
                    flexBasis={isNonMobileScreens ? "42%" : undefined}
                    mt={isNonMobileScreens ? undefined : "2rem"}
                >
                    <NewListWidget />
                </Box>
            </Box>
            <ShoppinglistWidget />
        </Box>
    );
};

export default ShoppingListPage;