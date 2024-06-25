export interface FilterItemListProps {
  label: string,
  selected: boolean,
  onClick: (label: string, param?: any) => void,
  clickParam?: any
}