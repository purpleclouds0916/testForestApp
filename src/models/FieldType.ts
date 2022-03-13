export interface FieldType {
  id: string;
  title: string;
  description: string;
  unit?: string;
  validators?: {
    id: string;
    isValidFun: (state: string) => boolean;
    alert: string;
  }[];
}
