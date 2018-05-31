<template>
</template>

<script>
import { EventBus } from '@/utils/event-bus'
const path = require('path')

export default {
  name: 'Notification',

  data () {
    return {
      notification: null
    }
  },

  methods: {
    // clickTomato () {
    //   EventBus.$emit('ready-long-break')
    // },

    callNotification (opts) {
      this.notification = new Notification(opts.title, {
        body: opts.body,
        icon: opts.icon,
        silent: true,
        position: opts.position
      })
    },
    notifyWork2 () {
      this.callNotification({
        title: 'notifywork2',
        body: 'hehe',
        icon: path.join('static', 'tomato.png')
      })
    }
  },

  mounted () {
    EventBus.$on('ready-long-break', this.notifyWork2)
    EventBus.$on('ready-short-break', this.notifyWork2)
    EventBus.$on('ready-work', this.notifyWork2)
    EventBus.$on('timer-finished', this.notifyWork2)
  },

  beforeDestroy () {
    EventBus.$off('ready-long-break', this.notifyWork2)
    EventBus.$off('ready-short-break', this.notifyWork2)
    EventBus.$off('ready-work', this.notifyWork2)
    EventBus.$off('timer-finished', this.notifyWork2)
    // EventBus.$off('ready-long-break', this.notifyLongBreak)
    // EventBus.$off('ready-work', this.notifyWork)
  }
}
</script>
