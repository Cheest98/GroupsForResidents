import { Box, useMediaQuery } from "@mui/material";
import Navbar from "../../scenes/navbar";
import NewEventWidget from "../widgets/CalendarWidgets/NewEventWidget";
import CalendarWidget from "../widgets/CalendarWidgets/CalendarWidget";
import { useDispatch, useSelector } from 'react-redux';
import { setEvents } from '../../state/index';

const CalendarPage = () => {
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
    const user = useSelector((state) => state.user);

    const getEvents = async () => {
        const response = await fetch(`http://localhost:3001/events/group/${user.group}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        dispatch(setEvents({ events: data }));
    };

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
                    <NewEventWidget />
                </Box>

            </Box>
            <Box width="100%"
                padding="2rem 6%"
                gap="0.5rem"
                justifyContent="space-around"
                alignItems="center"
            >
                <CalendarWidget getEvents={getEvents} />
            </Box>
        </Box>
    );
};

export default CalendarPage;