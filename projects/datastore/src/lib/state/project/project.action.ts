import { createAction, props } from '@ngrx/store';
import { Action } from '@ngrx/store';
import { Project } from './project.model';

export const getProjects = createAction(
  '[Movie Component] GetProject',
  props<{ projects: Project[] }>()
);
export const saveProject = createAction(
  '[Movie Component] SaveProject',
  props<{ projects: Project }>()
);

export const updateProject= createAction(
    '[Movie Component] UpdateProject',
    props<{ projects: Project }>()
  );