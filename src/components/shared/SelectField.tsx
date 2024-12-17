import { MenuItem, TextField } from '@mui/material';

interface Props<T, U> {
    label: string;
    options: T[];
    idField: keyof T;
    labelField: keyof T;
    value?: U;
    onChange: (value: U) => void;
}

export function SelectField<T,U>({ label, options, idField, labelField, value, onChange }: Props<T, U>) {
    return (
        <TextField select label={label} value={value || ''} fullWidth onChange={(e) => onChange(e.target.value as U)}>
            <MenuItem value={undefined}> ------- </MenuItem>
            {options.map((option: T) => (
                <MenuItem key={String(option[idField])} value={option[idField] as string | number}>
                    {String(option[labelField])}
                </MenuItem>
            ))}
        </TextField>
    );
}
