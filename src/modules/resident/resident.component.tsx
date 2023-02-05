import { ResidentModel } from "./model";

interface ResidentProps {
  data: ResidentModel,
}

export function Resident({residentId}: any) {
  return (
    <>
        <span>{residentId}</span>
    </>
  );
}
