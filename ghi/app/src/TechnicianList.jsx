import { useState, useEffect } from "react";

export default function TechnicianList() {
    const [ technicians, setTechnicians ] = useState([]);

    async function getTechnicians() {
        const url = 'http://localhost:8080/api/technicians/';
        const res = await fetch(url);
        const { technicians } = await res.json();
        setTechnicians(technicians);
    }

    useEffect(() => {getTechnicians()}, []);

    return (
        <>
        <div>
        <h1 style={{paddingTop: '60px', paddingBottom: '20px'}}>Technicians</h1>
        <table className="table table-striped table-hover">
            <thead>
                <tr>
                    <th scope="col">Employee ID</th>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                </tr>
            </thead>
            <tbody className="table-group-divider">
                {technicians.map(technician => (
                <tr key={ technician.id }>
                    <td>{ technician.employee_id }</td>
                    <td>{ technician.first_name }</td>
                    <td>{ technician.last_name }</td>
                </tr>
                ))}
            </tbody>
        </table>
        </div>
        </>
    );
}
