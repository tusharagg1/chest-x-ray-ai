
type PatientRow = {
    Title : string|null
    Value: string|number|null
}

type ColumnDefinitionType<T, K extends keyof T> = {
    key: K;
    header: string;
    width?: number|string;
}

const cols: ColumnDefinitionType<PatientRow, keyof PatientRow>[] = [
    {
        key: 'Title',
        header: ' ',
    },
    {
        key: 'Value',
        header: ' '
    },
]

export default cols
export type {PatientRow}