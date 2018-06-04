<template>
</template>

<script>
import { EventBus } from '@/utils/event-bus'
import axios from 'axios'
const notifiers = require('node-notifier')
const path = require('path')

notifiers.notify(
  {
    icon: path.join('static', 'tomato.png'),
    wait: true
  }
)

export default {
  computed: {
    // store getters
    autoStartTimer () {
      return this.$store.getters.autoStartTimer
    },

    currentRound () {
      return this.$store.getters.currentRound
    },

    round () {
      return this.$store.getters.round
    },

    workRounds () {
      return this.$store.getters.workRounds
    }
  },

  methods: {
    dispatchTimer () {
      EventBus.$emit('timer-init', {
        auto: this.autoStartTimer
      })
    }
  },

  mounted () {
    EventBus.$on('timer-completed', () => {
      EventBus.$emit('timer-finished')
      axios.get("https://api.telegram.org/bot607705815:AAFccf8ImMduAmTMpYA8zRFHcbvwLBB3haY/sendmessage?chat_id=561683539&text='TIMES UP. you may have some fun nowww")
      notifiers.notify({
        title: `time's up`,
        message: 'well done!',
        wait: true
      })

      notifiers.on('click', function (notifierObject, options) {
        notifiers.notify({
          title: 'why',
          message: 'why',
          timeout: 5
        })
      })
      this.dispatchTimer()
    })
  }
}
</script>
