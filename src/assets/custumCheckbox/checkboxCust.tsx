
import { FaCheck } from "react-icons/fa";

export default function Customcheckbox({task,changeHandler,bgColor}:any) {
    const checkboxId = `customCheckbox_${task.id}_${Math.random().toString(36).substr(2, 9)}`

    return (
            <div className="relative">
                <input
                    type="checkbox"
                    id={checkboxId}
                    checked={task.completed}
                    onChange={(e) => {
                        changeHandler(e);
                        e.stopPropagation()
                    }}
                    className="hidden"
                    name="completed"
                />
                <label
                    htmlFor={checkboxId}
                    onClick={(e) => e.stopPropagation()}
                    className={`cursor-pointer inline-block w-6 h-6 border border-gray-400 rounded transition duration-300  ${
                    task.completed ? `bg-${bgColor} border-x-${bgColor} ` : ''
                    } hover:opacity-60 transition-all duration-300`}
                >
                    {task.completed&&
                    <div className="absolute top-1 left-1">
                        <FaCheck className="text-white"/>
                    </div>}
                </label>
                        
            </div>         
    )
}