<template>
  <q-page 
  	ref="pageChat"
  	class="page-chat flex column">
  	<q-banner 
  		v-if="!otherUserDetails.online"
  		class="bg-grey-4 text-center fixed-top">
      {{ otherUserDetails.name }} is offline.
    </q-banner>
  	<div 
  		:class="{ 'invisible' : !showMessages }"
  		class="q-pa-md column col justify-end">
  		<q-chat-message
  			v-for="(message, key) in messages"
  			:key="key"
  		  :name="message.from == 'me' ? userDetails.name : otherUserDetails.name"
  		  :text="[message.text]"
  		  :sent="message.from == 'me' ? true : false"
  		  :bg-color="message.from == 'me' ? 'white' : 'light-green-2'"
  		/>
  	</div>
  	<q-footer elevated>
  	  <q-toolbar>
  	  	<q-form 
  	  		class="full-width">
	  	    <q-input
	  	    	v-model="newMessage"
	  	    	ref="newMessage"
	  	    	bg-color="white"
	  	    	outlined
	  	    	rounded
	  	    	label="Message"
	  	    	dense>

	  	      <template v-slot:after>
	  	        <q-btn
	  	        	round
	  	        	dense
	  	        	flat
					@click="sendMessage"
	  	        	type="submit"
	  	        	color="white"
	  	        	icon="send" />
	  	      </template>
	  	    </q-input>
  	  	</q-form>
  	  </q-toolbar>
  	</q-footer>
  </q-page>
</template>

<script>
	import { mapState, mapActions } from 'vuex'
	import mixinOtherUserDetails from 'src/mixins/mixin-other-user-details.js'

	export default {
		mixins: [mixinOtherUserDetails],
	  data() {
	  	return {
	  		newMessage: '',
	  		showMessages: false
	  	}
	  },
	  computed: {
	  	...mapState('store', ['messages', 'userDetails'])
	  },
	  methods: {
	  	...mapActions('store', ['firebaseGetMessages', 'firebaseStopGettingMessages', 'firebaseSendMessage']),
	  	sendMessage() {
	  		this.firebaseSendMessage({
	  			message: {
		  			text: this.newMessage,
		  			from: 'me'
	  			},
	  			otherUserId: this.$route.params.otherUserId
	  		})
	  		this.clearMessage()
	  	},
	  	clearMessage() {
	  		this.newMessage = ''
	  		this.$refs.newMessage.focus()
	  	},
	  	scrollToBottom() {
	  		let pageChat = this.$refs.pageChat.$el
	  		setTimeout(() => {
		  		window.scrollTo(0, pageChat.scrollHeight)
	  		}, 20);
	  	}
	  },
	  watch: {
	  	messages: function(val) {
	  		if (Object.keys(val).length) {
	  			this.scrollToBottom()
	  			setTimeout(() => {
	  				this.showMessages = true
	  			}, 200)
	  		}
	  	}
	  },
	  mounted() {
	  	this.firebaseGetMessages(this.$route.params.otherUserId)
	  },
	  destroyed() {
	  	this.firebaseStopGettingMessages()
	  }
	}
</script>

<style lang="stylus">
	.page-chat
		background #FFFFFF
	.q-banner
		top 50px
		z-index 2
		opacity 0.8
	.q-message
		z-index 1
</style>
