<script setup lang="ts">
const { data: vcpMembers } = await useAsyncData('vcp', () => queryCollection('vcp').order('order', 'ASC').all());

// Content stores e.g. "VCP Extern"; the pill only needs "Extern"/"Intern".
function shortStatus(status: string): string {
  return status.replace(/^VCP\s*/i, '');
}
</script>

<template>
  <ContentContainer>
    <h1>Vertrouwenscontactpersonen</h1>
    <p class="vcp-blurb">
      Heb je vragen, problemen of wil je gewoon even praten? Neem dan contact op met een van onze
      vertrouwenscontactpersonen. Zij zijn er voor jou!
    </p>

    <div class="vcp-grid">
      <article v-for="(member, idx) in vcpMembers || []" :key="idx" class="vcp-member">
        <div class="vcp-member__photo">
          <img
            :src="`/assets/vcpphotos/${member.photo}`"
            :alt="member.name"
            loading="lazy"
          />
          <span class="vcp-member__status">{{ shortStatus(member.status) }}</span>
        </div>

        <div class="vcp-member__body">
          <h3>{{ member.name }}</h3>
          <p class="vcp-member__phone">{{ member.phonenumber }}</p>

          <details class="vcp-member__section" :name="`vcp-${idx}`">
            <summary>Over mij</summary>
            <div class="vcp-member__bio">
              <ContentRenderer :value="member" />
            </div>
          </details>

          <details class="vcp-member__section" :name="`vcp-${idx}`">
            <summary>Feitjes over mij</summary>
            <ul class="vcp-member__facts">
              <li v-for="(fact, factIdx) in member.funfacts" :key="factIdx">{{ fact }}</li>
            </ul>
          </details>
        </div>
      </article>
    </div>
  </ContentContainer>
</template>

<style scoped>
h1 {
  text-align: center;
  hyphens: auto;
}

.vcp-blurb {
  max-width: 800px;
  margin: 0 auto 2rem;
  text-align: center;
  color: var(--text-color);
}

/* The grid picks its own column count from its available width:
   ~1 column on mobile, 2 on tablet, 3 on widescreen. */
.vcp-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 340px), 1fr));
  gap: 24px;
  max-width: 1200px;
  margin: 0 auto;
}

.vcp-member {
  display: flex;
  flex-direction: column;
  background: var(--secondary-background-color);
  border-radius: 14px;
  overflow: hidden;
  /* Progressive enhancement: lets ::details-content animate `height: auto`.
     `interpolate-size` is Chrome/Edge-only — Firefox/Safari ignore it and the
     disclosure just snaps (still fully functional). Unsupported browsers ignore
     the unknown property, so no @supports gate is needed. */
  interpolate-size: allow-keywords;
}

.vcp-member__photo {
  position: relative;
  aspect-ratio: 4 / 5;
  overflow: hidden;
  background: var(--secondary-background-color);
}

.vcp-member__photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.vcp-member__body {
  padding: 18px 22px 24px;
}

.vcp-member__body h3 {
  margin: 0;
  font-family: var(--indicium-font);
  font-size: 1.45rem;
  line-height: 1.2;
  color: var(--text-color);
}

/* status pill overlaid on the photo (bottom-left) */
.vcp-member__status {
  position: absolute;
  bottom: 12px;
  left: 12px;
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--text-color);
  background: var(--indi-blue-1);
  border-radius: 999px;
  padding: 3px 10px;
  white-space: nowrap;
}

.vcp-member__phone {
  margin: 8px 0 0;
  font-weight: 600;
  color: var(--text-color);
  opacity: 0.85;
}

.vcp-member__section summary {
  position: relative;
  list-style: none;
  cursor: pointer;
  user-select: none;
  margin: 1.4rem 0 0.5rem;
  padding-bottom: 0.35rem;
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-color);

  &::-webkit-details-marker {
    display: none;
  }

  /* blue accent underline */
  &::before {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 2.2rem;
    height: 3px;
    border-radius: 2px;
    background: var(--indi-blue-1);
  }

  /* chevron indicator: points right when closed, down when open */
  &::after {
    content: '';
    position: absolute;
    right: 4px;
    top: 50%;
    width: 6px;
    height: 6px;
    border-top: 2px solid currentColor;
    border-right: 2px solid currentColor;
    transform: translateY(-50%) rotate(45deg);
    opacity: 0.7;
    transition: transform 0.15s ease;
  }
}

.vcp-member__section[open] summary::after {
  transform: translateY(-50%) rotate(135deg);
}

/* Animate the disclosure height via ::details-content. This is a progressive
   enhancement: it animates where `interpolate-size` is supported (Chrome/Edge)
   and snaps elsewhere (Firefox/Safari). No vertical padding here — it lives on
   the inner content, so the animation doesn't jump at the start/end. */
.vcp-member__section::details-content {
  transition:
    height 0.3s ease,
    content-visibility 0.3s allow-discrete;
  height: 0;
  overflow: clip;
}

.vcp-member__section[open]::details-content {
  height: auto;
}

/* ContentRenderer output (the bio) is slot content — :deep() must stay top-level. */
.vcp-member__bio :deep(p) {
  margin: 0;
  line-height: 1.6;
  color: var(--text-color);
}

.vcp-member__facts {
  margin: 0.25rem 0 0;
  padding-left: 1.1rem;
  line-height: 1.6;
  color: var(--text-color);

  li {
    margin-bottom: 0.35rem;
  }
}
</style>
