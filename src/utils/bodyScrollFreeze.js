export const bindFreeze = () => {
  let html = document.querySelector('html');
  let body = document.querySelector('body');

  html.style.height = '100%';
  html.style.width = '100%';
  html.style.overflowX = 'hidden';
  body.style.height = '100%';
  body.style.width = '100%';
  body.style.overflowX = 'hidden';
  
}

export const unbindFreeze = () => {
  let html = document.querySelector('html');
  let body = document.querySelector('body');

  html.style.height = '';
  html.style.width = '';
  html.style.overflowX = '';
  body.style.height = '';
  body.style.width = '';
  body.style.overflowX = '';
  
}