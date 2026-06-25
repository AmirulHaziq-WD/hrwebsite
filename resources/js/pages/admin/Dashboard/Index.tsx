import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/admin/dashboard',
    },
];

type DashboardProps = {
    stats: {
        totalStaffs: number;
        totalDepartments: number;
        totalPayroll: number;
        newHires: number;
        recentHires: {
            name: string;
            department: string;
            position: string;
            hiredAt: string;
        }[];
        staffsCountByDepartment: {
            name: string;
            count: number;
        }[];
    };
};

export default function Index({ stats }: DashboardProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex items-center justify-start gap-3 p-4">
                <div className="flex w-full flex-col items-center justify-center gap-2 rounded-2xl border border-gray-200/50 bg-gray-100 p-2">
                    <h1 className="text-xl font-bold text-slate-700">Departments:</h1>
                    <p className="text-xl font-semibold text-gray-900">{stats.totalDepartments}</p>
                </div>
                <div className="flex w-full flex-col items-center justify-center gap-2 rounded-2xl border border-gray-200/50 bg-gray-100 p-2">
                    <h1 className="text-xl font-bold text-slate-700">Total Staffs:</h1>
                    <p className="text-xl font-semibold text-gray-900">{stats.totalStaffs}</p>
                </div>
                <div className="flex w-full flex-col items-center justify-center gap-2 rounded-2xl border border-gray-200/50 bg-gray-100 p-2">
                    <h1 className="text-xl font-bold text-slate-700">New Hires:</h1>
                    <p className="text-xl font-semibold text-gray-900">{stats.newHires}</p>
                </div>
                <div className="flex w-full flex-col items-center justify-center gap-2 rounded-2xl border border-gray-200/50 bg-gray-100 p-2">
                    <h1 className="text-xl font-bold text-slate-700">Total Payroll</h1>
                    <p className="text-xl font-semibold text-gray-900">RM {stats.totalPayroll.toFixed(2).toLocaleString()}</p>
                </div>
            </div>
            <div className="flex items-stretch justify-start gap-3 p-4">
                <div className="flex w-6/12 flex-col items-start justify-start gap-2 rounded-2xl border border-gray-200/50 bg-gray-100 p-4">
                    <h1 className="text-xl font-bold text-slate-700">New Staffs</h1>
                    {stats.recentHires.map((staff, index) => (
                        <div key={index} className="flex w-full items-center justify-between p-1">
                            <div className="flex items-start justify-start gap-2">
                                <p className="font-medium text-slate-600">{index + 1}.</p>
                                <div className="flex flex-col gap-2">
                                    <p className="font-semibold text-slate-800">{staff.name}</p>
                                    <p className="text-sm text-gray-500">
                                        {staff.department} • {staff.position}
                                    </p>
                                </div>
                            </div>

                            <p className="text-sm text-gray-700">{staff.hiredAt}</p>
                        </div>
                    ))}
                </div>
                <div className="flex w-6/12 flex-col justify-start gap-4">
                    <div className="flex flex-col items-start justify-start gap-2 rounded-2xl border border-gray-200/50 bg-gray-100 p-4">
                        <h1 className="text-xl font-bold text-slate-700">Staffs by Departments</h1>
                        {stats.staffsCountByDepartment.map((dept, index) => (
                            <div key={index} className="flex w-full items-center justify-between p-3">
                                <div className="flex items-start justify-start gap-4">
                                    <p className="text-md font-semibold text-slate-800">{dept.name}</p>
                                </div>

                                <p className="text-sm text-gray-700">{dept.count}</p>
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-col items-start justify-start gap-2 rounded-2xl border border-gray-200/50 bg-gray-100 p-4">
                        <h1 className="text-xl font-bold text-slate-700">Absence Staffs Today</h1>
                        {/* {stats.staffsCountByDepartment.map((dept, index) => (
                            <div key={index} className="flex w-full items-center justify-between p-3">
                                <div className="flex items-start justify-start gap-4">
                                    <p className="text-md font-semibold text-slate-800">{dept.name}</p>
                                </div>

                                <p className="text-sm text-gray-700">{dept.count}</p>
                            </div>
                        ))} */}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
