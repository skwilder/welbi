import { useState } from "react";
import { ResidentModel } from "./model";
import { useResidents } from "./provider";

export const ResidentSearch = ({ handleSelectProp } : { handleSelectProp : any }) => {
    const { residents } = useResidents();    

    if (residents === undefined) {
        throw new Error("Residents must be not undefined to use Resident Search")
    }

    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState<ResidentModel[]>([]);
  
    const handleChange = (event:any) => {
        setSearchTerm(event.target.value);

        setSearchResults(
                residents.filter((resident:ResidentModel) =>
                    resident.name.toLowerCase().includes(event.target.value.toLowerCase())
            )
        );
    };
  
    const handleSelect = (resident:ResidentModel) => {    
        setSearchTerm(resident.name);
        setSearchResults([]);
        handleSelectProp(resident);
    };
  
    return (
        <div>
            <input
                type="text"
                value={searchTerm}
                onChange={handleChange}
                placeholder="Search by name"
            />
            {searchResults.length > 0 && (
                <ul className="search-results-box">
                    { searchResults.map((person:any) => (
                        <li key={person.id} onClick={() => handleSelect(person)}>
                            {person.name}
                         </li>
                    ))}
                </ul>
            )}
        </div>
    );
};