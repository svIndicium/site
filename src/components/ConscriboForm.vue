<script setup lang="ts">
import { fetchConscriboFormAndInjectFix } from '@/utils/conscriboForm';

const conscriboFormUrl = 'https://leden.conscribo.nl/svindicium/jsForm/load/aanmeldenlidmaatschap_v2/cwfForm';

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
      border-bottom: 1px solid rgba(var(--text-color-raw), 0.2);
    }

    td {
      // Make checkboxes bigger and color them
      input[type='checkbox'] {
        transform: scale(2); // Scale up the checkbox
        margin: 20px 10px;
        accent-color: #a3cf9b;
      }

      .invalidLabel {
        transition: none;
        text-align: center;
        transform: translateY(-70%);
      }

      // desktop mode
      @media screen and (min-width: #{$bp-tablet-lg}) {
        .mainContainer {
          display: flex;
          flex-direction: row;
          align-items: center;

          .inputLabel {
            order: 1;
            margin-right: 10px;
          }

          .inputLabel:not(:first-child)::before {
            content: ' / ';
            margin-right: 5px;
          }

          .inputDivWithLabel {
            display: flex;
            flex-direction: row;
            align-items: right;
            order: 2;
            margin-left: 10px;

            // error label handling desktop
            position: relative;
            > .invalidLabel {
              position: absolute;
              display: block;
              width: max-content;
              background: var(--indi-error);
              color: var(--text-color);
              padding: 5px;
              height: fit-content;
              border-radius: 4px;
              transform: translateY(-100%) translateX(-50%);
              left: 50%;
            }

            > .accountTable ~ .invalidLabel {
              transform: translateX(-50%);
            }
          }
        }
      }

      .accountTable:first-of-type td {
        border: 0;
      }

      @media screen and (max-width: #{$bp-tablet-lg}) {
        // bankrekening
        .accountTable:first-of-type td {
          text-align: center;
          padding: 0;

          input {
            margin-left: 0;
          }
        }

        input {
          width: 90% !important;
          margin-left: 5%;
        }

        input[type='checkbox'] {
          margin: 20px 0;
          margin-left: 5%;
        }

        select {
          width: 90% !important;
          margin-left: 5%;
          text-align: center;
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
    // uncomment below to always show the calendar
    // display: block !important;
    background-color: var(--secondary-background-color);
    border-radius: 4px;
    color: var(--text-color);

    button {
      padding: 5px 10px;
    }

    .calendarHeaderTable {
      margin-top: 0;
    }

    .calendarTable {
      width: 100%;
      color: black;

      td:not(.calendarTableDayName) {
        text-align: center;
        border-radius: 4px;
        &:hover {
          cursor: pointer;
        }
      }
    }

    .calendarTableDayName {
      background-color: var(--indi-green-1);
      color: var(--text-color);
      text-align: center;
      font-weight: bold;
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

  .submitButton {
    margin: 1rem calc(50% - 150px) 2rem;
    width: 300px;
    padding: 10px 15px;
  }

  button {
    background-color: var(--indi-green-1);
    border: 2px solid var(--indi-green-1);
    border-radius: 4px;
    cursor: pointer;
    font-size: 18px;
    color: var(--text-color);
    font-weight: bold;

    &:hover {
      background-color: var(--indi-green-2);
    }
    &:focus {
      outline: none;
      box-shadow: 0 0 0 2px rgba(114, 201, 225, 0.25);
    }
  }

  @media screen and (min-width: #{$bp-mobile-sm}) and (max-width: #{$bp-desktop-sm}) {
    .emptyCell {
      display: none;
    }
  }
}
</style>
