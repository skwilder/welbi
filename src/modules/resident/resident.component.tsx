import { ResidentModel } from "./model";

interface ResidentProps {
  data: ResidentModel,
}

export function Resident({helllo}: any) {
  return (
    <>
        <span>{helllo} </span>
    </>
  );
}
