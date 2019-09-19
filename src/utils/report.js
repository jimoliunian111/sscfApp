import { read, report } from './apis';

export default function(Vue) {
  const delay = 5000;
  let sessionToken = '';
  let scode = Vue.$route.query.scode || '';

  read([], { scode })
  .then(res => {
    sessionToken = res.data.data.session_token;
    reportFunc();
  })
  .catch(err => console.log(err));

  function reportFunc() {
    report([], { session_token: sessionToken })
    .then(res => {
      setTimeout(reportFunc, delay);
    })
    .catch(err => console.log(err));
  }
}