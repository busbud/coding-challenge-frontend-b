<template lang="pug">

	div.search-field

		notifications(ref="searchNotifications").search-field__notifications

		form(@submit.prevent="search", name="searchFormValidation").search-field__form

			div(v-bind:class="{ 'select--error': errors.has('searchFormValidation.origin') && searchSubmitted }").search-field__form__select.select
				
				select(name="origin", v-model="searchQuery.origin", v-validate.initial="'required'", placeholder="Origin").select__input
					option(value="", selected) Origin
					option(value="dr5reg") New York
				
				svg(viewbox="0 0 12 7").select__arrow
					use(xlink:href="/dist/assets/icons/icons.svg#chevron-down")


			div(v-bind:class="{ 'select--error': errors.has('searchFormValidation.destination') && searchSubmitted }").search-field__form__select.select
				
				select(name="destination", v-model="searchQuery.destination", v-validate.initial="'required'", placeholder="Destination").select__input
					option(value="", selected) Destination
					option(value="f25dvk") Montreal
					
				svg(viewbox="0 0 12 7").select__arrow
					use(xlink:href="/dist/assets/icons/icons.svg#chevron-down")


			div(v-bind:class="{ 'select--error': errors.has('searchFormValidation.dateFrom') && searchSubmitted }").search-field__form__input.input
				
				input(name="dateFrom", v-model="searchQuery.dateFrom", v-validate.initial="'required'", placeholder="Departure Date").input__input-field


			button(type="submit").search-field__form__submit.button-primary Search


			loading(ref="searchLoading")

</template>

<script src="./SearchField.js"></script>

