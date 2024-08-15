import { MenuItem, TextField } from '@mui/material';

interface Props<T> {
    label: string;
    options: T[];
    idField: keyof T;
    labelField: keyof T;
    value?: string | number;
    onChange: (value: string | number) => void;
}

export function SelectField<T>({ label, options, idField, labelField, value, onChange }: Props<T>) {
    return (
        <TextField select label={label} value={value || ''} fullWidth onChange={(e) => onChange(e.target.value as string | number)}>
            {options.map((option: T) => (
                <MenuItem key={String(option[idField])} value={option[idField] as string | number}>
                    {String(option[labelField])}
                </MenuItem>
            ))}
        </TextField>
    );
}
