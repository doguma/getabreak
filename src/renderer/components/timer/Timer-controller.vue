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
    checkRound () {
      if (this.currentRound === 'work') {
        this.$store.dispatch('setCurrentRound', 'short-break')
        EventBus.$emit('ready-short-break')
      } else if (this.currentRound === 'short-break') {
        this.$store.dispatch('setCurrentRound', 'work')
        EventBus.$emit('ready-work')
      }
      this.dispatchTimer()
    },
    dispatchTimer () {
      EventBus.$emit('timer-init', {
        auto: this.autoStartTimer
      })
    }
  },

  mounted () {
    EventBus.$on('timer-completed', () => {
      axios.get(`https://api.telegram.org/bot607705815:AAFccf8ImMduAmTMpYA8zRFHcbvwLBB3haY/sendmessage?chat_id=561683539&text='${this.currentRound} time OVER.'`)
      notifiers.notify({
        title: `${this.currentRound} OVER`,
        message: 'reminder',
        wait: true
      })
      notifiers.on('click', function (notifierObject, options) {
      })
      this.checkRound()
    })
  }
}
</script>
