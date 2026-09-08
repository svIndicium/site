<template>
  <div class="content-card">
    <div class="content-card__grid">
      <div class="content-card__image">
        <slot name="image" />
      </div>
      <div class="content-card__body">
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped>
.content-card {
  /* Container for the grid below: layout switches on the card's own width, not the viewport.
     NOTE: the @container rule must live at the TOP level (not nested inside this selector) —
     nested @container is dropped by browsers in Vue's dev-mode style injection. */
  container-type: inline-size;
  max-width: 1200px;
  margin: 4em auto;

  .content-card__grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 10px;
  }

  /* Alternating image/body sides for odd cards. :where() flattens the
     specificity so the @container rule below can override grid-column in
     narrow mode. :nth-of-type (not :nth-child) counts only div siblings, so
     headings/p before the cards don't shift the alternation — the first card
     on every page gets the image on the right. */
  &:where(:nth-of-type(odd)) {
    .content-card__image {
      grid-column: 2;
    }
    .content-card__body {
      grid-column: 1;
      grid-row: 1;
    }
  }
}

@container (max-width: 48rem) {
  .content-card .content-card__grid {
    grid-template-columns: 1fr;
  }
  .content-card .content-card__image {
    grid-column: 1;
    margin: 0 auto;
    width: 95%;
  }
  .content-card .content-card__body {
    grid-column: 1;
    grid-row: auto;
    margin-top: 2em;
  }
}

.content-card__image {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* NOTE: `:deep()` must NOT be nested inside the component rule. Vue's nested
   compilation puts the scope attribute on the deep part — `.content-card__image
   [data-v-…] img` — which does not match slot content (the img is a direct child
   carrying the PARENT's scope attribute). A top-level `.content-card__image
   :deep(img)` compiles to `.content-card__image[data-v-…] img` and matches. */
.content-card__image :deep(img) {
  border-radius: 10px;
  width: 80%;
}

.content-card__body {
  background-color: var(--secondary-background-color);
  border-radius: 10px;
  padding: 1em 2em;
}

.content-card__body :deep(h2),
.content-card__body :deep(h3) {
  margin-top: 0;
}
</style>
