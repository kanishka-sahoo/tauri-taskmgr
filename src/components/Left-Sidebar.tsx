import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faTimes, IconDefinition, faGear } from '@fortawesome/free-solid-svg-icons';
import "./LeftSidebar.css";
import SidebarOptions from "./SidebarOptions";

interface MenuOption {
    optionName: string; // Corrected type from String to string
    optionIcon: IconDefinition;
    fullName: string
}

interface LeftSidebarProps {
    menuOptions: MenuOption[];
    onOptionSelect: (optionIndex: number) => void;
}

export default function LeftSidebar({ menuOptions, onOptionSelect }: LeftSidebarProps) {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(0);

    const handleSidebarToggle = () => {
        if (window.innerWidth < 768) {
            setSidebarOpen(false);
        } else {
            setSidebarOpen(!isSidebarOpen);
        }
    };

    const handleOptionClick = (key: number) => {
        setSelectedOption(key);
        onOptionSelect(key);  // Bubble up the selected option
    };

    const handleResize = () => {
        if (window.innerWidth < 768) {
            setSidebarOpen(false);
        }
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    {/* TODO: Implement the sidebar feature properly */ }
    return (
        <div className={`sidebar ${isSidebarOpen ? 'w-1/3' : ''} hidden flex flex-col justify-between bg-neutral-200 dark:bg-neutral-700`}>
            <div className="flex flex-col">
                <div className="flex flex-row justify-end items-end">
                    <button className="toggle-button" onClick={handleSidebarToggle}>
                        <FontAwesomeIcon
                            className={`${isSidebarOpen ? 'pr-2' : 'px-3'} pt-0 mt-2 text-5xl text-black transition-colors duration-150 dark:text-white hover:text-blue-500`}
                            icon={isSidebarOpen ? faTimes : faArrowRight}
                        />
                    </button>
                </div>
                {menuOptions.map((item, key) => (
                    <SidebarOptions
                        key={key}
                        optionName={item.optionName}
                        onClick={() => handleOptionClick(key)}
                        icon={item.optionIcon}
                        isExpanded={isSidebarOpen}
                        isSelected={key === selectedOption}
                    />
                ))}
            </div>
            <div className="flex flex-row m-2 w-auto text-black rounded transition-colors duration-150 cursor-pointer dark:text-white hover:text-blue-500">
                <FontAwesomeIcon icon={faGear}
                    className="p-2 pt-0 pl-1 mt-2 text-4xl"
                />
                <h2 className={`${isSidebarOpen ? '' : 'hidden'} my-auto  text-4xl`}>Settings</h2>
            </div>
        </div>
    );
}
