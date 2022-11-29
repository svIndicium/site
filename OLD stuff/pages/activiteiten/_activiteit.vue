<template>
	<div v-if="loading">
		<Loading />
	</div>
	<div v-else-if="error === null" :class="['page', $route.params.page]">
		<div v-if="page.image" :style="getHeaderImage" class="image-container" />
		<div class="container">
			<h2>{{ page.title }}</h2>
			<h5 v-if="page.start">
				{{ getEventDate }}
			</h5>
			<h5 v-if="page.categories">
				Gerelateerde studierichtingen: {{ page.categories.join(", ") }}
			</h5>
			<div v-if="page.description" v-html="page.description" />
			<Button v-if="page.signUpLink" id="activity_sign_up" :url="page.signUpLink" size="l">
				Schrijf je in
			</Button>
		</div>
	</div>
	<div v-else class="container">
		<h2>Evenement niet gevonden!</h2>
		<Button url="/activiteiten">
			Ga terug
		</Button>
	</div>
</template>

<script lang="ts">
	import Vue from "vue"
	import Component from "vue-class-component"

	import axios from "axios"
	import Button from "../../components/interactions/button.vue"
	import Loading from "~/components/Loading.vue"

	@Component({
		components: {
			Loading,
			Button
		}
	})
	export default class Activity extends Vue {
		page: any = {}
		error: any = null
		loading = true

		get getHeaderImage() {
			return { "background-image": `url(${this.page.image})` }
		}

		get getEventDate() {
			const { start, end } = this.page
			return `${this.getDateAsString(start)} - ${this.isSameDay(start, end)
				? this.getTimeAsString(end)
				: this.getDateAsString(end)}`
		}

		mounted() {
			const activityId = this.$route.params.activiteit.split("-").reverse()[0]
			return axios.get(`https://old.indicium.hu/json/events/${activityId}`)
				.then(res => res.data.data)
				.then((res) => {
					Object.assign(this.page, {
						id: res.id,
						title: res.attributes.title,
						signUpLink: res.attributes.inschrijflink,
						description: res.attributes.contentblocks[0].content,
						image: res.attributes.contentblocks.length > 1 ? res.attributes.contentblocks[1].image.url : null,
						categories: res.attributes.categories,
						start: new Date(res.attributes.start),
						end: new Date(res.attributes.end)
					})
					this.error = null
				})
				.catch((err) => {
					this.page = null
					this.error = {
						statusCode: err.response.status,
							message: err.response.data
					}
				})
				.finally(() => {
					this.loading = false
				})
		}

		validate({ params }: any) {
			const activityId = params.activiteit.split("-").reverse()[0]
			return /^\d+$/.test(activityId)
		}

		isSameDay(date1: Date | undefined, date2: Date | undefined) {
			if (date1 === undefined || date2 === undefined) {
				return false
			}

			const isSameDay = date1.getDate() === date2.getDate()
			const isSameMonth = date1.getMonth() === date2.getMonth()
			const isSameYear = date1.getFullYear() === date2.getFullYear()

			return (
				isSameDay &&
				isSameMonth &&
				isSameYear
			)
		}

		getMonthAsString(currentMonth = new Date().getMonth()) {
			const monthList = [
				"januari",
				"februari",
				"maart",
				"april",
				"mei",
				"juni",
				"juli",
				"augustus",
				"september",
				"oktober",
				"november",
				"december"
			]

			return monthList[currentMonth]
		}

		getDayAsString(currentDay = new Date().getDay()) {
			const week = [
				"Zondag",
				"Maandag",
				"Dinsdag",
				"Woensdag",
				"Donderdag",
				"Vrijdag",
				"Zaterdag"
			]

			return week[currentDay]
		}

		getDateAsString(date: Date) {
			return `${this.getDayAsString(date.getDay())} ${date.getDate()} ${this.getMonthAsString(date.getMonth())} ${date.getFullYear()} ${this.getTimeAsString(date)}`
		}

		getTimeAsString(date: Date) {
			const minutes = (date.getMinutes() < 10 ? "0" : "") + date.getMinutes()
			return `${date.getHours()}:${minutes}`
		}
	}
</script>

<style lang="scss" scoped>
	.image-container {
		height: 500px;
		background-position: center;
		background-size: cover;
		position: relative;
		overflow: hidden;
	}
</style>
