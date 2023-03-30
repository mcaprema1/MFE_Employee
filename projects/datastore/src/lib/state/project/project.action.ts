import { createAction, props } from '@ngrx/store';
import { Action } from '@ngrx/store';
import { Project } from './project.model';

export const getProjects = createAction(
  '[Employee Component] GetProject',
  // props<{ projects: Project[] }>()
);
export const saveProject = createAction(
  '[Employee Component] SaveProject',
  props<{ projects: Project }>()
);

export const updateProject= createAction(
    '[Employee Component] UpdateProject',
    props<{ projects: Project }>()
  );