<script setup lang="ts">

fetch('https://leden.conscribo.nl/svindicium/jsForm/load/aanmeldenlidmaatschap_kopie/cwfForm')
  .then((response) => response.text())
  .then((data) => {
    data = data.replace(
      /if\(res\.bic\.length === 0\) \{([\s\S]*?)return false;/,
      `
\t\tif(res.bic.length === 0) {
\t\t\treturn true;
\t\t}
\t\tif(res.name.length === 0) {
\t\t\treturn true;
\t\t}
\t\treturn false;`);

    data = data.replace(/proto\.toggleInvalidBic = function\(toggleValue\) \{([\s\S]*?)};/,
    `proto.toggleInvalidBic = function(toggleValue) {
\t\tthis._toggleInvalidOnElement(this.bicElement.ge(), toggleValue);
\t}\n
\tproto.toggleInvalidName = function(toggleValue) {
\t\tthis._toggleInvalidOnElement(this.nameElement.ge(), toggleValue);
\t};`
    );

    data = data.replace(/obj\.toggleInvalidBic\(false\);/,
      `obj.toggleInvalidBic(false);
 \t\t\tobj.toggleInvalidName(false)`
    );

    data = data.replace(/obj\.toggleInvalidBic\(res\.bic\.length === 0\);/,
      `obj.toggleInvalidBic(res.bic.length === 0);
\t\t\tobj.toggleInvalidName(res.name.length === 0);`
    );

    console.log(data);

    // creating a script element
    let scriptElement = document.createElement('script');
    scriptElement.innerHTML = data;

    // appending the script element to the body of the web page
    document.body.appendChild(scriptElement);
  })
  .catch((error) => console.warn('Error occurred: ', error));
</script>

<template>
  <div class="cwfForm" id="cwfForm">Formulier wordt geladen ...</div>
</template>

<style lang="scss">
// TODO: Dit is matig. Moeten we zelf mooi maken.
//@import 'https://leden.conscribo.nl/common_resources/css/WebForm.css';

.cwfForm {
  background: var(--root-background-color);
  color: var(--text-color);
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  border-radius: 4px;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.2);

  width: 100%;
  max-width: 1000px;
  overflow-x: auto;

  table:first-of-type {
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0;

    th,
    td {
      padding: 12px 15px;
      text-align: left;
      border-bottom: 1px solid rgba(224, 224, 224, 1);
    }

    td {
      // Make checkboxes bigger and color them
      input[type='checkbox'] {
        width: fit-content;
        transform: scale(2); // Scale up the checkbox
        margin: 20px 10px;
        vertical-align: middle;
        accent-color: #a3cf9b;
      }
    }
  }

  .invalidLabel {
    color: red;
  }

  .invalidValue {
    border: 1px solid red;
  }

  label {
    color: rgba(0, 0, 0, 0.54);
    font-size: 16px;
    margin-bottom: 4px;
  }

  input,
  textarea,
  select {
    width: 100%;
    padding: 10px;
    margin-top: 4px;
    margin-bottom: 16px;
    box-sizing: border-box;
    border: 1px solid #ced4da;
    border-radius: 4px;
    &:focus {
      outline: none;
      border-color: rgb(114, 201, 225);
      box-shadow: 0 0 0 2px rgba(114, 201, 225, 0.25);
    }
    // Make dropdowns bigger
    &.dropdown {
      transform: scale(1.1);
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
    }
  }

  button {
    color: #fff;
    background-color: rgb(114, 201, 225);
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;

    /* &.submitButton {
      display: none;
    } */

    &:hover {
      background-color: darken(rgb(114, 201, 225), 10%);
    }
    &:focus {
      outline: none;
      box-shadow: 0 0 0 2px rgba(114, 201, 225, 0.25);
    }
  }
}
</style>
