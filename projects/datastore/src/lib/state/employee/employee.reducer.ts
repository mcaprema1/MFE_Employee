import { createReducer, on } from '@ngrx/store';
import { getEmployees, saveEmployee, updateEmployee } from './employee.actions';
// import { EmpAction, ActionTypes} from './employee.actions'
import { Employee } from './employee.model';
import { groupBy } from 'lodash-es';
import { Action } from "@ngrx/store";

export interface EmployeeState {
  allEmployees: Employee[];
//   selectedEmployee: Employee;
}

const initialState: EmployeeState = {
    allEmployees: [],
  };

export const employeesReducer = createReducer(
  initialState,
  on(getEmployees, (state) => ({
    ...state,
  })),
  on(saveEmployee, (state, { employees }) => ({
    ...state,
    allEmployees: Array(employees),
  }) ),

  on(updateEmployee, state => ({
    ...state,
  }))
  
);

