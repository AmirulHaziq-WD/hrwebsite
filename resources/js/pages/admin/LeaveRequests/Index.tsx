import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router, useForm, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Leave Requests',
        href: '/admin/leave-requests',
    },
];

interface Staff {
    preferredName: string;
}

interface LeaveType {
    id: number;
    name: string;
    default_days: number;
}

interface LeaveRequests {
    id: number;
    staff_id: string;
    staff: Staff;
    leave_type_id: number;
    leave_type: LeaveType;
    start_date: string;
    end_date: string;
    reason: string;
    status: 'pending' | 'approved' | 'rejected';
}

interface PageProps extends Record<string, any> {
    flash: {
        message?: string;
    };
    key: any;
    leaveRequests: LeaveRequests[];
}

export default function Index() {
    const { leaveRequests } = usePage<PageProps>().props;

    const { processing } = useForm();

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Leave Requests" />
            <div className="m-4">
                <Table className="w-full min-w-300">
                    <TableCaption>A list of your recent staffs' leave application.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-30">Staff</TableHead>
                            <TableHead className="max-w-20">Type of Leave</TableHead>
                            <TableHead className="">From</TableHead>
                            <TableHead>To</TableHead>
                            <TableHead>Reason</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {leaveRequests.map((leave) => (
                            <TableRow key={leave.id}>
                                <TableCell>{leave.staff.preferredName}</TableCell>
                                <TableCell>{leave.leave_type.name}</TableCell>
                                <TableCell>{leave.start_date}</TableCell>
                                <TableCell>{leave.end_date}</TableCell>
                                <TableCell>{leave.reason}</TableCell>
                                <TableCell>{leave.status}</TableCell>
                                <TableCell>
                                    <div className="flex items-center justify-center gap-2 text-center">
                                        <Button
                                            onClick={() => router.patch(route('admin-leave.approve', leave.id))}
                                            disabled={processing}
                                            className="cursor-pointer bg-red-500 hover:bg-red-700"
                                        >
                                            Approve
                                        </Button>
                                        <Button
                                            variant="destructive"
                                            onClick={() => router.patch(route('admin-leave.reject', leave.id))}
                                            disabled={processing}
                                            className="cursor-pointer bg-red-500 hover:bg-red-700"
                                        >
                                            Reject
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </AppLayout>
    );
}
