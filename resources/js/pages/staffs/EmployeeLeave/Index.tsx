import { DatePicker } from '@/components/date-picker';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Leave',
        href: '/staffs/leave',
    },
];

interface LeaveType {
    id: number;
    name: string;
    defaultDays: number;
}

interface LeaveRequest {
    id: number;
    staffId: string;
    leave_type_id: number;
    leave_type: LeaveType;
    start_date: string;
    end_date: string;
    reason: string;
    status: 'pending' | 'approved' | 'rejected';
}

interface Staff {
    id: string;
}

interface LeaveProps {
    leaveTypes: LeaveType[];
    leaveRequests: LeaveRequest[];
    staff: Staff;
}

export default function Index({ leaveRequests, leaveTypes, staff }: LeaveProps) {
    const { data, setData, post, processing, errors } = useForm({
        staff_id: staff.id,
        leave_type_id: '',
        start_date: '',
        end_date: '',
        reason: '',
    });

    const submitLeave = (e: React.FormEvent) => {
        e.preventDefault();

        post(route('leave.store'));
    };

    const formatDate = (date: Date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Leave" />
            <div className="flex w-full flex-col gap-5 p-4">
                <form onSubmit={submitLeave} className="flex w-full flex-wrap justify-start gap-6">
                    {/* Display errors */}

                    {/* {Object.keys(errors).length > 0 && (
                        <Alert className="flex items-start justify-start gap-3">
                            <div>
                                <InfoIcon className="h-5 w-5 shrink-0" />
                            </div>
                            <div>
                                <AlertTitle>Error!</AlertTitle>
                                <AlertDescription>
                                    <ul>
                                        {Object.entries(errors).map(([key, message]) => (
                                            <li key={key}>{message as string}</li>
                                        ))}
                                    </ul>
                                </AlertDescription>
                            </div>
                        </Alert>
                    )} */}
                    <h1 className="text-2xl">Apply Leave</h1>
                    <div className="flex w-full items-center justify-start gap-2">
                        <Label htmlFor="leave-type" className="w-24">
                            Leave Type :
                        </Label>
                        <Select value={data.leave_type_id} onValueChange={(value) => setData('leave_type_id', value)}>
                            <SelectTrigger id="leave-type" className="w-full">
                                <SelectValue placeholder="Type of Leave" />
                            </SelectTrigger>

                            <SelectContent>
                                {leaveTypes.map((type) => (
                                    <SelectItem key={type.id} value={type.id.toString()}>
                                        {type.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex w-full items-center justify-between gap-10">
                        <div className="flex w-full items-center justify-start gap-2">
                            <Label htmlFor="start_date" className="w-12">
                                From :
                            </Label>
                            <DatePicker
                                value={data.start_date ? new Date(data.start_date) : undefined}
                                onChange={(date) => setData('start_date', date ? formatDate(date) : '')}
                            />
                        </div>
                        <div className="flex w-full items-center justify-end gap-2">
                            <Label htmlFor="end_date" className="w-8">
                                To :
                            </Label>
                            <DatePicker
                                value={data.end_date ? new Date(data.end_date) : undefined}
                                onChange={(date) => setData('end_date', date ? formatDate(date) : '')}
                            />
                        </div>
                    </div>
                    <div className="flex w-full flex-col items-start justify-start gap-2">
                        <Label htmlFor="reason" className="">
                            Reason :
                        </Label>
                        <Textarea value={data.reason} onChange={(e) => setData('reason', e.target.value)} />
                    </div>
                    <div className="flex w-full justify-end">
                        <Button type="submit" disabled={processing} className="cursor-pointer">
                            Submit
                        </Button>
                    </div>
                </form>
                <div className="flex w-full flex-col">
                    <h1 className="text-2xl">My Leave History</h1>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Type</TableHead>
                                <TableHead>From</TableHead>
                                <TableHead>To</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {leaveRequests?.map((leave) => (
                                <TableRow key={leave.id}>
                                    <TableCell>{leave.leave_type.name}</TableCell>

                                    <TableCell>{leave.start_date}</TableCell>

                                    <TableCell>{leave.end_date}</TableCell>

                                    <TableCell>
                                        <Badge
                                            variant={
                                                leave.status === 'approved' ? 'default' : leave.status === 'pending' ? 'secondary' : 'destructive'
                                            }
                                        >
                                            {leave.status}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </AppLayout>
    );
}
