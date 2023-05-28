import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTasks } from "../../state";
import TaskList from "../../components/tasksComponents/taskList";

const TasksWidget = ({ userId, isProfile }) => {
    const dispatch = useDispatch();
    const tasks = useSelector((state) => state.tasks);
    const token = useSelector((state) => state.token);
    const user = useSelector((state) => state.user);

    const getTasks = async () => {
        const response = await fetch("http://localhost:3001/tasks", {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        dispatch(setTasks({ tasks: data }));
    };

    const deleteTask = async (taskId) => {
        const response = await fetch(`http://localhost:3001/tasks/${taskId}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${token}` },
        });
        if (response.ok) {
            const updatedTasks = tasks.filter((task) => task._id !== taskId);
            dispatch(setTasks({ tasks: updatedTasks }));
        }
    };

    const updateTaskStatus = async (taskId, newStatus) => {
        const response = await fetch(`http://localhost:3001/tasks/${taskId}/status`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
            body: JSON.stringify({ status: newStatus }),
        });
        if (response.ok) {
            const updatedTasks = tasks.map((task) => {
                if (task._id === taskId) {
                    return { ...task, status: newStatus };
                }
                return task;
            });
            dispatch(setTasks({ tasks: updatedTasks }));
        }
    };

    const getUserTasks = async () => {
        const response = await fetch(
            `http://localhost:3001/tasks/${userId}/tasks`,
            {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        const data = await response.json();
        dispatch(setTasks({ Tasks: data }));
    };

    useEffect(() => {
        if (isProfile) {
            getUserTasks();
        } else {
            getTasks();
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // to raczej do optymalizacji
    const sortedtasks = [...tasks].filter((task) => task.group === user.group).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return (

        <TaskList tasks={sortedtasks} deleteTask={deleteTask} updateTaskStatus={updateTaskStatus} />
    );
};

export default TasksWidget;