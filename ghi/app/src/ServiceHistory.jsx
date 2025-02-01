import { useState, useEffect } from "react";

export default function ServiceHistory() {
    const [ appointments, setAppointments ] = useState([]);
    const [ vin, setVin ] = useState('');
    const [ loading, setLoading ] = useState(false);
    const [ stats, setStats ] = useState({
        total: 0,
        completed: 0,
        canceled: 0,
        vip: 0
    });

    async function getAppointments(searchVin = '') {
        setLoading(true);
        try{
            const url = searchVin
                ? `http://localhost:8080/api/appointments/history/?vin=${searchVin}`
                : 'http://localhost:8080/api/appointments/history/';

            const res = await fetch(url);
            const data = await res.json();
            setAppointments(data.appointments);

            setStats({
                total: data.appointments.length,
                completed: data.appointments.filter(a => a.status === 'finished').length,
                canceled: data.appointments.filter(a => a.status === 'canceled').length,
                vip: data.appointments.filter(a => a.vip).length
            });
        } catch (error) {
            console.error('Error fetching history:', error);
        } finally {
            setLoading(false);
        }

    }

    useEffect(() => {
        getAppointments();
    }, []);

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-12">
                    <h1 className="mb-4">Service History</h1>
                    <div>
                        <div className="card-body p-0">
                            <div className="d-flex justify-content-around align-items-center gap-3 border border-black p-2">
                                <div>Total: <span className="fs-5 fw-bold"> {stats.total}</span></div>
                                <div className="vr"></div>
                                <div>Completed: <span className="fs-5 fw-bold"> {stats.completed}</span></div>
                                <div className="vr"></div>
                                <div>Canceled: <span className="fs-5 fw-bold"> {stats.canceled}</span></div>
                                <div className="vr"></div>
                                <div><i className="bi bi-star-fill"></i> VIP: <span className="fs-5 fw-bold"> {stats.vip}</span></div>
                                <div></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="input-group mb-4">
                    <input
                        type="search"
                        className="form-control"
                        placeholder="Search by VIN..."
                        value={vin}
                        onChange={(e) => setVin(e.target.value)}
                    />
                    <button
                        className="btn btn-primary px-4"
                        onClick={() => getAppointments(vin)}
                    >
                        Search
                    </button>
                    <button
                        className="btn btn-outline-secondary px-4"
                        onClick={() => {
                            setVin('');
                            getAppointments();
                        }}
                    >
                        Clear
                    </button>
                </div>

                {loading ? (
                    <div className="text-center py-4">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                ) : (
                    <div className="card border-0">
                        <div className="card-body shadow p-0">
                            <table className="table table-striped table-bordered mb-0">
                                <thead className="table-light">
                                    <tr>
                                        <th className="text-center">VIN</th>
                                        <th className="text-center">Status</th>
                                        <th className="text-center">Customer</th>
                                        <th className="text-center">Date/Time</th>
                                        <th className="text-center">Technician</th>
                                        <th className="text-center">Reason</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {appointments.map(appointment => {
                                        const date = new Date(appointment.date_time);
                                        return (
                                            <tr key={appointment.id}>
                                                <td className="text-center">{appointment.vin}</td>
                                                <td className="text-center">
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <span className={`${
                                                            appointment.status === 'finished' ? 'text-success' :
                                                            appointment.status === 'canceled' ? 'text-danger' :
                                                            'text-black'
                                                        } fw-medium`}>
                                                            {appointment.status === 'finished' ? 'Completed' :
                                                            appointment.status === 'canceled' ? 'Canceled' :
                                                            appointment.status === 'created' ? 'Scheduled' :
                                                            appointment.status}
                                                        </span>
                                                        {appointment.vip && (
                                                            <span><i className="bi bi-star-fill"></i> VIP</span>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="text-center">{appointment.customer}</td>
                                                <td className="text-center">
                                                    {date.toLocaleDateString()} {date.toLocaleDateString([], {
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
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                            {appointments.length === 0 && (
                                <div className="text-center py-4 text-muted">
                                    No appointments found
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
