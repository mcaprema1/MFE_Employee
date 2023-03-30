import { createAction, props } from '@ngrx/store';
import { Action } from '@ngrx/store';
import { Employee } from './employee.model';

export const getEmployees = createAction(
  '[Movie Component] GetEmployee'
);
export const saveEmployee = createAction(
  '[Movie Component] SaveEmployee',
  props<{ employees: Employee}>()
);
console.log("indisede emp actions");

export const updateEmployee= createAction(
    '[Movie Component] UpdateEmployee',
    props<{ employees: any }>()
  );

 
