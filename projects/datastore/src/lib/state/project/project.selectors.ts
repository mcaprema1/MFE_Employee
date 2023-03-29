
import { createFeatureSelector, createSelector, select } from '@ngrx/store';
import { projects } from '../../app.interface';
import { ProjectState } from './project.reducer';
import { pipe } from 'rxjs';
import { filter } from 'rxjs/operators';

const selectproject=
  createFeatureSelector<ProjectState>(projects);

export const projectSelector = createSelector(
    selectproject,
  (state: ProjectState) => state.allProjects
);

export const currentProjectSelector = createSelector(
    selectproject,
  (state: ProjectState) => state.allProjects
);
export const filteredProjectSelector = pipe(
    select(projectSelector),
    filter((item) => !!item?.length)
  );