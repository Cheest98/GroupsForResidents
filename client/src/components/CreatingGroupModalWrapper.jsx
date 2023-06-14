import { Box } from "@mui/material";
import { styled } from "@mui/system";

const CreatingGroupModalWrapper = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "50%",
    height: "50%",
    padding: "1.5rem 1.5rem 0.75rem 1.5rem",
    backgroundColor: theme.palette.background.alt,
    borderRadius: "0.75rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
}));
export default CreatingGroupModalWrapper;