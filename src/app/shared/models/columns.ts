export interface Column {
  id: string;
  title?: string;
  disableSorting?: boolean;
  template?: string;
  sort?: string;
  width?: string;
  searchable?: boolean;
}
