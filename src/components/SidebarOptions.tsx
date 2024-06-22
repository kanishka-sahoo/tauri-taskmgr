import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

export default function SidebarOptions({ optionName, icon, onClick, isExpanded, isSelected }:
  { optionName: string, icon: IconDefinition, onClick: () => void, isExpanded: boolean, isSelected: boolean }) {
  return (
    <div onClick={onClick} className={`rounded m-2 cursor-pointer flex flex-row w-auto ${isSelected ? 'bg-neutral-100 dark:bg-neutral-800' : 'bg-neutral-200 dark:bg-neutral-700 border border-neutral-100 dark:border-neutral-800'}`}>
      <FontAwesomeIcon icon={icon}
        className="p-2 pt-0 mt-2 text-4xl text-black dark:text-white"
      />
      <h2 className={`${isExpanded ? '' : 'hidden'} my-auto text-4xl text-black dark:text-white`}>{optionName}</h2>
    </div>
  );
}
