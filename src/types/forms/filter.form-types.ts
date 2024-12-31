export interface Filter<T> {
    text: string;
    fields: (keyof T)[];
    query: Partial<T>;
}


export type FilterOption<T> = {
    id: keyof T;
    label: string;
};