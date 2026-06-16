interface DepartmentCardProps {
    name: string;
    description: string;
    totalStaffs: number;
}

const DepartmentCard = ({ name, description, totalStaffs }: DepartmentCardProps) => {
    return (
        <div className="flex flex-col items-stretch justify-center gap-4 rounded-2xl border-b border-gray-500 bg-gray-800 p-5">
            <h1 className="text-3xl font-medium">{name}</h1>
            <p className="text-justify font-mono text-[10px] text-gray-300">{description}</p>
            <p className="text-sm text-gray-500">{totalStaffs} Staffs</p>
        </div>
    );
};

export default DepartmentCard;
