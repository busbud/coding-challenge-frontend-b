export interface IErrorDTO {
  action_type: string;
  additional_data: object;
  code: number;
  details: string;
  error_type: string;
  system_part: string;
  type: string;
  user_visible: boolean;
}
