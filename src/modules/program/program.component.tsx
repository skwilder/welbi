import dayjs from 'dayjs';
import { MouseEventHandler, useState } from 'react';
import { Resident } from '../resident';

export function Program({ programs }: any) {
    const [hobbyFilter, setHobbyFilter] = useState<string>('');

    const renderProrgramCells = ({  name, location, start, end, hobbies, attendance } : any) => (
        <>
            <td>{name}</td>
            <td>{location}</td>
            <td>{dayjs(start).format('DD/MM/YYYY')}</td>
            <td>{dayjs(end).format('DD/MM/YYYY')}</td>
            <td>{
                hobbies.sort().map(
                    (hobby:any, index: number) => 
                        (<button
                            value={hobby}
                            onClick={(event: React.MouseEvent<HTMLButtonElement>) => setHobbyFilter(event.target instanceof HTMLButtonElement ? event.target.value : '')}  
                            key={index}>
                                {hobby}
                        </button>)
                    )}
            </td>
            <td>{
                attendance
                    .filter((attendee: any) => (attendee.status !== "Declined" ))
                    .map((attendee: any) => (<Resident key={attendee.residentId} residentId={attendee.residentId}/>))
            }</td>
        </>
    );

    const filteredPrograms = hobbyFilter ? programs.filter((program: any) => program.hobbies.includes(hobbyFilter)) : programs;

    return (
    <>  {hobbyFilter ? <button onClick={() => setHobbyFilter('')} >Clear Filter</button> : null}
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
            {filteredPrograms.map((program: any) => (
                <tr key={program.id}>{renderProrgramCells(program)}</tr>
            ))}
        </tbody>
        </table>
    </>
    );
}
