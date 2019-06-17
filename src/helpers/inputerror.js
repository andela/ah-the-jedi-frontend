export default (divId, showTime = 6000) => {
  setTimeout(() => {
    document.getElementById(divId).className += ' hidden';
  }, showTime);
  return '';
};
