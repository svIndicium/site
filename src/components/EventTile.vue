<template>
	<a class="event-tile container" :href="event.url">
		<div class="color-container">
			<div v-for="(hex, idx) in categoryColors" :key="idx" :style="{ backgroundColor: `#${ hex }`}" />
		</div>
		<h5>{{ event.date | fullDate | capitalize }}</h5>
		<h4>{{ event.title }}</h4>
		<p class="small">{{ description }}</p>
	</a>
</template>

<script lang="ts">
	import Vue from "vue"
	import Component from "vue-class-component"
	import { Prop } from "vue-property-decorator"

	import type { Category, Event } from "~/components/model"

	@Component
	export default class EventTile extends Vue {
		@Prop({ type: Object, required: true }) event!: Event
		@Prop({ type: Array, required: true }) allCategories!: Array<Category>

		get categoryColors(): Array<string> {
			return this.allCategories
				.filter(category => this.event.categories.includes(category.courseTitle))
				.map(category => category.hex)
		}

		get description() {
			const text = this.event.description.slice(0, 140).trim()
			if (this.event.description.length > 140) {
				return `${text}...`
			}
			return text
		}
	}
</script>

<style lang='scss' scoped>
	.event-tile {
		display: inline-flex;
		position: relative;
		min-width: 300px;
		flex: 1;
		flex-direction: column;
		margin: 16px;
		background: var(--secondary-background-color);
		padding: 16px;
		box-shadow: 0 0 20px 0 rgba(124, 124, 124, 0.1);
		transition: box-shadow 300ms;

		&:hover {
			box-shadow: 0 0 20px 0 rgba(124, 124, 124, 0.3);
		}

		.color-container {
			position: absolute;
			top: 0;
			left: 0;
			height: 4px;
			width: 100%;
			display: flex;

			div {
				display: inline-flex;
				flex: 1;
				height: 100%;
			}
		}

		h5 {
			color: #72c9e0;
			margin: 0 0 8px 0;
		}

		h4 {
			color: var(--text-color);
			margin: 0;
		}

		p {
			color: var(--text-color);
			margin: 0;
			text-overflow: ellipsis;
		}
	}
</style>
