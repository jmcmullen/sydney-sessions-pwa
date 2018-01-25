window.fbAsyncInit = () => {
  window.FB.init({
    appId: '1619702365026225',
    autoLogAppEvents: true,
    xfbml: true,
    version: 'v2.10',
  });
  window.FB.AppEvents.logPageView();
};

((d, s, id) => {
  const fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {
    return;
  }
  const js = d.createElement(s);
  js.id = id;
  js.src = '//connect.facebook.net/en_US/sdk.js';
  fjs.parentNode.insertBefore(js, fjs);
})(document, 'script', 'facebook-jssdk');
