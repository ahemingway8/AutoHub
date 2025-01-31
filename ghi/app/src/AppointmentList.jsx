import { useState, useEffect } from "react";


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

    const filteredAppointments = appointments.filter(appointment => {
        const searchLower = searchTerm.toLowerCase();
        return (
            appointment.vin.toLowerCase().includes(searchLower) ||
            appointment.customer.toLowerCase().includes(searchLower) ||
            appointment.reason.toLowerCase().includes(searchLower)
        );
    });

    useEffect(() => {getAppointments()}, []);

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>Service Appointments</h1>
                <div className="card bg-light">
                    <div className="card-body p-2 d-flex gap-3">
                        <span>Total Active: <strong>{appointments.length}</strong></span>
                        <span>VIP Customers: <strong>{appointments.filter(a => a.vip).length}</strong></span>
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
                <div className="col-md-8">
                    <div className="card-body shadow p-0">
                        <table className="table table-primary table-striped mb-0">
                            <thead className="table-light">
                                <tr>
                                    <th>VIN</th>
                                    <th>Status</th>
                                    <th>Customer</th>
                                    <th>Date/Time</th>
                                    <th>Technician</th>
                                    <th>Reason</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredAppointments.map(appointment => {
                                    const date = new Date(appointment.date_time);
                                    return (
                                        <tr key={appointment.id}>
                                            <td>{appointment.vin}</td>
                                            <td>
                                                {appointment.vip &&
                                                    <span className="badge bg-warning me-2">VIP</span>
                                                }
                                            </td>
                                            <td>{appointment.customer}</td>
                                            <td>
                                                {date.toLocaleDateString()} at{' '}
                                                {date.toLocaleDateString([], {
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
                                            </td>
                                            <td>
                                                {appointment.technician ?
                                                    `${appointment.technician.first_name} ${appointment.technician.last_name}`
                                                    : "N/A"}
                                            </td>
                                            <td>{appointment.reason}</td>
                                            <td>
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
