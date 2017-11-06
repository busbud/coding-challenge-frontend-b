<template lang="pug">

	section.departures-listing

		div(v-if="originCity && destinationCity && fetched").departures-listing__heading
			h2.heading-2 Results for #[strong {{ originCity.name }}] to #[strong {{ destinationCity.name }}]

		article(v-if="departures.length > 1", v-for="departure in departures").departures-listing__departure.departure

			div.departure__details-block
				div.departure__details-block__departure-location
					span.departure__departure-time.heading-3 {{ departure.departure_time | time }}
					span.departure__location.reading-text {{ departure.departureLocation.name | titleCase }}

				div.departure__details-block__separator
					svg(viewbox="0 0 8 12").departure__details-block__separator__icon
						use(xlink:href="/dist/assets/icons/icons.svg#chevron-right")

				div.departure__details-block__destination-location
					span.departure__arrival-time.heading-3 {{ departure.arrival_time | time }}
					span.departure__location.reading-text {{ departure.destinationLocation.name | titleCase }}

			div.departure__price-block
				span.departure__price-block__class.reading-text {{ departure.class | titleCase }}
				span.departure__price-block__price.heading-2.heading-2--bold {{ departure.prices.total | price }} {{ departure.prices.currency }}


		div(v-if="departures.length < 1 && fetched").notifications.notifications

			div.notifications__wrapper

				div.notifications__wrapper__notification.notifications__wrapper__notification--light No result found.

</template>

<script src="./DeparturesListing.js"></script>

