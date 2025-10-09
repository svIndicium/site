export function fetchConscriboFormAndInjectFix(src_url: string) {
  fetch(src_url)
    .then((response) => response.text())
    .then((formScript) => {
      formScript = formScript.replace(/Telefoonnummer<\\[\s\S]*?;/, 'Telefoonnummer');

      formScript = formScript.replace(
        /proto\.toggleInvalidBic = function\(toggleValue\) \{([\s\S]*?)};/,
        (match) => `${match}
  \tproto.toggleInvalidName = function(toggleValue) {
  \t\tthis._toggleInvalidOnElement(this.nameElement.ge(), toggleValue);
  \t};`,
      );

      formScript = formScript.replace(
        /if\(res\.bic\.length === 0\) \{([\s\S]*?)}/,
        (match) => `${match}\n
  \t\tif(res.name.length === 0) {
  \t\t\treturn true;
  \t\t}`,
      );

      formScript = formScript.replace(
        /obj\.toggleInvalidBic\(false\);/,
        (match) => `${match}
   \t\t\tobj.toggleInvalidName(false)`,
      );

      formScript = formScript.replace(
        /obj\.toggleInvalidBic\(res\.bic\.length === 0\);/,
        (match) => `${match}
  \t\t\tobj.toggleInvalidName(res.name.length === 0);`,
      );

      formScript = formScript.replace(
        /this\.calenderContainer = CWF\.createElement\('div'\)/,
        (match) => `${match}.setClassName('date-input-container')`,
      );

      const conscriboFormElement = document.createElement('script');
      conscriboFormElement.innerHTML = formScript;
      document.body.appendChild(conscriboFormElement);
    })
    .catch((error) => console.warn('Error occurred: ', error));
}
