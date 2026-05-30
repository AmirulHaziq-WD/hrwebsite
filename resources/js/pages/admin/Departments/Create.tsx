import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

import { Head, useForm } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create Department',
        href: '/departments/create',
    },
];

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        code: '',
        description: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('departments.store'));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Departments" />
            <div className="m-4">
                <form onSubmit={handleSubmit} className="flex flex-col gap-6 space-y-4">
                    <div className="gap-6 space-y-4">
                        <div className="flex items-center justify-between space-x-4">
                            <Label htmlFor="name" className="w-94">
                                Department Name :
                            </Label>
                            <Input id="name" placeholder="Department Name" value={data.name} onChange={(e) => setData('name', e.target.value)} />
                            <Label htmlFor="code" className="w-92">
                                Department Code :
                            </Label>
                            <Input id="code" placeholder="Department Code" value={data.code} onChange={(e) => setData('code', e.target.value)} />
                        </div>
                        <Label htmlFor="description" className="">
                            Description :
                        </Label>
                        <Textarea
                            id="description"
                            placeholder="Description"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                        />
                    </div>
                    <div className="flex justify-end">
                        <Button type="submit" disabled={processing} className="cursor-pointer">
                            Create
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
