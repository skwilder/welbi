import { ProgramModel } from "./model";

interface Program {
  data: ProgramModel,
}

export function Program({data: program}: Program) {
  const renderCells = ({ id, name }: ProgramModel) => (
    <>
        <td>{id}</td>
        <td>{name}</td>
    </>
  );

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
                <td>{program.id}</td>
                <td>{program.name}</td>    
            </tr>
        </tbody>
      </table>
    </>
  );
}
