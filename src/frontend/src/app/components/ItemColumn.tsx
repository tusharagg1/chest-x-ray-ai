/*
* Author: Allison Cook
* Date Created: January 2024
* Purpose: Create column defintions used for table elements for predicted risk 
*/
type Item = {
  name: string;
  risk: number;
};

type ColumnDefinitionType<T, K extends keyof T> = {
  key: K;
  header: string;
  width?: number | string;
};

const cols: ColumnDefinitionType<Item, keyof Item>[] = [
  {
    key: 'name',
    header: 'Name',
  },
  {
    key: 'risk',
    header: 'Risk',
  },
];

export default cols;
export type { Item };
