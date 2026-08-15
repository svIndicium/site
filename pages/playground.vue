<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import ContentCard from '~/components/ContentCard.vue';
import LinkCard from '~/components/LinkCard.vue';
import JobOffers from '~/components/JobOffers.vue';
import HomeTextBlock from '~/components/content/HomeTextBlock.vue';

const SAMPLE_IMAGE = '/assets/images/DSC_2456.webp';

type FieldType = 'text' | 'textarea' | 'json';
interface Field {
  key: string;
  label: string;
  type?: FieldType;
}
interface Entry {
  key: string;
  label: string;
  description: string;
  component: unknown;
  fields: Field[];
  defaults: Record<string, unknown>;
  buildProps: (s: Record<string, unknown>) => Record<string, unknown>;
}

const entries: Entry[] = [
  {
    key: 'content-card',
    label: 'ContentCard',
    description:
      '2-column image + body card. Uses a container query: switches to 1 column when narrower than 48rem. Resize the stage to see it flip.',
    component: ContentCard,
    fields: [
      { key: 'heading', label: 'Heading' },
      { key: 'body', label: 'Body', type: 'textarea' },
      { key: 'imageUrl', label: 'Image URL' },
    ],
    defaults: {
      heading: 'Over Indicium',
      body: 'Wij zijn dé studievereniging voor HBO-ICT van Hogeschool Utrecht. We organiseren activiteiten zoals bedrijfsbezoeken, kroegcolleges en lunchlezingen.',
      imageUrl: SAMPLE_IMAGE,
    },
    buildProps: () => ({}),
  },
  {
    key: 'link-card',
    label: 'LinkCard',
    description:
      'Link row card. Currently uses a viewport @media (max-width: 562px) — it does NOT react to container width yet (candidate for conversion).',
    component: LinkCard,
    fields: [
      { key: 'name', label: 'Name' },
      { key: 'icon', label: 'Icon' },
      { key: 'url', label: 'URL' },
    ],
    defaults: { name: 'Instagram', icon: '📸', url: 'https://instagram.com/svindicium' },
    buildProps: (s) => ({ link: { name: s.name, url: s.url, icon: s.icon } }),
  },
  {
    key: 'job-offers',
    label: 'JobOffers',
    description:
      'Accordion list of job offers. Currently uses viewport @media — it does NOT react to container width yet (candidate for conversion).',
    component: JobOffers,
    fields: [{ key: 'offers', label: 'Offers (JSON array)', type: 'json' }],
    defaults: {
      offers: JSON.stringify(
        [
          { title: 'Software Developer', url: 'https://example.com/job1' },
          { title: 'Cloud Engineer', url: 'https://example.com/job2' },
        ],
        null,
        2,
      ),
    },
    buildProps: (s) => ({ offers: safeParseArray(s.offers) }),
  },
  {
    key: 'home-text-block',
    label: 'HomeTextBlock',
    description: 'Text block with a title, body content and a CTA link (used on the homepage).',
    component: HomeTextBlock,
    fields: [
      { key: 'title', label: 'Title' },
      { key: 'ctaLabel', label: 'CTA label' },
      { key: 'ctaUrl', label: 'CTA URL' },
      { key: 'body', label: 'Body', type: 'textarea' },
    ],
    defaults: {
      title: 'Over Indicium',
      ctaLabel: 'Lees meer →',
      ctaUrl: '/over-indicium',
      body: 'Wij zijn dé studievereniging voor HBO-ICT van Hogeschool Utrecht.',
    },
    buildProps: (s) => ({ title: s.title, ctaLabel: s.ctaLabel, ctaUrl: s.ctaUrl }),
  },
];

function safeParseArray(v: unknown): unknown[] {
  if (typeof v !== 'string') return Array.isArray(v) ? v : [];
  try {
    const r = JSON.parse(v);
    return Array.isArray(r) ? r : [];
  } catch {
    return [];
  }
}

const selected = ref(entries[0].key);
const current = computed(() => entries.find((e) => e.key === selected.value)!);

// State is scoped per component so shared field keys (e.g. `body`) don't collide.
const state = reactive<Record<string, Record<string, unknown>>>(
  Object.fromEntries(entries.map((e) => [e.key, { ...e.defaults }])),
);
const currentState = computed(() => state[current.value.key]);
const currentProps = computed(() => current.value.buildProps(currentState.value));

// Resizable stage (px). The stage is a CSS container so components (or future
// components) that query an ancestor container react to its width.
const stageWidth = ref(720);

function startResize(event: PointerEvent) {
  const startX = event.clientX;
  const startW = stageWidth.value;
  const onMove = (ev: PointerEvent) => {
    stageWidth.value = Math.min(1400, Math.max(240, startW + (ev.clientX - startX)));
  };
  const onUp = () => {
    window.removeEventListener('pointermove', onMove);
    window.removeEventListener('pointerup', onUp);
  };
  window.addEventListener('pointermove', onMove);
  window.addEventListener('pointerup', onUp);
}
</script>

<template>
  <main class="playground">
    <h1>Component playground</h1>
    <p class="intro">
      Pick a component, tweak its props, then drag the handle (or use a preset) to resize the stage and watch how the
      component reacts to its available width.
    </p>

    <div class="layout">
      <aside class="controls">
        <label for="component">Component</label>
        <select id="component" v-model="selected">
          <option v-for="e in entries" :key="e.key" :value="e.key">{{ e.label }}</option>
        </select>
        <p class="desc">{{ current.description }}</p>

        <template v-for="f in current.fields" :key="f.key">
          <label :for="`f-${f.key}`">{{ f.label }}</label>
          <textarea
            v-if="f.type === 'textarea'"
            :id="`f-${f.key}`"
            v-model="currentState[f.key]"
            rows="4"
          />
          <textarea
            v-else-if="f.type === 'json'"
            :id="`f-${f.key}`"
            v-model="currentState[f.key]"
            rows="8"
            class="mono"
          />
          <input v-else :id="`f-${f.key}`" v-model="currentState[f.key]" />
        </template>
      </aside>

      <section class="stage-wrap">
        <div class="stage" :style="{ width: `${stageWidth}px` }">
          <component :is="current.component" v-bind="currentProps">
            <template v-if="current.key === 'content-card'" #image>
              <img :src="currentState.imageUrl" alt="demo" class="stage-img" />
            </template>
            <template v-if="current.key === 'content-card'" #default>
              <h3>{{ currentState.heading }}</h3>
              <p>{{ currentState.body }}</p>
            </template>
            <template v-else-if="current.key === 'home-text-block'" #default>
              <p>{{ currentState.body }}</p>
            </template>
          </component>
        </div>
        <div class="resize" title="Drag to resize" @pointerdown="startResize">
          <span>⣿</span>
        </div>
        <div class="stage-info">
          <span class="width">{{ stageWidth }}px</span>
          <button @click="stageWidth = 375">375</button>
          <button @click="stageWidth = 768">768</button>
          <button @click="stageWidth = 1200">1200</button>
        </div>
      </section>
    </div>
  </main>
</template>

<style scoped>
.playground {
  padding: 24px;
  max-width: 1400px;
  margin: 0 auto;
}
.intro {
  color: var(--text-color);
  opacity: 0.8;
  margin-bottom: 24px;
}
.layout {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 24px;
  align-items: start;
}
.controls {
  background: var(--secondary-background-color);
  border-radius: 10px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.controls label {
  font-weight: 600;
  margin-top: 8px;
}
.controls select,
.controls input,
.controls textarea {
  width: 100%;
  box-sizing: border-box;
  border: 1px solid rgba(var(--text-color-raw), 0.25);
  border-radius: 6px;
  padding: 6px 8px;
  font: inherit;
  background: var(--root-background-color);
  color: var(--text-color);
}
.controls textarea.mono {
  font-family: ui-monospace, monospace;
  font-size: 12px;
}
.controls .desc {
  font-size: 13px;
  line-height: 1.45;
  opacity: 0.75;
  margin: 4px 0 8px;
}
.stage-wrap {
  position: relative;
  padding-right: 20px;
}
.stage {
  /* The stage is itself a CSS container, so nested container queries react to its width. */
  container-type: inline-size;
  min-height: 320px;
  border: 1px dashed rgba(var(--text-color-raw), 0.35);
  border-radius: 10px;
  background: rgba(var(--secondary-background-color-raw), 0.35);
  overflow: hidden;
  transition: width 0.05s linear;
}
.stage-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.resize {
  position: absolute;
  top: 0;
  right: 0;
  width: 20px;
  height: 100%;
  cursor: col-resize;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(var(--text-color-raw), 0.5);
  user-select: none;
  touch-action: none;
}
.resize:hover {
  color: var(--indi-blue-1);
}
.stage-info {
  margin-top: 10px;
  display: flex;
  gap: 8px;
  align-items: center;
}
.stage-info .width {
  font-weight: 700;
  min-width: 70px;
}
.stage-info button {
  border: 1px solid rgba(var(--text-color-raw), 0.3);
  background: var(--root-background-color);
  color: var(--text-color);
  border-radius: 6px;
  padding: 4px 10px;
  cursor: pointer;
}
.stage-info button:hover {
  border-color: var(--indi-blue-1);
}
@media (max-width: 900px) {
  .layout {
    grid-template-columns: 1fr;
  }
}
</style>
