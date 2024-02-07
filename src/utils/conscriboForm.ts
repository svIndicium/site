export let fetchConscriboFormAndInjectFix = (src_url: string): void => {

  fetch(src_url)
    .then((response) => response.text())
    .then((data) => {

      data = data.replace(/proto\.toggleInvalidBic = function\(toggleValue\) \{([\s\S]*?)};/,
        (match) => `${match}
  \tproto.toggleInvalidName = function(toggleValue) {
  \t\tthis._toggleInvalidOnElement(this.nameElement.ge(), toggleValue);
  \t};`
      );

      data = data.replace(
        /if\(res\.bic\.length === 0\) \{([\s\S]*?)}/,
        (match) => `${match}\n
  \t\tif(res.name.length === 0) {
  \t\t\treturn true;
  \t\t}`
      );

      data = data.replace(/obj\.toggleInvalidBic\(false\);/,
        (match) => `${match}
   \t\t\tobj.toggleInvalidName(false)`
      );

      data = data.replace(/obj\.toggleInvalidBic\(res\.bic\.length === 0\);/,
        (match) => `${match}
  \t\t\tobj.toggleInvalidName(res.name.length === 0);`
      );

      let scriptElement = document.createElement('script');
      scriptElement.innerHTML = data;

      document.body.appendChild(scriptElement);
    })
    .catch((error) => console.warn('Error occurred: ', error));
}
