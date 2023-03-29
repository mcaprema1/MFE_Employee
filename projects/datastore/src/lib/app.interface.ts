import { ProjectState } from './state/project/project.reducer';
import { EmployeeState } from './state/employee/employee.reducer';

export interface AppState {
  employees: EmployeeState;
  projects: ProjectState;
}
export const employees = 'employees';
export const projects = 'projects';