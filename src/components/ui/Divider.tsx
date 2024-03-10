import React from "react";

interface DividerProps {
    className?: string;
}

const Divider: React.FC<DividerProps> = ({ className }) => {
    return (
        <hr className={`h-px my-8 bg-gray-200 border-0 dark:bg-gray-700 ${className}`} />
    );
};

export default Divider;
