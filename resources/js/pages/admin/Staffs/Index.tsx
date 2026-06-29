import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { Bell, Trash2 } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Staffs',
        href: '/staffs',
    },
];

interface Address {
    address1: string;
    address2: string;
    postalCode: string;
    city: string;
    state: string;
}

interface Staff {
    id: number;
    staff_id: string;
    firstName: string;
    lastName: string;
    preferredName: string;
    ic: string;
    age: number;
    gender: string;
    email: string;
    phoneNumber: string;
    address: Address;
}

interface PageProps extends Record<string, any> {
    flash: {
        message?: string;
    };
    key: any;
    staffs: Staff[];
}

export default function Index() {
    const { staffs, flash } = usePage<PageProps>().props;

    const { processing, delete: destroy } = useForm();

    const handleDelete = (id: string, firstName: string) => {
        if (confirm(`Are you sure you want to delete staff ${firstName}?`)) {
            destroy(route('staffs.destroy', id));
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Staffs" />
            <div className="m-4">
                <Link href={route('staffs.create')}>
                    <Button className="cursor-pointer">Create new staff</Button>
                </Link>
            </div>
            <div className="m-4">
                {flash.message && (
                    <Alert className="flex items-start justify-start gap-3">
                        <div>
                            <Bell className="h-5 w-5 shrink-0" />
                        </div>
                        <div>
                            <AlertTitle>Notification!</AlertTitle>
                            <AlertDescription>{flash.message}</AlertDescription>
                        </div>
                    </Alert>
                )}
            </div>

            <div className="m-4 min-w-0">
                <div className="overflow-x-auto">
                    <Table className="w-full min-w-300">
                        <TableCaption>A list of your recent staffs.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead>No.</TableHead>
                                <TableHead className="min-w-22">Staff ID</TableHead>
                                <TableHead className="min-w-37.5">First Name</TableHead>
                                <TableHead className="min-w-37.5">Last Name</TableHead>
                                <TableHead>IC</TableHead>
                                <TableHead>Age</TableHead>
                                <TableHead>Gender</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Phone Number</TableHead>
                                <TableHead>Address</TableHead>
                                <TableHead className="text-center">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {staffs.map((staff) => (
                                <TableRow key={staff.id}>
                                    <TableCell>{staff.id}</TableCell>
                                    <TableCell className="text-center font-medium">{staff.staff_id}</TableCell>
                                    <TableCell className="w-full">{staff.firstName}</TableCell>
                                    <TableCell className="w-full">{staff.lastName}</TableCell>
                                    <TableCell>{staff.ic}</TableCell>
                                    <TableCell className="text-center">{staff.age}</TableCell>
                                    <TableCell>{staff.gender}</TableCell>
                                    <TableCell>{staff.email}</TableCell>
                                    <TableCell>{staff.phoneNumber}</TableCell>
                                    <TableCell className="min-w-50">
                                        {staff.address.address1}, {staff.address.address2}, {staff.address.postalCode}, {staff.address.city},{' '}
                                        {staff.address.state}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center justify-center gap-2 text-center">
                                            <Link href={route('staffs.edit', staff.id)}>
                                                <Button size="sm" className="cursor-pointer">
                                                    Edit
                                                </Button>
                                            </Link>
                                            <Button
                                                onClick={() => handleDelete(staff.staff_id, staff.preferredName)}
                                                disabled={processing}
                                                className="cursor-pointer bg-red-500 hover:bg-red-700"
                                            >
                                                <Trash2 />
                                            </Button>
                                        </div>
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
