import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

import { Head, Link, usePage } from '@inertiajs/react';
import { Bell } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Departments',
        href: '/departments',
    },
];

interface Department {
    id: number;
    code: string;
    slug: string;
    name: string;
    description: string;
}

interface PageProps extends Record<string, any> {
    flash: {
        message?: string;
    };
    key: any;
    departments: Department[];
}

export default function Index() {
    const { departments, flash } = usePage<PageProps>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Departments" />
            <div className="m-4 flex gap-4">
                <Link href={route('departments.create')}>
                    <Button className="cursor-pointer">Create a Department</Button>
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
            {departments.length > 0 && (
                <div className="m-4 flex justify-start gap-4">
                    {departments.map((department) => (
                        <Link key={department.id} href={route('departments.show', department.slug)}>
                            <Button className="cursor-pointer">{department.name}</Button>
                        </Link>
                    ))}
                </div>
            )}
        </AppLayout>
    );
}
