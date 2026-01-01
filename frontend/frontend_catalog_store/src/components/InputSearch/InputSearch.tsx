import type { BusinessData } from "../../interfaces/businessInterface"
import { filterInput } from "../../utils/Filter";
import { LoopIcons } from "../Icons/Icons"

interface InputSearchProps {
  arrayFilter: BusinessData[];
  elementByFilter: keyof BusinessData;
  setFilteredBusiness: React.Dispatch<React.SetStateAction<BusinessData[]>>;
}

function InputSearch({ arrayFilter, elementByFilter, setFilteredBusiness }: InputSearchProps) {
  return (
    <div className="flex flex-row w-19/20 bg-gray-50 border border-gray-300 rounded-lg">
      <span className="absolute py-2 px-1">
        <LoopIcons />
      </span>
      <input type="text" placeholder="Buscar..." className="w-full ml-6 py-1
       placeholder:text-gray-500 placeholder:italic focus:outline-0 " onChange={(e) =>
          setFilteredBusiness(filterInput(arrayFilter, elementByFilter, e))
        } />
    </div>
  )
}

export default InputSearch
