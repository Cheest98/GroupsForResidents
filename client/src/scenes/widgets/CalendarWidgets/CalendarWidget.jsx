import React, { useState } from 'react'
import WidgetWrapper from "../../../components/WidgetWrapper";
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
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import { setEvents } from "../../../state";

const CalendarWidget = ({ getEvents }) => {
    const dispatch = useDispatch();
    const events = useSelector((state) => state.events);
    const token = useSelector((state) => state.token);
    const [selectedEvent, setSelectedEvent] = useState(null);

    useEffect(() => {
        getEvents();
    }, [getEvents]);

    const mappedEvents = events.map(event => ({
        id: event._id,
        title: event.title,
        start: new Date(event.startDate),
        end: new Date(event.endDate),
    }));


    const handleDeleteEvent = async (id) => {
        const response = await fetch(`http://localhost:3001/events/${id}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${token}` },
        });

        if (response.ok) {
            const updatedEvents = events.filter((event) => event._id !== id);
            dispatch(setEvents({ events: updatedEvents }));
        }
    };

    const handleEventClick = (info) => {
        setSelectedEvent(info.event);
        if (window.confirm("Do you really want to delete this event?")) {
            handleDeleteEvent(info.event.id);
        }
    };


    return (
        <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            events={mappedEvents}
            eventClick={handleEventClick}
            editable={true}
        />
    );
}

export default CalendarWidget