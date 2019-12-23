import AbstractComponent from "./abstract-component.js";

const createFiltersMarkup = (filter, isChecked) => {
  const {name, count} = filter;
  return (
    `<input
      type="radio"
      id="filter__${name}"
      class="filter__input visually-hidden"
      name="filter"
      ${isChecked ? `checked` : ``}
      />
    <label for="filter__${name}" class="filter__label">
      ${name} <span class="filter__${name}-count">${count}</span>
    </label>`
  );
};


const createFilterTemplate = (filters) => {
  const filtersMarkup = filters.map((it, i) => {
    return createFiltersMarkup(it, i === 0);
  }).join(`\n`);

  return (
    `<section class="main__filter filter container">
      ${filtersMarkup}
    </section>`
  );
};


export default class FilterElement extends AbstractComponent {
  constructor(filters) {
    super();

    this._filters = filters;
  }

  getTemplate() {
    return createFilterTemplate(this._filters);
  }
}
