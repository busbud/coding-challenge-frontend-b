export type Operator = {
  display_name: string;
  id: string;
  logo_url: string;
  name: string;
  url: string;
};

export type OperatorState = {
  operators: Operator[];
};

export default {
  operators: [],
} as OperatorState;
