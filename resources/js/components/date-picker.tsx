import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

type Props = {
    value?: Date;
    onChange: (date: Date | undefined) => void;
};

export function DatePicker({ value, onChange }: Props) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />

                    {value ? format(value, 'PPP') : 'Select date'}
                </Button>
            </PopoverTrigger>

            <PopoverContent className="w-auto">
                <Calendar mode="single" selected={value} onSelect={onChange} disabled={(date) => date < new Date()} />
            </PopoverContent>
        </Popover>
    );
}
