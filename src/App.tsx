import LeftSidebar from "./components/Left-Sidebar";
import MainScreen from "./components/MainScreen";
import { faListCheck, faBell } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import "./index.css";

function App() {
    const [optionSelected, setOptionSelected] = useState(0);

    const handleOptionSelect = (optionIndex: number) => {
        setOptionSelected(optionIndex);
    };

    const menuOptions = [
        {
            optionName: "Tasks",
            optionIcon: faListCheck,
            fullName: "Your Tasks"
        },
        {
            optionName: "Reminders",
            optionIcon: faBell,
            fullName: "Your Reminders"
        }
    ];

    return (
        <div className="flex flex-row min-h-screen bg-neutral-50 dark:bg-neutral-900">
            {/* TODO: Implement the sidebar feature properly, add more panes and fill them out */}
            <LeftSidebar menuOptions={menuOptions} onOptionSelect={handleOptionSelect} />
            <MainScreen title={menuOptions[optionSelected].fullName} taskNumber={optionSelected} />
        </div>
    );
}

export default App;
