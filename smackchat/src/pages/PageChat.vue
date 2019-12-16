<template>
  <q-page class="flex column">
    <q-banner class="text-white bg-red text-center">
      Użytkownik nie jest aktywny.
    </q-banner>
    <div class="q-pa-md column col justify-end">
      <q-chat-message
        v-for="message in messages"
        :key="message.text"
        :name="message.from"
        :text="[message.text]"
        :sent="message.from == 'me' ? true : false"
      />

    </div>
      <q-footer elevated>
        <q-toolbar>
          <q-form @submit="sendMessage" class="full-width">
            <q-input 
              v-model="newMessage" 
              bg-color="white"
              outlined
              rounded
              label="Wiadomość" 
              dense>

              <template v-slot:after>
                <q-btn 
                @click="sendMessage"
                round 
                dense 
                flat
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
export default {
  data() {
    return {
      newMessage: '',
      messages: [
        {
          text: 'Siema Mati, co tam u cb wariacie',
          from: 'me'
        },
                {
          text: 'pronto ryju ze gituwa, co tam na rejonie w pizdzichowie',
          from: 'them'
        },
                {
          text: 'czas plynie a ty wyjebane masz',
          from: 'me'
        }
      ]
    }
  },
  methods: {
    sendMessage() {
      this.messages.push({
        text: this.newMessage,
        from: 'me'
      })
    }
  }
}
</script>

<style>

</style>