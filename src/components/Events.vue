<template>
	<div id="events" class="events-container">
		<h2 class="center">
			Aankomende activiteiten
		</h2>
		<div class="categories">
			<ul>
				<li v-for="(category, idx) in allCategories" :key="idx" :class="{ 'in-active': !activeCategories.includes(category.courseTitle) }" @click="filterCategories(category)">
					<span :style="{backgroundColor: `#${category.hex}`}" />{{ category.courseTitle }}
				</li>
			</ul>
		</div>

		<div v-if="!isLoading && events.length > 0" class="events">
			<EventTile v-for="(event, idx) in filteredEvents" :key="idx" :event="event" :all-categories="allCategories" />
		</div>
		<Loading v-else-if="isLoading" />
		<div v-else-if="!isLoading && events.length === 0">
			<p class="center">
				Geen aankomende activiteiten gevonden... 😢
			</p>
		</div>
		<div class="container center">
			<p class="center">
				Wil je automatisch alle evenementen in je agenda krijgen? Zorg ervoor dat alle richtingen waar je activiteiten van wilt ontvangen aan staan en klik op onderstaande knop om de link te kopiëren en importeer deze in je favoriete agenda applicatie!
			</p>
			<Button
				size="l"
				:center="true"
				url=""
				@click.native="copyFeedLinkToClipboard"
			>
				Kopieër naar klembord
			</Button>
		</div>
	</div>
</template>

<script lang="ts">
	import Vue from "vue"
	import Component from "vue-class-component"

	import axios from "axios"
	import EventTile from "./EventTile.vue"
	import Loading from "./Loading.vue"
	import Button from "./interactions/button.vue"
	import type { Category, Event } from "~/components/model"

	@Component({
		components: {
			Button,
			EventTile,
			Loading
		}
	})
	export default class Events extends Vue {
		isLoading = true
		events: Array<Event> = []
		activeCategories: Array<string> = ["SD", "TI", "CSC", "BIM", "AI"]
		allCategories: Array<Category> = [
			{
				courseTitle: "SD",
				hex: "E17272"
			},
			{
				courseTitle: "TI",
				hex: "A2E172"
			},
			{
				courseTitle: "CSC",
				hex: "E1DB72"
			},
			{
				courseTitle: "BIM",
				hex: "727AE1"
			},
			{
				courseTitle: "AI",
				hex: "72E1AD"
			}
		]

		mounted() {
			this.fetchEvents()
		}

		get filteredEvents() {
			return this.events.filter((event) => {
				return event.categories.filter(cat => this.activeCategories.includes(cat)).length > 0
			})
		}

		get feedLink() {
			const url = "https://ics.indicium.hu/v1/ics"
			const categories = this.activeCategories.join(",")
			if (this.activeCategories.length === this.allCategories.length) {
				return url
			}
			return `${url}?categories=${categories}`
		}

		stripHTMLFromString(str = "") {
			return str.replace(/(<([^>]+)>)/ig, "").replace(/[\n\r]/g, " ").replace("&nbsp;", " ")
		}

		fetchEvents() {
			axios.get("https://old.indicium.hu/json/events?filter[status]=published&page%5Bsize%5D=1000")
				.then((response) => {
					const events = response.data.data
					const today = new Date().getTime()
					const featureEvents = events
						.filter((event: any) => new Date(event.attributes.start).getTime() > today)
						.sort((eventA: any, eventB: any) => new Date(eventA.attributes.start).getTime() - new Date(eventB.attributes.start).getTime())
						.map((evt: any) => ({
							title: evt.attributes.title,
							description: this.stripHTMLFromString(evt.attributes.contentblocks[0].content),
							date: new Date(evt.attributes.start),
							url: `/activiteiten/${evt.attributes.slug}-${evt.id}`,
							categories: evt.attributes.categories
						}))

					this.$set(this, "isLoading", false)
					this.$set(this, "events", featureEvents)
				})
		}

		filterCategories({ courseTitle }: any): void {
			const catIdx = this.activeCategories.indexOf(courseTitle)
			if (this.activeCategories.includes(courseTitle)) {
				this.activeCategories.splice(catIdx, 1)
			} else {
				this.activeCategories.push(courseTitle)
			}
		}

		copyFeedLinkToClipboard(): void {
			this.copyToClipboard(this.feedLink)
				.then(() => {
					// eslint-disable-next-line no-console
					console.log("Copied to clipboard")
				}).catch((err) => {
				// eslint-disable-next-line no-console
				console.error(err)
			})
		}

		async copyToClipboard(text: string): Promise<void> {
			try {
				await navigator.clipboard.writeText(text)
			} catch (e) {
				// eslint-disable-next-line no-console
				console.error(e)
			}
		}
	}
</script>

<style lang="scss">
	@import '../assets/scss/variables.scss';

	.events-container {
		max-width: 1084px;
		margin: 0 auto 128px;

		.categories {
			ul {
				display: flex;
				flex-wrap: wrap;
				justify-content: center;

				li {
					cursor:pointer;
					display: inline-flex;
					align-items: center;
					padding: 16px;

					&.in-active span {
						background-color: lightgrey !important;
					}

					@media screen and (max-width: $bp-tablet-sm) {
						padding: 8px;
					}

					span {
						display: inline-flex;
						width: 24px;
						height: 24px;
						background-color: #f2f2f2;
						margin-right: 8px;
						box-shadow: 0 0 20px 0 rgba(186, 186, 186, .3);
						transition: box-shadow 300ms;

					}
				}
			}
		}

		.events {
			display: flex;
			justify-content: space-between;
			flex-direction: row;
			flex-wrap: wrap;
		}
	}
</style>
