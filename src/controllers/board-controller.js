import NoTasksElement from '../components/no-tasks.js';
import SortElement from '../components/sort.js';
import {SortType} from '../components/sort.js';
import TaskListElement from '../components/task-list.js';
import TaskEditElement from '../components/task-edit.js';
import TaskElement from '../components/task.js';
import LoadMoreButtonElement from '../components/load-more-button.js';
import {render, replace, RenderPosition} from '../utils/render.js';
import {remove} from '../utils/render.js';

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

  render(taskListElement, taskElement, RenderPosition.BEFOREEND);
};


const renderTasks = (taskListElement, tasks) => {
  tasks.forEach((task) => {
    renderTask(taskListElement, task);
  });
};


export default class BoardController {
  constructor(container) {
    this._container = container;

    this._noTaskElement = new NoTasksElement();
    this._sortElement = new SortElement();
    this._taskListElement = new TaskListElement();
    this._loadMoreButtonElement = new LoadMoreButtonElement();
  }

  render(tasks) {
    const renderLoadMoreButton = () => {
      if (showingTasksCount >= tasks.length) {
        return;
      }

      render(container, this._loadMoreButtonElement, RenderPosition.BEFOREEND);

      this._loadMoreButtonElement.setClickHandler(() => {
        const prevTasksCount = showingTasksCount;
        showingTasksCount = showingTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;

        renderTasks(taskListElement, tasks.slice(prevTasksCount, showingTasksCount));

        if (showingTasksCount >= tasks.length) {
          remove(this._loadMoreButtonElement);
        }
      });
    };

    const container = this._container.getElement();
    const isAllTasksArchived = tasks.every((task) => task.isArchive);

    if (isAllTasksArchived) {
      render(container, this._noTaskElement, RenderPosition.BEFOREEND);
    }

    render(container, this._sortElement, RenderPosition.BEFOREEND);
    render(container, this._taskListElement, RenderPosition.BEFOREEND);

    const taskListElement = this._taskListElement.getElement();

    let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;

    renderTasks(taskListElement, tasks.slice(0, showingTasksCount));
    renderLoadMoreButton();

    this._sortElement.setSortTypeChangeHandler((sortType) => {
      let sortedTasks = [];

      switch (sortType) {
        case SortType.DATE_UP:
          sortedTasks = tasks.slice().sort((a, b) => a.dueDate - b.dueDate);
          break;
        case SortType.DATE_DOWN:
          sortedTasks = tasks.slice().sort((a, b) => b.dueDate - a.dueDate);
          break;
        case SortType.DEFAULT:
          sortedTasks = tasks.slice(0, showingTasksCount);
          break;
      }
      taskListElement.innerHTML = ``;

      renderTasks(taskListElement, sortedTasks);

      if (sortType === SortType.DEFAULT) {
        renderLoadMoreButton();
      } else {
        remove(this._loadMoreButtonElement);
      }
    });
  }
}
