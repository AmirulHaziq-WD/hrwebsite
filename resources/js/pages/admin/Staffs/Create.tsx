import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { InfoIcon } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'New Staff',
        href: '/staffs/create',
    },
];

type Position = {
    id: number;
    title: string;
    basicSalary: string;
};

type Department = {
    id: number | string;
    code: string;
    name: string;
    positions: Position[];
};

export default function Create({ departments }: { departments: Department[] }) {
    const { data, setData, post, processing, errors } = useForm({
        firstName: '',
        lastName: '',
        preferredName: '',
        ic: '',
        age: '',
        gender: '',
        phoneNumber: '',
        email: '',
        address: {
            address1: '',
            address2: '',
            postalCode: '',
            city: '',
            state: '',
        },
        salary: '',
        departments_id: '',
        position_id: '',
    });

    const generateEmail = (pname: string, dcode: string) => {
        const generated = `${pname}.${dcode}@company.com`.toLowerCase().replace(/\s+/g, '');

        setData('email', generated);
    };

    const handlePreferredName = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        setData('preferredName', value);

        const selectedDepartment = departments.find((department) => department.id.toString() === data.departments_id);

        generateEmail(value, selectedDepartment?.code || '');
    };

    const handleDepartment = (value: string) => {
        setData('departments_id', value);

        const selectedDepartment = departments.find((department) => department.id.toString() === value);

        generateEmail(data.preferredName, selectedDepartment?.code || '');
    };

    const handlePosition = (value: string) => {
        setData('position_id', value);

        const selectedDepartment = departments.find((department) => department.id.toString() === data.departments_id);

        const selectedPosition = selectedDepartment?.positions.find((position) => position.id.toString() === value);

        if (selectedPosition) {
            setData('salary', selectedPosition.basicSalary);
        }
    };

    const handleIC = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        setData('ic', value);

        if (value.length >= 2) {
            const yearPrefix = parseInt(value.substring(0, 2));

            const currentYear = new Date().getFullYear() % 100;

            const fullYear = yearPrefix <= currentYear ? 2000 + yearPrefix : 1900 + yearPrefix;

            const age = new Date().getFullYear() - fullYear;

            setData('age', age.toString());
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route('staffs.store'));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="New Staff" />
            <div className="w-full p-4">
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

                    <div className="flex w-[48%] items-center justify-start">
                        <Label htmlFor="firstName" className="w-26">
                            First Name :
                        </Label>
                        <Input
                            id="firstName"
                            placeholder="First Name"
                            className=""
                            value={data.firstName}
                            onChange={(e) => setData('firstName', e.target.value)}
                        ></Input>
                    </div>
                    <div className="flex w-[48%] items-center justify-start">
                        <Label htmlFor="lastName" className="w-26">
                            Last Name :
                        </Label>
                        <Input
                            id="lastName"
                            placeholder="Last Name"
                            className=""
                            value={data.lastName}
                            onChange={(e) => setData('lastName', e.target.value)}
                        ></Input>
                    </div>
                    <div className="flex items-center justify-start gap-2">
                        <Label htmlFor="preferredName" className="w-42">
                            Preferred Name :
                        </Label>
                        <Input
                            id="preferredName"
                            placeholder="Preffered Name"
                            className="w-full"
                            value={data.preferredName}
                            onChange={handlePreferredName}
                        ></Input>
                    </div>
                    <div className="flex items-center justify-start gap-2">
                        <Label htmlFor="ic" className="w-7">
                            I/C :
                        </Label>
                        <Input id="ic" placeholder="I/C Number" className="w-50" value={data.ic} onChange={handleIC}></Input>
                    </div>
                    <div className="flex place-items-center justify-start gap-2">
                        <Label htmlFor="age" className="w-9">
                            Age :
                        </Label>
                        <Input id="age" placeholder="Age" className="w-14" value={data.age} readOnly></Input>
                    </div>
                    <div className="flex items-center justify-start gap-2">
                        <Label htmlFor="gender" className="w-15">
                            Gender :
                        </Label>
                        <Select value={data.gender} onValueChange={(value) => setData('gender', value)}>
                            <SelectTrigger id="gender" className="w-fit">
                                <SelectValue placeholder="Gender" />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value="Male">Male</SelectItem>
                                <SelectItem value="Female">Female</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex items-center justify-start gap-2">
                        <Label htmlFor="phoneNumber" className="w-32">
                            Phone Num. :
                        </Label>
                        <Input
                            id="phoneNumber"
                            placeholder="Phone Number"
                            className=""
                            value={data.phoneNumber}
                            onChange={(e) => setData('phoneNumber', e.target.value)}
                        ></Input>
                    </div>
                    <div className="flex items-center justify-start gap-2">
                        <Label htmlFor="email" className="w-12">
                            Email :
                        </Label>
                        <Input id="email" placeholder="Email" className="w-65" value={data.email} readOnly></Input>
                    </div>
                    <div className="flex w-full flex-col justify-start gap-2">
                        <Label className="w-32">Address :</Label>
                        <div className="flex gap-2">
                            <Input
                                placeholder="Address 1"
                                value={data.address.address1}
                                onChange={(e) =>
                                    setData('address', {
                                        ...data.address,
                                        address1: e.target.value,
                                    })
                                }
                                className=""
                            ></Input>
                            <Input
                                placeholder="Address 2"
                                value={data.address.address2}
                                onChange={(e) =>
                                    setData('address', {
                                        ...data.address,
                                        address2: e.target.value,
                                    })
                                }
                                className=""
                            ></Input>
                        </div>
                        <div className="flex gap-2">
                            <Input
                                placeholder="Postal Code"
                                value={data.address.postalCode}
                                onChange={(e) =>
                                    setData('address', {
                                        ...data.address,
                                        postalCode: e.target.value,
                                    })
                                }
                                className=""
                            ></Input>
                            <Input
                                placeholder="City"
                                value={data.address.city}
                                onChange={(e) =>
                                    setData('address', {
                                        ...data.address,
                                        city: e.target.value,
                                    })
                                }
                                className=""
                            ></Input>
                            <Input
                                placeholder="State"
                                value={data.address.state}
                                onChange={(e) =>
                                    setData('address', {
                                        ...data.address,
                                        state: e.target.value,
                                    })
                                }
                                className=""
                            ></Input>
                        </div>
                    </div>
                    <div className="flex items-center justify-start gap-2">
                        <Label htmlFor="department" className="w-22">
                            Department :
                        </Label>
                        <Select value={data.departments_id} onValueChange={handleDepartment}>
                            <SelectTrigger id="department" className="w-fit">
                                <SelectValue placeholder="Department" />
                            </SelectTrigger>

                            <SelectContent>
                                {departments.map((department) => (
                                    <SelectItem key={department.id} value={department.id.toString()}>
                                        {department.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex items-center justify-start gap-2">
                        <Label htmlFor="position" className="w-20">
                            Position :
                        </Label>
                        <Select value={data.position_id} onValueChange={handlePosition}>
                            <SelectTrigger id="position" className="w-fit">
                                <SelectValue placeholder="Position" />
                            </SelectTrigger>

                            <SelectContent>
                                {departments
                                    .find((department) => department.id.toString() === data.departments_id)
                                    ?.positions.map((position) => (
                                        <SelectItem key={position.id} value={position.id.toString()}>
                                            {position.title}
                                        </SelectItem>
                                    ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex items-center justify-start gap-2">
                        <Label htmlFor="salary" className="w-22">
                            Salary (RM):
                        </Label>
                        <Input
                            name="salary"
                            placeholder="Salary"
                            className="w-fit"
                            type="number"
                            step="0.01"
                            value={data.salary}
                            onChange={(e) => setData('salary', e.target.value)}
                            onBlur={() => {
                                if (data.salary) {
                                    setData('salary', parseFloat(data.salary).toFixed(2));
                                }
                            }}
                        />
                    </div>
                    <div className="flex w-full justify-end">
                        <Button disabled={processing} type="submit" className="cursor-pointer">
                            Create
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
