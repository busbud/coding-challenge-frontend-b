export type TAction = {
  type: string;
  error?: Error;
  payload?: Record<string, any>;
};
