import {getRandomArrayItem} from '../utils.js';
import {getRandomIntegerNumber} from '../utils.js';
import {Colors} from '../const.js';

const DAYS_LIMIT = 7;
const TAGS_LIMIT = 3;

const DescriptionItems = [
  `Изучить теорию`,
  `Сделать домашку`,
  `Пройти интенсив на соточку`
];

const DefaultRepeatingDays = {
  'mo': false,
  'tu': false,
  'we': false,
  'th': false,
  'fr': false,
  'sa': false,
  'su': false,
};

const Tags = [
  `homework`,
  `theory`,
  `practice`,
  `intensive`,
  `keks`,
];

const getRandomDate = () => {
  const targetDate = new Date();
  const sign = Math.random() > 0.5 ? 1 : -1;
  const diffValue = sign * getRandomIntegerNumber(0, DAYS_LIMIT);

  targetDate.setDate(targetDate.getDate() + diffValue);

  return targetDate;
};


const generateRepeatingDays = () => {
  return (
    Object.assign({}, DefaultRepeatingDays, {'mo': Math.random() > 0.5})
  );
};


const generateTags = (tags) => {
  return tags
    .filter(() => Math.random() > 0.5)
    .slice(0, TAGS_LIMIT);
};


const generateTask = () => {
  const randomDate = Math.random() > 0.5 ? null : getRandomDate();

  return {
    description: getRandomArrayItem(DescriptionItems),
    dueDate: randomDate,
    repeatingDays: randomDate ? DefaultRepeatingDays : generateRepeatingDays(),
    tags: new Set(generateTags(Tags)),
    color: getRandomArrayItem(Colors),
    isFavorite: Math.random() > 0.6,
    isArchive: Math.random() > 0.7
  };
};


const generateTasks = (count) => {
  return new Array(count)
  .fill(``)
  .map(generateTask);
};


export {generateTask, generateTasks};
