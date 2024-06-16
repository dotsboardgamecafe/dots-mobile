import { type ValidationRule } from 'react-hook-form'

export interface RulesType {
  required?: string | ValidationRule<boolean> | undefined;
  minLength?: ValidationRule<number>;
}
export interface DefaultRulesResults {
  value: boolean | number | string;
  message: string;
}