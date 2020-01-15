import moment from 'moment';

export const getRandomIntegerNumber = (min, max) => {
  return (
    min + Math.floor(max * Math.random())
  );
};


export const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);

  return array[randomIndex];
};


export const formatTime = (date) => {
  return moment(date).format(`hh:mm A`)
};

export const formatDate = (date) => {
  return moment(date).format(`DD MMMM`);
}
