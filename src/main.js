import SiteMenuElement from './components/site-menu.js';
import FilterElement from './components/filter.js';
import BoardElement from './components/board.js';
import NoTasksElement from './components/no-tasks.js';
import TaskListElement from './components/task-list.js';
import TaskEditElement from './components/task-edit.js';
import TaskElement from './components/task.js';
import LoadMoreButtonElement from './components/load-more-button.js';
import SortElement from './components/sort.js';
import {generateFilters} from './mock/filter-mock.js';
import {generateTasks} from './mock/task-mock.js';
import {render, replace, RenderPosition} from './utils/render.js';

const TASK_COUNT = 22;
const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;

const renderTask = (taskListElement, task) => {
  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      replaceEditToTask();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const replaceEditToTask = () => {
    replace(taskElement, taskEditElement);
  };

  const replaceTaskToEdit = () => {
    replace(taskEditElement, taskElement);
  };

  const taskElement = new TaskElement(task);

  taskElement.setEditButtonClickHandler(() => {
    const taskList = document.querySelector(`.board__tasks`);
    if (!taskList.querySelector(`.card--edit`)) {
      replaceTaskToEdit();
      document.addEventListener(`keydown`, onEscKeyDown);
    }
  });

  const taskEditElement = new TaskEditElement(task);
  taskEditElement.setSubmitHandler(() => {
    replaceEditToTask();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(taskListElement, taskElement.getElement(), RenderPosition.BEFOREEND);
};

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);
render(siteHeaderElement, new SiteMenuElement().getElement(), RenderPosition.BEFOREEND);

const filters = generateFilters();
render(siteMainElement, new FilterElement(filters).getElement(), RenderPosition.BEFOREEND);

const boardElement = new BoardElement();
render(siteMainElement, boardElement.getElement(), RenderPosition.BEFOREEND);

const tasks = generateTasks(TASK_COUNT);
const isAllTasksArchived = tasks.every((task) => task.isArchive);

if (isAllTasksArchived) {
  render(boardElement, new NoTasksElement().getElement(), RenderPosition.BEFOREEND);
} else {
  render(boardElement.getElement(), new SortElement().getElement(), RenderPosition.BEFOREEND);
  render(boardElement.getElement(), new TaskListElement().getElement(), RenderPosition.BEFOREEND);

  const taskListElement = boardElement.getElement().querySelector(`.board__tasks`);

  let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;
  tasks.slice(0, showingTasksCount).forEach((task) => {
    renderTask(taskListElement, task);
  });

  const loadMoreButtonElement = new LoadMoreButtonElement();
  render(boardElement.getElement(), loadMoreButtonElement.getElement(), RenderPosition.BEFOREEND);

  loadMoreButtonElement.getElement().addEventListener(`click`, () => {
    const prevTasksCount = showingTasksCount;
    showingTasksCount = showingTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;

    tasks.slice(prevTasksCount, showingTasksCount)
      .forEach((task) => renderTask(taskListElement, task));

    if (showingTasksCount >= tasks.length) {
      loadMoreButtonElement.getElement().remove();
      loadMoreButtonElement.removeElement();
    }
  });
}
