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
 
  on(saveEmployee, (state, { employees }) => {
    console.log("saved employee", state, employees);
    alert("Data has been saved in Store")
    return {...state, allEmployees: [...state.allEmployees, employees]}
  }),
  
  // on(updateEmployee,(state, { employees })  => {
  //   let duplicateEmployee = [...state.allEmployees]
  //   console.log("tempsssss : ", employees, duplicateEmployee);
  //   const updatedEmployee = duplicateEmployee.findIndex(
  //     item => employees.empId=== item.empId ? employees.projectId= employees.projectId : employees);
  //     console.log("updatedEmployee : ", updatedEmployee);
  //     return { ...state, allEmployees: [...state.allEmployees, employees] };
     
  // })),
  on(updateEmployee,(state, { employees })  => {
  return {
    ...state,
    allEmployees: [
      ...state.allEmployees.slice(0,employees.index),
       {
        ...state.allEmployees[employees.index],
          projectId: employees.projectId
      },
        ...state.allEmployees.slice(employees.index + 1)
      ]
    }
  }));
// return {
//   ...state,
//   beneficiaries: {
//     ...state.beneficiaries,
//     beneficiaries: [
//       ...state.beneficiaries.beneficiaries.slice(0, action.index),
//       {
//         ...state.beneficiaries.beneficiaries[action.index],
//         name: action.value
//       },
//       ...state.beneficiaries.beneficiaries.slice(action.index + 1)
//     ]
//   }
// };
// }


  // return{...state, allEmployees: state.allEmployees
  //   .map(navGroup => ({...navGroup}))
  //   .map(navGroup=>
  //   {(navGroup.empId===employees.empId) ? {return {...navGroup :else{return navGroup;}}})
