import React, { useState } from 'react'
import WidgetWrapper from "../../../components/WidgetWrapper";
import {
    Box,
    Button,
    TextField,
} from "@mui/material";
import Modal from '@mui/material/Modal';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import { setEvents } from "../../../state";
import ModalWrapper from "../../../components/ModalWrapper";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import CloseIcon from '@mui/icons-material/Close';

const CalendarWidget = ({ getEvents }) => {
    const dispatch = useDispatch();
    const events = useSelector((state) => state.events);
    const token = useSelector((state) => state.token);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [editEvent, setEditEvent] = useState(false)
    const [currentEvent, setCurrentEvent] = useState({ title: '', description: '', startDate: null, endDate: null });

    useEffect(() => {
        getEvents();
    }, [getEvents]);

    const mappedEvents = Array.isArray(events) ?
        events.map(event => ({
            id: event._id,
            title: event.title,
            start: new Date(event.startDate),
            end: new Date(event.endDate),
            description: event.description,
        }))
        : [];

    const handleDeleteEvent = async (id) => {
        try {
            const response = await fetch(`http://localhost:3001/events/${id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            } else {
                const updatedEvents = events.filter((event) => event._id !== id);
                dispatch(setEvents({ events: updatedEvents }));
            }
        } catch (error) {
            console.error('A network problem occurred, or the request was unsuccessful.', error);
        }
    };

    const handleUpdateEvent = async (id) => {
        let body = {
            title: currentEvent.title,
            description: currentEvent.description
        };

        if (currentEvent.startDate) {
            body.startDate = currentEvent.startDate.toISOString();
        }

        if (currentEvent.endDate) {
            body.endDate = currentEvent.endDate.toISOString();
        }
        try {
            const response = await fetch(`http://localhost:3001/events/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json", Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(body),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            } else {
                const updatedEvent = await response.json();
                const updatedEvents = events.map((event) => event._id === updatedEvent._id ? updatedEvent : event);
                dispatch(setEvents({ events: updatedEvents }));
            }
        } catch (error) {
            console.error('A network problem occurred, or the request was unsuccessful.', error);
        }
    };

    const handleEditEventClick = (info) => {
        setSelectedEvent(info.event);
        setCurrentEvent({
            title: info.event.title,
            description: info.event.extendedProps.description,
            startDate: new Date(info.event.start),
            endDate: new Date(info.event.end)
        });
        setEditEvent(true)
    };

    const handleCancelEventClick = () => {
        setCurrentEvent({ title: '', description: '', startDate: null, endDate: null });
        setEditEvent(false);
    };

    const handleDeleteClick = (event) => {
        setCurrentEvent({ title: '', description: '', startDate: null, endDate: null });
        handleDeleteEvent(event.id);
        setEditEvent(false);
    };

    const handleUpdateClick = (event) => {
        handleUpdateEvent(event.id);
        setEditEvent(false);
    };


    const handleTitleChange = (e) => {
        setCurrentEvent({ ...currentEvent, title: e.target.value });
    };

    const handleDescriptionChange = (e) => {
        setCurrentEvent({ ...currentEvent, description: e.target.value });
    };

    const handleStartDateChange = (date) => {
        setCurrentEvent({ ...currentEvent, startDate: date });
    };
    const handleEndDateChange = (date) => {
        setCurrentEvent({ ...currentEvent, endDate: date });
    };


    return (
        <WidgetWrapper >
            <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                events={mappedEvents}
                eventClick={handleEditEventClick}
                editable={true}
            />
            <Modal open={editEvent} onClose={handleCancelEventClick}>
                <ModalWrapper>
                    <Box display="flex" justifyContent="flex-end">
                        <CloseIcon onClick={handleCancelEventClick} sx={{
                            fontSize: "15px",
                            "&:hover": {
                                cursor: "pointer",
                            },
                        }} />
                    </Box>
                    <Box
                        display="flex"
                        flexDirection="column"
                        gap="15px"
                        alignItems="center"
                        justifyContent="center"
                        sx={{ width: '100%' }}
                    >
                        <TextField
                            label="Title"
                            value={currentEvent.title}
                            onChange={handleTitleChange}
                            name="Title"
                            fullWidth
                        />
                        <TextField
                            label="Description"
                            value={currentEvent.description}
                            onChange={handleDescriptionChange}
                            name="Description"
                            fullWidth
                        />
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <Box display="flex" justifyContent="space-between" width="100%">
                                <DateTimePicker
                                    label="Start Date"
                                    value={currentEvent.startDate}
                                    onChange={handleStartDateChange}
                                    sx={{ width: '45%' }}
                                />
                                <DateTimePicker
                                    label="End Date"
                                    value={currentEvent.endDate}
                                    onChange={handleEndDateChange}
                                    sx={{ width: '45%' }}
                                />
                            </Box>
                        </LocalizationProvider>
                        <Box display="flex" justifyContent="space-between" width="100%">
                            <Button onClick={() => handleDeleteClick(selectedEvent)} sx={{ width: '100%' }}>Remove</Button>
                            <Button onClick={() => handleUpdateClick(selectedEvent)} sx={{ width: '100%' }}>Save Changes</Button></Box>

                    </Box>
                </ModalWrapper>
            </Modal>
        </WidgetWrapper>
    );
}

export default CalendarWidget