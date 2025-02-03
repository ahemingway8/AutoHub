import { useState, useEffect, useMemo } from "react";


export default function AppointmentList() {
    const [ appointments, setAppointments ] = useState([]);
    const [ loading, setLoading ] = useState(true);
    const [ searchTerm, setSearchTerm ] = useState('');

    async function getAppointments() {
        try {
            const res = await fetch('http://localhost:8080/api/appointments/');
            const data = await res.json();
            setAppointments(data.appointments);
        } catch (error) {
            console.error('Error fetching appointments:', error);
        } finally {
            setLoading(false);
        }
    }

    const statusUpdateOptions = {
        method: "PUT",
        headers: {'Content-Type': "application/json"},
    };

    async function appointmentCancel(id) {
        const res = await fetch(`http://localhost:8080/api/appointments/${id}/cancel/`, statusUpdateOptions);
        if (res.ok) {
            getAppointments();
        } else {
            console.error("error canceling appointment.");
        }

    }

    async function appointmentFinish(id) {
        const res = await fetch(`http://localhost:8080/api/appointments/${id}/finish/`, statusUpdateOptions);
        if (res.ok) {
            setLoading(true);
            getAppointments();
        } else {
            console.error("Could not process finish.")
        }
    }

    const filteredAppointments = appointments.filter(appointment => {
        const searchLower = searchTerm.toLowerCase();
        return (
            appointment.vin.toLowerCase().includes(searchLower) ||
            appointment.customer.toLowerCase().includes(searchLower) ||
            appointment.reason.toLowerCase().includes(searchLower)
        );
    });

    const vipCount = useMemo(() => appointments.filter(a => a.vip).length, [appointments]);

    useEffect(() => {getAppointments()}, []);

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>Service Appointments</h1>
                <div className="card bg-light">
                    <div className="card-body p-2 d-flex gap-3">
                        <span>Total Active: <strong>{appointments.length}</strong></span>
                        <div className="vr"></div>
                        <span>
                            <i className="bi bi-star-fill text-primary"></i>
                            VIP Customers: <strong>{vipCount}</strong>
                        </span>
                    </div>
                </div>
            </div>

            <div className="mb-4">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search by VIN, customer, or reason..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {loading ? (
                <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : filteredAppointments.length === 0 ? (
                <div className="alert alert-info">No appointments found</div>
            ) : (
                <div className="card border-0">
                    <div className="card-body shadow p-0">
                        <table className="table table-striped table-bordered mb-0">
                            <thead className="table-light">
                                <tr>
                                    <th className="text-center">VIN</th>
                                    <th className="text-center">VIP Status</th>
                                    <th className="text-center">Customer</th>
                                    <th className="text-center">Date/Time</th>
                                    <th className="text-center">Technician</th>
                                    <th className="text-center">Reason</th>
                                    <th className="text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredAppointments.map(appointment => {
                                    const date = new Date(appointment.date_time);
                                    return (
                                        <tr key={appointment.id}>
                                            <td className="text-center">{appointment.vin}</td>
                                            <td className="text-center">
                                                {appointment.vip &&
                                                    <span><i className="bi bi-star-fill text-primary"></i></span>
                                                }
                                            </td>
                                            <td className="text-center">{appointment.customer}</td>
                                            <td className="text-center">
                                                {date.toLocaleDateString()} at{' '}
                                                {date.toLocaleTimeString([], {
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
                                            </td>
                                            <td className="text-center">
                                                {appointment.technician ?
                                                    `${appointment.technician.first_name} ${appointment.technician.last_name}`
                                                    : "N/A"}
                                            </td>
                                            <td className="text-center">{appointment.reason}</td>
                                            <td className="text-center">
                                                <div className="btn-group btn-group-sm">
                                                    <button
                                                        className="btn btn-outline-danger"
                                                        onClick={() => appointmentCancel(appointment.id)}
                                                    >
                                                        Cancel
                                                    </button>
                                                    <button
                                                        className="btn btn-outline-success"
                                                        onClick={() => appointmentFinish(appointment.id)}
                                                    >
                                                        Complete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}
