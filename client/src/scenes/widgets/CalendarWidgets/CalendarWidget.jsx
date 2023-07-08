import React from 'react'
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

const CalendarWidget = ({ getEvents }) => {
    const events = useSelector((state) => state.events);


    useEffect(() => {
        getEvents();
    }, [getEvents]);

    const mappedEvents = events.map(event => ({
        title: event.title,
        start: new Date(event.startDate),
        end: new Date(event.endDate),
    }));

    return (
        <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            events={mappedEvents}
        />
    );
}

export default CalendarWidget