<template>
</template>

<script>
// import { EventBus } from '@/utils/event-bus'
const path = require('path')
// const notifier = require('node-notifier')
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
        silent: true
      })
    },
    notifyWork2 () {
      this.callNotification({
        title: 'title',
        body: 'hehe',
        position: 'top left',
        icon: path.join('static', 'tomato.png')
      })
    }
  },

  mounted () {
    // notifier.notify({
    //   title: 'hellooo', message: 'testing', wait: true, time: 300000, type: 'warn'})

    // notifier.on('click', function (notifierObject, options) {
    //   EventBus.$emit('timer-init')
    // })
  },

  beforeDestroy () {
    // EventBus.$off('timer-finished', notifier.notify())
    // EventBus.$off('ready-long-break', this.notifyLongBreak)
    // EventBus.$off('ready-work', this.notifyWork)
  }
}
</script>
