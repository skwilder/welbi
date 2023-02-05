import { ResidentModel } from "./model";
import { useResidents } from "./provider";
interface ResidentProps {
  residentId: string,
}

export function Resident({ residentId }: ResidentProps) {
    const { residents } = useResidents();

    const resident = residents?.find(
        (resident:ResidentModel) => resident.id === residentId
    );

    return (
        <>
            <p>{resident?.name} </p>
        </>
    );
}
