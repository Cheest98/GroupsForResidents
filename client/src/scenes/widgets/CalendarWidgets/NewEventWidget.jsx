
import { useState } from "react";
import WidgetWrapper from "../../../components/WidgetWrapper";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import {
    Box,
    Button,
    Divider,
    IconButton,
    InputBase,
    Typography,
    useTheme,
    useMediaQuery
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setEvents } from "../../../state";
import FlexBetween from "../../../components/FlexBetween";

const NewEventWidget = () => {
    const dispatch = useDispatch();
    const { _id } = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const [event, setEvent] = useState({ title: '', description: '', startDate: null, endDate: null });
    const currentEvents = useSelector((state) => state.events);
    const isNonMobileScreens = useMediaQuery('(min-width:1000px)');
    const { palette } = useTheme();

    const handleEvent = async () => {

        const response = await fetch(`http://localhost:3001/events`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: _id,
                title: event.title,
                description: event.description,
                startDate: event.startDate.toISOString(),
                endDate: event.endDate.toISOString(),
            }),
        });
        if (!response.ok) {
            console.error('Server responded with status', response.status);
            return;
        }
        const newList = await response.json();

        const updatedEvents = [...currentEvents, newList];

        dispatch(setEvents({ events: updatedEvents }));
        setEvents({ title: '', description: '', startDate: '', endDate: '' }); // Reset the list name
    };

    const handleTitleChange = (e) => {
        setEvent({ ...event, title: e.target.value });
    };

    const handleDescriptionChange = (e) => {
        setEvent({ ...event, description: e.target.value });
    };

    const handleStartDateChange = (date) => {
        setEvent({ ...event, startDate: date });
    };
    const handleEndDateChange = (date) => {
        setEvent({ ...event, endDate: date });
    };


    return (
        <WidgetWrapper>
            <Box> New Event Component
                <Box width="100%"
                    padding="1rem 6%"
                    display={isNonMobileScreens ? 'flex' : 'block'}
                    gap="0.5rem"
                >
                    <InputBase
                        placeholder="Title"
                        onChange={handleTitleChange}
                        value={event.title}
                        sx={{
                            width: "100%",
                            backgroundColor: palette.neutral.light,
                            borderRadius: "2rem",
                            padding: "1rem 2rem",
                            mb: "0.5rem",
                        }}
                    />
                    <InputBase
                        placeholder="Description"
                        onChange={handleDescriptionChange}
                        value={event.description}
                        sx={{
                            width: "100%",
                            backgroundColor: palette.neutral.light,
                            borderRadius: "2rem",
                            padding: "1rem 2rem",
                        }}
                    />
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DateTimePicker
                            label="Start Date"
                            value={event.startDate}
                            onChange={handleStartDateChange}
                        />
                        <DateTimePicker
                            label="End Date"
                            value={event.EndDate}
                            onChange={handleEndDateChange}
                        />
                    </LocalizationProvider>
                </Box>

                <Divider sx={{ margin: "1.25rem 0" }} />

                <FlexBetween>
                    <Button
                        disabled={!event.title || !event.description || !event.startDate || !event.endDate}   // Sprawdzaj oba pola
                        onClick={handleEvent}
                        sx={{
                            color: palette.background.alt,
                            backgroundColor: palette.primary.main,
                            borderRadius: "3rem",
                        }}
                    >
                        Event
                    </Button>
                </FlexBetween>
            </Box>
        </WidgetWrapper>
    );
};

export default NewEventWidget;