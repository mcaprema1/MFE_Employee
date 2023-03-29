import { createReducer, on } from '@ngrx/store';
import { getProjects, saveProject, updateProject } from './project.action';
// import { EmpAction, ActionTypes} from './employee.actions'
import { Project } from './project.model';
import { groupBy } from 'lodash-es';
import { Action } from "@ngrx/store";

export interface ProjectState {
  allProjects: Project[];
//   selectedProject: Project;
}

const initialState: ProjectState = {
  allProjects: [],
};

export const projectReducer = createReducer(
  initialState,
  on(getProjects, (state) => ({
    ...state,
    // allProjects: projects,
  })),
  on(saveProject, (state, { projects }) => ({
    ...state, allProjects: [...state.allProjects, projects],
  }) ),

  on(updateProject, state => ({
    ...state,
  }))
  
);

