<template>
	<FullCalendar
		v-if="calendarOptions.events.length > 0"
		:options="calendarOptions"
	/>
	<div v-else class="height-fix">
		<Loading />
	</div>
</template>

<script lang="ts">
	import Vue from "vue"
	import Component from "vue-class-component"

	import FullCalendar from "@fullcalendar/vue"
	import dayGridPlugin from "@fullcalendar/daygrid"
	import axios from "axios"
	import Loading from "./Loading.vue"

	@Component({
		components: {
			FullCalendar,
			Loading
		}
	})
	export default class Calendar extends Vue {
		calendarOptions = {
			plugins: [dayGridPlugin],
			defaultView: "dayGridMonth",
			events: [],
			firstDay: 1,
			eventTimeFormat: {
				hour: "numeric",
				minute: "2-digit",
				hour12: false
			}
		}

		events = []

		mounted() {
			axios.get("https://old.indicium.hu/json/events?&filter[start]<2019-10-13&filter[end]=>2017-09-01&filter[status]=published&page[size]=1000")
				.then((response) => {
					const events = response.data.data
					this.mapFetchedEvents(events)
				})
		}

		mapFetchedEvents(events: any) {
			this.calendarOptions.events = events.map((event: any) => ({
				id: event.id,
				title: event.attributes.title,
				start: event.attributes.start,
				end: event.attributes.end,
				url: `/activiteiten/${event.attributes.slug}-${event.id}`,
				allday: true
			}))
		}
	}
</script>

<style lang="scss">
	.fc-toolbar h2 {
		font-size: 1.2rem !important;
	}
</style>
