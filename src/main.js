import SiteMenuElement from './components/site-menu.js';
import FilterElement from './components/filter.js';
import {generateFilters} from './mock/filter-mock.js';
import BoardElement from './components/board.js';
import BoardController from './controllers/board-controller.js';
import {generateTasks} from './mock/task-mock.js';
import {render, RenderPosition} from './utils/render.js';

const TASK_COUNT = 22;

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

render(siteHeaderElement, new SiteMenuElement(), RenderPosition.BEFOREEND);

const filters = generateFilters();
render(siteMainElement, new FilterElement(filters), RenderPosition.BEFOREEND);

const boardElement = new BoardElement();
render(siteMainElement, boardElement, RenderPosition.BEFOREEND);

const tasks = generateTasks(TASK_COUNT);

const boardController = new BoardController(boardElement);

boardController.render(tasks);
