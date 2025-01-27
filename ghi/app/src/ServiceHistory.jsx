import { useState, useEffect } from "react";

export default function ServiceHistory() {
    const [ appointments, setAppointments ] = useState([]);
    const [ vin, setVin ] = useState('');
    const [ error, setError ] = useState('');

    async function getAppointments() {
        const url = 'http://localhost:8080/api/appointments/';
        const res = await fetch(url);
        const data = await res.json();
        setAppointments(data.appointments);
    }

    useEffect(() => {getAppointments()}, []);

    function handleVinChange(e) {
        setVin(e.target.value);
    }

    async function handleSearchSubmit(e) {
        e.preventDefault();

        if(!vin) {
            setError("Please enter VIN.");
            return;
        }

        const url = `http://localhost:8080/api/appointments/?vin=${vin}`;
        const res = await fetch(url);
        const data = await res.json();
        setAppointments(data.appointments);
    }

    return (
        <>
        <div>
            <h1 style={{paddingTop: '60px', paddingBottom: '20px'}}>Service History</h1>
            <form className="form-inline" onSubmit={ handleSearchSubmit } >
                <input className="form-control mr-sm-2" type="search" value={vin} onChange={ handleVinChange } placeholder="Search by VIN..." aria-label="Search"/>
                <button className="btn btn btn-outline-secondary my-2 my-sm-0" type="submit">Search</button>
            </form>
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
                        <th scope="col">Status</th>
                    </tr>
                </thead>
                <tbody className="table-group-divider">
                    {appointments.map(appointment => {
                        const date = new Date(appointment.date_time);
                        const formattedDate = date.toLocaleDateString();
                        const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit'});

                        return (
                        <tr key={ appointment.id }>
                            <td>{appointment.vin}</td>
                            <td>{appointment.vip ? "Yes" : "No"}</td>
                            <td>{appointment.customer}</td>
                            <td>{formattedDate}</td>
                            <td>{formattedTime}</td>
                            <td>{appointment.technician ? `${appointment.technician.first_name} ${appointment.technician.last_name}` : "N/A"}</td>
                            <td>{appointment.reason}</td>
                            <td>{appointment.status}</td>
                        </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
        </>
    );
}
