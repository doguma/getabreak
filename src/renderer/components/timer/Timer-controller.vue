<template>
  
</template>

<script>
import { EventBus } from '@/utils/event-bus'

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
      this.dispatchTimer()
    })
  }
}
</script>
