import { useState, useEffect } from "react";


export default function AppointmentList() {
    const [ appointments, setAppointments ] = useState([]);

    async function getAppointments() {
        const url = 'http://localhost:8080/api/appointments/';
        const res = await fetch(url);
        const { appointments } = await res.json();
        setAppointments(appointments);
    }

    useEffect(() => {getAppointments()}, []);

    async function appointmentCancel(id) {
        const url = `http://localhost:8080/api/appointments/${id}/cancel/`;
        const fetchOptions = {
            method: "POST",
            headers: {'Content-Type': "application/json"},
        };
        const res = await fetch(url, fetchOptions);
        if (res.ok) {
            setAppointments(appointments.filter(appointment => appointment.id !== id));
        } else {
            console.error("Error canceling appointment.");
        }
    }

    async function appointmentFinish(id) {
        const url = `http://localhost:8080/api/appointments/${id}/finish/`;
        const fetchOptions = {
            method: "POST",
            headers: {'Content-Type': "application/json"},
        };
        const res = await fetch(url, fetchOptions);
        if (res.ok) {
            setAppointments(appointments.filter(appointment => appointment.id !== id));
        } else {
            console.error("Could not process finish.");
        }
    }

    return (
        <>
        <div>
        <h1>Service Appointments</h1>
        <table className="table table-striped table-hover">
            <thead>
                <tr>
                    <th scope="col">VIN</th>
                    <th scope="col">Is VIP?</th>
                    <th scope="col">Customer</th>
                    <th scope="col">Date</th>
                    <th scope="col">Time</th>
                    <th scope="col">Technician</th>
                    <th scope="col">Reason</th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody className="table-group-divider">
                {appointments.map(appointment => {
                    const date = new Date(appointment.date_time);
                    const formattedDate = date.toLocaleDateString();
                    const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                    return (
                        <tr key={ appointment.id }>
                            <td>{ appointment.vin }</td>
                            <td>{ appointment.vip ? "Yes": "No" }</td>
                            <td>{ appointment.customer }</td>
                            <td>{ formattedDate }</td>
                            <td>{ formattedTime }</td>
                            <td>{ appointment.technician ? `${appointment.technician.first_name} ${appointment.technician.last_name}` : "N/A"}</td>
                            <td>{ appointment.reason }</td>
                            <td>
                            <button type="submit" className="btn btn-danger" onClick={() => appointmentCancel(appointment.id)}>Cancel</button>
                            <button type="submit" className="btn btn-success" onClick={() => appointmentFinish(appointment.id)}>Finish</button>
                            </td>
                        </tr>
                );
            })}
            </tbody>
        </table>
        </div>
        </>
    );
}
