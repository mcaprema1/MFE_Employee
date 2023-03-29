import { createReducer, on } from '@ngrx/store';
import { getProjects, saveProject, updateProject } from './project.action';
// import { EmpAction, ActionTypes} from './employee.actions'
import { Project } from './project.model';
import { groupBy } from 'lodash-es';
import { Action } from "@ngrx/store";

export interface ProjectState {
  allProject: Project[];
//   selectedProject: Project;
}

const initialState: any = []

export const projectReducer = createReducer(
  initialState,
  on(getProjects, (state, { projects }) => ({
    ...state,
    allProjects: projects,
  })),
  on(saveProject, (state, { projects }) => ({
    ...state,
    allProjects: Array(projects),
  }) ),

  on(updateProject, state => ({
    ...state,
  }))
  
);

