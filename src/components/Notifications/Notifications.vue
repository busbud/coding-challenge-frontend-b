<template lang="pug">

	div(v-show="messages.length").notifications

		div.notifications__wrapper.small

			div(v-for="message in messages", :class="'notifications__wrapper__notification notifications__wrapper__notification__status--' + message.type") {{ message.text }}

</template>

<script src="./Notifications.js"></script>

