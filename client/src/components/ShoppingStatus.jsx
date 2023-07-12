import { Box } from "@mui/material";
import { styled } from "@mui/system";

const ShoppingStatus = styled(Box)(({ theme }) => ({
    padding: "0.75rem 1.5rem 0.75rem 1.5rem",
    backgroundColor: theme.palette.background.alt,
    borderRadius: "0.75rem",
    mb: "0.5rem",
}));
export default ShoppingStatus;