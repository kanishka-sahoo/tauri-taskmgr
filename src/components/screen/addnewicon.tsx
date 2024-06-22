import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

export default function AddNewButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      className="flex fixed right-4 bottom-4 justify-center items-center p-2 text-lg font-bold text-white bg-blue-500 rounded-full transition-colors duration-150 hover:bg-blue-600 focus:outline-none"
      style={{ width: '50px', height: '50px' }}
      onClick={onClick}
    >
      <FontAwesomeIcon icon={faEdit} style={{ fontSize: '1.5em' }} />
    </button>

  );
}
