import type { Business } from "../../interfaces/businessInterface"
import { filterInput } from "../../utils/Filter";
import { LoopIcons } from "../Icons/Icons"

interface InputSearchProps {
    arrayFilter: Business[];
    elementByFilter: keyof Business;
    setFilteredBusiness: React.Dispatch<React.SetStateAction<Business[]>>;
}

function InputSearch({arrayFilter, elementByFilter, setFilteredBusiness}: InputSearchProps) {
  return (
    <div className="flex flex-row bg-gray-200 rounded-lg">
        <span className="absolute py-2 px-1">
            <LoopIcons/>
        </span>
        <input type="text" placeholder="Buscar..." className="w-full ml-6 py-1 placeholder:text-gray-500 placeholder:italic focus:outline-0 " onChange={(e)=>
          setFilteredBusiness(filterInput(arrayFilter, elementByFilter, e))
          }/>  
    </div>
  )
}

export default InputSearch
