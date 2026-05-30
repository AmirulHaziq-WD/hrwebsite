import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';

import { Head, Link } from '@inertiajs/react';

interface Position {
    id: number;
    title: string;
    basicSalary: string;
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
                <h2 className="items-start text-[14px] italic">{departments.description}</h2>
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
            </div>
        </AppLayout>
    );
}
