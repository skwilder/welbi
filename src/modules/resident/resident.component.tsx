import { ResidentModel } from "./model";

interface ResidentProps {
  data: ResidentModel,
}

export function Resident({data: resident}: ResidentProps) {
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
          </tr>
        </thead>
        
        <tbody>
            <tr> 
                <td>{resident.id}</td>
                <td>{resident.name}</td>    
            </tr>
        </tbody>
      </table>
    </>
  );
}
