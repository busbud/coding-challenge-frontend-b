<template lang="pug">

	section(v-show="departures.length > 1").departures-listing

		article(v-for="departure in departures").departures-listing__departure
			h5.departure__class {{ departure.class | titleCase }}
			span.departure__price {{ departure.prices.total | price }}
			//
				h4.departure__location {{ location | titleCase }}
				h5.departure__class {{ departure.class | titleCase }}
				span.departure__departure-time
				span.departure__arrival-time
				span.departure__price {{ departure.prices.total | price }}


</template>

<script src="./DeparturesListing.js"></script>

