import { createAction, props } from '@ngrx/store';
import { Action } from '@ngrx/store';
import { Employee } from './employee.model';

export const getEmployees = createAction(
  '[Employee Component] GetEmployee'
);
export const saveEmployee = createAction(
  '[Employee Component] SaveEmployee',
  props<{ employees: Employee}>()
);
console.log("indisede emp actions");

export const updateEmployee= createAction(
    '[Employee Component] UpdateEmployee',
    props<{ employees: any }>()
  );

 
