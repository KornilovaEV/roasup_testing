
(async () => {
  const app = new Application();
  await app.init({ background: "#545454", }); //  resizeTo: window 
  document.body.appendChild(app.canvas);

})();
