<script setup lang="ts">
import { fetchConscriboFormAndInjectFix } from '@/utils/conscriboForm';

const conscriboFormUrl = 'https://leden.conscribo.nl/svindicium/jsForm/load/aanmeldenlidmaatschap_kopie/cwfForm';

fetchConscriboFormAndInjectFix(conscriboFormUrl);
</script>

<template>
  <div class="cwfForm" id="cwfForm">Formulier wordt geladen ...</div>
</template>

<style lang="scss">
@import '../assets/scss/variables.scss';
// De CSS van Conscribo zelf, ter referentie.
//@import 'https://leden.conscribo.nl/common_resources/css/WebForm.css';

.cwfForm {
  background: var(--root-background-color);
  color: var(--text-color);
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  border-radius: 4px;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.2);

  width: 100%;
  max-width: 1000px;

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

      input, select {
        background-color: white;
      }

      @media screen and (min-width: #{$bp-desktop-sm}) {
        .mainContainer {
          display: flex;
          flex-direction: row;
          align-items: center;

          .inputLabel {
            order: 1;
            margin-right: 10px;
          }
          
          .inputLabel:not(:first-child)::before {
            content: " / ";
            margin-right: 5px;
          }
          
          .inputDivWithLabel {
            display: flex;
            flex-direction: row;
            align-items: right;
            order: 2;
            margin-left: 10px;
          }
        }
      }


      @media screen and (min-width: #{$bp-mobile-sm}) and (max-width: #{$bp-desktop-sm}) {
        input {
          width: 100% !important;
        }

        .inputLabel {
          text-align: center;
        }

        .accountTable {
          display: flex;
          flex-direction: column;

          tr {
            display: flex;
            flex-direction: column;
          }
        }
      }
    }
  }

  .date-input-container {
    background-color: var(--root-background-color);
    .calendarTable {
      color: black; // doesn't allow theming
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
