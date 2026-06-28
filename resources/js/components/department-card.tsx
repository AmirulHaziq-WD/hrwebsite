interface DepartmentCardProps {
    name: string;
    description: string;
    totalStaffs: number;
}

const DepartmentCard = ({ name, description, totalStaffs }: DepartmentCardProps) => {
    return (
        <div className="flex h-70 w-65 flex-col items-stretch justify-start gap-4 rounded-2xl border-b-4 border-gray-500 bg-gray-800 p-5 transition-transform duration-200 hover:translate-y-1">
            <h1 className="text-3xl font-medium">{name}</h1>
            <p className="font-mono text-[10px] text-gray-300">{description}</p>
            <p className="text-sm text-gray-400">| {totalStaffs} Staffs |</p>
        </div>
    );
};

export default DepartmentCard;
