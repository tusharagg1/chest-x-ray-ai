/*
 * Author: Allison Cook
 * Date Created: March 2024
 * Purpose: Create exported table element to display custom table, no headers for small display on X-ray page
 */
/* eslint-disable @typescript-eslint/ban-ts-comment */
//ts comments stop errors that didn't effect compliation or function
//referenced: https://www.bekk.christmas/post/2020/22/create-a-generic-table-with-react-and-typescript
type ColumnDefinitionType<T, K extends keyof T> = {
  key: K;
  header: string;
  width?: number | string;
};

type TableProps<T, K extends keyof T> = {
  data: Array<T>;
  columns: Array<ColumnDefinitionType<T, K>>;
};

const Tstyle = {
  width: '100%',
  height: '50%',
} as const;

// creating final table element
const SingleTable = <T, K extends keyof T>({
  data,
  columns,
}: TableProps<T, K>): JSX.Element => {
  return (
    <table style={Tstyle}>
      <TableRows data={data} columns={columns} />
    </table>
  );
};

type TableRowsProps<T, K extends keyof T> = {
  data: Array<T>;
  columns: Array<ColumnDefinitionType<T, K>>;
};

// row style
const Sstyle = {
  borderTop: '1px solid gray',
  borderBottom: '1px solid gray',
  backgroundColor: 'white',
  height: '4vh',
  paddingLeft: '3%',
};

// building of the table rows using the data given
const TableRows = <T, K extends keyof T>({
  data,
  columns,
}: TableRowsProps<T, K>): JSX.Element => {
  const rows = data.map((row, index) => {
    return (
      <tr key={`row-${index}`}>
        {columns.map((column, index2) => {
          return (
            <td key={`cell-${index2}`} style={Sstyle}>
              {/* @ts-ignore */}
              {row[column.key]}
            </td>
          );
        })}
      </tr>
    );
  });

  return <tbody>{rows}</tbody>;
};

export default SingleTable;
