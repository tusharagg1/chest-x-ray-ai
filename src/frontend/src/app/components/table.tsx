//cite: https://www.bekk.christmas/post/2020/22/create-a-generic-table-with-react-and-typescript
import './table.css';

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
  borderCollapse: 'collapse',
  width: '80vw',
  height: '37vh',
} as const;

if (typeof document !== 'undefined') {
  document.addEventListener(`click`, handle);
}

function handle(evt) {
  // only do something if a checkbox was clicked
  if (evt.target.type === `checkbox`) {
    const isChecked = evt.target.checked;
    const selectedRow = evt.target.closest(`tr`);
    const tds = Array.from(selectedRow.cells).map((td) => td.textContent);
    const pid = tds[0];
    //can we send this to the backend to get again on the other pages please
    // reset checkboxes, row coloring and disabled state
    document.querySelectorAll(`input[type='checkbox']`).forEach((cb) => {
      cb.checked = cb !== evt.target ? false : isChecked;
      const row = cb.closest(`tr`);
      row.classList[isChecked && row === selectedRow ? `add` : `remove`](
        'selected'
      );
    });
    return tds;
  }
}

const Table = <T, K extends keyof T>({
  data,
  columns,
}: TableProps<T, K>): JSX.Element => {
  return (
    <table style={Tstyle} id='tid'>
      <TableHeader columns={columns} />
      <TableRows data={data} columns={columns} />
    </table>
  );
};

type TableHeaderProps<T, K extends keyof T> = {
  columns: Array<ColumnDefinitionType<T, K>>;
};

const TableHeader = <T, K extends keyof T>({
  columns,
}: TableHeaderProps<T, K>): JSX.Element => {
  const headers = columns.map((column, index) => {
    const style = {
      width: column.width ?? '10%', // 100 is our default value if width is not defined
      borderBottom: '2px solid black',
      border: '2px solid gray',
      backgroundColor: 'rgb(229, 231, 235)',
      fontsize: '10',
      height: '20%',
    };

    return (
      <th key={`headCell-${index}`} style={style}>
        {column.header}
      </th>
    );
  });

  return (
    <thead>
      <tr>{headers}</tr>
    </thead>
  );
};

type TableRowsProps<T, K extends keyof T> = {
  data: Array<T>;
  columns: Array<ColumnDefinitionType<T, K>>;
};

const Sstyle = {
  border: '2px solid gray',
  height: '6vh',
};

const TableRows = <T, K extends keyof T>({
  data,
  columns,
}: TableRowsProps<T, K>): JSX.Element => {
  let counter = 0;
  const rows = data.map((row, index) => {
    return (
      <tr key={`row-${index}`}>
        {columns.map((column, index2) => {
          counter = counter + 1;
          if (counter % 9 == 0) {
            return (
              <td key={`cell-${index2}`} style={Sstyle}>
                <input
                  type='checkbox'
                  id='yes'
                  style={{
                    border: 'solid #6366F1',
                    color: '#6366F1',
                  }}
                ></input>
              </td>
            );
          } else {
            return (
              <td key={`cell-${index2}`} style={Sstyle}>
                {row[column.key]}
              </td>
            );
          }
        })}
      </tr>
    );
  });

  return <tbody>{rows}</tbody>;
};

export default Table;
