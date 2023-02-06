import { useState } from 'react';
import dayjs from 'dayjs';

import { Resident } from '../resident';
import { ProgramModel } from './model';
import { ProgramManager } from './programManager.componet';

/**
 * Program component contains the logic needed to show list of programs, and
 * their attendees.  Clicking the hobbies will filter the list by that hobby,
 * and the results are sorted by newest program.
 * 
 * Users can open the program manager by clicking the program name (this
 * ui is not the greatest, wanted to spend more of time with the interactions)
 * 
 * @param param0 
 * @returns 
 */
export function Program({ programs }: any) {
    // hobbyFilter is used click a hobby to filter the results by that hobby
    const [hobbyFilter, setHobbyFilter] = useState<string>('');
    // managedProgram is used when clicking a program to allow users to attend a program
    const [managedProgram, setManagedProgram] = useState<Partial<ProgramModel>>({});

    function sortDate(a: { start: string }, b: { start: string }): number {
        return new Date(b.start).getTime() - new Date(a.start).getTime();
    }

    const renderProrgramCells = ({ id, name, location, start, end, hobbies, attendance } : any) => (
        <>
            <td className='program-manager' onClick={() => setManagedProgram({id, name})}>{name}</td>
            <td>{location}</td>
            <td>{dayjs(start).format('DD/MM/YYYY')}</td>
            <td>{dayjs(end).format('DD/MM/YYYY')}</td>
            <td>{
                hobbies.sort().map(
                    (hobby:string[], index: number) => 
                        (<button
                            value={hobby}
                            onClick={(event: React.MouseEvent<HTMLButtonElement>) => 
                                setHobbyFilter(event.target instanceof HTMLButtonElement ? event.target.value : '')}  
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

    // Filter our list of programs if we have a hobby filter selected
    const filteredPrograms = hobbyFilter ? programs.filter((program: any) => program.hobbies.includes(hobbyFilter)) : programs;

    return (
        <>  
            {/* Render a clear hobby button if we have a hobby selected */}
            {
                hobbyFilter ? <
                    button onClick={() => setHobbyFilter('')} >Clear Filter</button> 
                    : null
            }
            {/* todo fix this lazy check */}
            {managedProgram.name && <ProgramManager managedProgram={managedProgram} setManagedProgram={setManagedProgram}/>}
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
                    {filteredPrograms.sort(sortDate).map((program: any) => (
                        <tr key={program.id}>{renderProrgramCells(program)}</tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}
