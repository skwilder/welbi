import dayjs from 'dayjs';
import { Resident } from '../resident';

export function Program({ programs }: any) {
    const renderProrgramCells = ({ id, name, location, start, end, hobbies, attendance } : any) => (
        <>
            <td>{name}</td>
            <td>{location}</td>
            <td>{dayjs(start).format('DD/MM/YYYY')}</td>
            <td>{dayjs(end).format('DD/MM/YYYY')}</td>
            <td>{hobbies.sort().join(', ')}</td>
            <td>{
                attendance
                    .filter((attendee: any) => (attendee.status !== "Declined" ))
                    .map((attendee: any) => (<Resident key={attendee.residentId} residentId={attendee.residentId}/>))
            }</td>
        </>
    );

    return (
    <>
        <table>
        <thead>
            <tr>
                <th>Program Name</th>
                <th>Location</th>
                <th>Start</th>
                <th>End</th>
                <th>Hobbies</th>
                <th>Attendance</th>
                
            </tr>
        </thead>

        <tbody>
            {programs.map((program: any) => (
                <tr key={program.id}>{renderProrgramCells(program)}</tr>
            ))}
        </tbody>
        </table>
    </>
    );
}
