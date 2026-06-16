import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';

import { Head, Link } from '@inertiajs/react';

interface Staff {
    id: number;
    preferredName: string;
    email: string;
    salary: number;
    position: {
        title: string;
    };
}

interface Position {
    id: number;
    title: string;
    basicSalary: string;
    staffs: Staff[];
}

interface Department {
    id: number;
    code: string;
    slug: string;
    name: string;
    description: string;
    positions: Position[];
}

interface PageProps extends Record<string, any> {
    flash: {
        message?: string;
    };
    key: any;
    departments: Department;
}

export default function Show({ departments }: PageProps) {
    const staffs = departments.positions.flatMap((position) =>
        position.staffs.map((staff) => ({
            ...staff,
            positionTitle: position.title,
        })),
    );

    return (
        <AppLayout
            breadcrumbs={[
                {
                    title: departments.name,
                    href: `/departments/${departments.slug}`,
                },
            ]}
        >
            <Head title={departments.name} />
            <div className="m-4 space-y-4">
                <div className="space-y-3">
                    <div className="flex items-center justify-start gap-2">
                        <h1 className="text-xl font-bold">Positions</h1>
                        <Link href={route('positions.create', departments.slug)}>
                            <Button size="sm" className="cursor-pointer text-xs">
                                Add Position
                            </Button>
                        </Link>
                    </div>
                    {departments.positions.length > 0 ? (
                        <h2 className="font-medium">{departments.positions.map((position) => position.title).join(', ')}</h2>
                    ) : (
                        <p>No positions yet.</p>
                    )}
                </div>
                <div className="space-y-3">
                    <h1 className="text-xl font-bold">Staffs</h1>

                    {staffs.length > 0 ? (
                        <div className="overflow-hidden rounded-lg border">
                            <table className="w-full">
                                <thead className="bg-muted">
                                    <tr>
                                        <th className="p-3 text-left">No.</th>
                                        <th className="p-3 text-left">Name</th>
                                        <th className="p-3 text-left">Email</th>
                                        <th className="p-3 text-left">Position</th>
                                        <th className="p-3 text-left">Salary</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {staffs.map((staff, index) => (
                                        <tr key={staff.id} className="border-t">
                                            <td className="p-3">{index + 1}</td>
                                            <td className="p-3">{staff.preferredName}</td>

                                            <td className="p-3">{staff.email}</td>

                                            <td className="p-3">{staff.positionTitle}</td>

                                            <td className="p-3">RM {Number(staff.salary).toLocaleString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p>No staffs in this department.</p>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
