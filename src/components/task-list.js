import AbstractComponent from "./abstract-component.js";

const createTaskListTemplate = () => {
  return (
    `<div class="board__tasks">

    </div>`
  );
};


export default class TaskListComponent extends AbstractComponent {
  getTemplate() {
    return createTaskListTemplate();
  }
}
