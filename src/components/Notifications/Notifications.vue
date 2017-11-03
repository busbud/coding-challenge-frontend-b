<template lang="pug">

	div(v-show="messages.length").notifications

		div.notifications-wrapper.small

			div(v-for="message in messages", :class="'notification ' + message.type") {{ message.text }}

</template>

<script src="./Notifications.js"></script>

