import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { InfoIcon } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [];

type Props = {
    departments: {
        id: number;
        slug: string;
        name: string;
        code: string;
    };
};

export default function Create({ departments }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        basicSalary: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('positions.store', departments.slug));
    };

    return (
        <AppLayout
            breadcrumbs={[
                {
                    title: 'Create Position',
                    href: `departments/${departments.slug}/positions/create`,
                },
            ]}
        >
            <Head title="Create Position" />
            <div className="m-4">
                <form onSubmit={handleSubmit} className="flex w-full flex-wrap justify-start gap-6">
                    {/* Display errors */}

                    {Object.keys(errors).length > 0 && (
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
                    )}

                    {/* Position Title */}

                    <div className="space-y-4">
                        <Label htmlFor="title">Position Title</Label>

                        <Input
                            id="title"
                            placeholder="Example: Senior Auditor"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                        />

                        {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
                    </div>

                    {/* Basic Salary */}

                    <div className="space-y-4">
                        <Label htmlFor="basicSalary">Basic Salary (RM)</Label>

                        <Input
                            id="basicSalary"
                            type="number"
                            step="0.01"
                            placeholder="3000.00"
                            value={data.basicSalary}
                            onChange={(e) => setData('basicSalary', e.target.value)}
                        />

                        {errors.basicSalary && <p className="text-sm text-red-500">{errors.basicSalary}</p>}
                    </div>

                    {/* Submit */}

                    <div className="flex items-center justify-end">
                        <Button type="submit" disabled={processing} className="cursor-pointer">
                            Create Position
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
