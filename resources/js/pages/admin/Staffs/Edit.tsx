import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { InfoIcon } from 'lucide-react';

interface Address {
    address1: string;
    address2: string;
    postalCode: string;
    city: string;
    state: string;
}

interface Staff {
    id: string;
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

interface Props {
    staffs: Staff;
}

export default function Edit({ staffs }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        firstName: staffs.firstName,
        lastName: staffs.lastName,
        preferredName: staffs.preferredName,
        ic: staffs.ic,
        age: staffs.age,
        gender: staffs.gender,
        phoneNumber: staffs.phoneNumber,
        email: staffs.email,
        address: {
            address1: staffs.address.address1,
            address2: staffs.address.address2,
            postalCode: staffs.address.postalCode,
            city: staffs.address.city,
            state: staffs.address.state,
        },
        // salary: '',
        // department: '',
        // position: '',
    });

    const generateEmail = (pname: string) => {
        const generated = `${pname}@company.com`.toLowerCase().replace(/\s+/g, '');

        setData('email', generated);
    };

    const handlePreferredName = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setData('preferredName', value);
        generateEmail(value); //, data.department
    };

    // const handleDepartment = (value: string) => {
    //     setData('department', value);
    //     generateEmail(data.preferredName, value);
    // };

    const handleIC = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        setData('ic', value);

        if (value.length >= 2) {
            const yearPrefix = parseInt(value.substring(0, 2));

            const currentYear = new Date().getFullYear() % 100;

            const fullYear = yearPrefix <= currentYear ? 2000 + yearPrefix : 1900 + yearPrefix;

            const age = new Date().getFullYear() - fullYear;

            setData('age', age);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('staffs.update', staffs.id));
    };

    return (
        <AppLayout
            breadcrumbs={[
                {
                    title: 'Edit Staff Details',
                    href: `/staffs/${staffs.id}/edit`,
                },
            ]}
        >
            <Head title="Update Staff" />
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
                    {/* <div className="flex items-center justify-start gap-2">
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
                    <div className="flex items-center justify-start gap-2">
                        <Label htmlFor="department" className="w-22">
                            Department :
                        </Label>
                        <Select value={data.department} onValueChange={handleDepartment}>
                            <SelectTrigger id="department" className="w-fit">
                                <SelectValue placeholder="Department" />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value="ACC">Accounting</SelectItem>
                                <SelectItem value="AUDIT">Audit</SelectItem>
                                <SelectItem value="HR">Human Resource</SelectItem>
                                <SelectItem value="TAX">Tax</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex items-center justify-start gap-2">
                        <Label htmlFor="position" className="w-20">
                            Position :
                        </Label>
                        <Input
                            id="position"
                            placeholder="Position"
                            className=""
                            value={data.position}
                            onChange={(e) => setData('position', e.target.value)}
                        ></Input>
                    </div> */}
                    <div className="flex w-full justify-end">
                        <Button disabled={processing} type="submit" className="cursor-pointer">
                            Update
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
