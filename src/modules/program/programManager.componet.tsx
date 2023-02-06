import React, { useState } from 'react';

import { ResidentModel } from "../resident";
import { useResidents } from "../resident/provider";
import { ResidentSearch } from '../resident';

export function ProgramManager({ managedProgram, setManagedProgram }: any) {
    const { residents, subscribe } = useResidents();
    const [selectedResident, setSelectedResident] = useState<ResidentModel | null>(null);

    if (subscribe === undefined || residents === undefined) {
        throw new Error("subscribe needs to be defined")
    }

    return (
        <div>
            <h1>Manage Program - {managedProgram.name}</h1>

            <ResidentSearch handleSelectProp={setSelectedResident}></ResidentSearch>            

            <button onClick={() => {
                if (!selectedResident) {
                    return;
                }

                subscribe({ 
                    programId: managedProgram.id,
                    residentId: selectedResident.id,
                })
            }}>
                Add User to Attendance
            </button>
            <button onClick={() => setManagedProgram({})}>Close Manager</button>
        </div>
    );
};
    