<template>
  <div class="Dial-wrapper">
    <slot></slot>
    <p class="Dial-label">{{ currentRoundDisplay }}</p>
    <svg 
      version="1.2" 
      baseProfile="tiny" 
      id="Layer_1" 
      xmlns="http://www.w3.org/2000/svg" 
      xmlns:xlink="http://www.w3.org/1999/xlink"
      x="0px" y="0px" 
      viewBox="0 0 20 20" 
      xml:space="preserve"
      width="220"
      height="220"
      class="Dial-bg"
      :class="dialClass"
    > 
      <path 
        fill="none"
        stroke-width="10" 
        stroke-linecap="round" 
        stroke-miterlimit="10"
        d="M115,5c60.8,0,110,49.2,110,110s-49.2,110-110,110S5,175.8,5,115S54.2,5,115,5"
      />
    </svg>

  </div>
</template>

<script>
// import anime from 'animejs'
import { EventBus } from '@/utils/event-bus'

export default {
  props: ['minutes'],

  data () {
    return {
      dial: null
    }
  },

  computed: {
    // store getters
    currentRound () {
      return this.$store.getters.currentRound
    },

    timeWork () {
      return this.$store.getters.timeWork * 60 * 1000
    },

    timeShortBreak () {
      return this.$store.getter.timeShortBreak * 60 * 1000
    },

    currentRoundDisplay () {
      if (this.currentRound === 'work') {
        return 'UNTIL BREAK'
      } else if (this.currentRound === 'short-break') {
        return 'break time'
      }
    },

    dialClass () {
      if (this.currentRound === 'work') {
        return 'Dial-bg--work'
      } else if (this.currentRound === 'short-break') {
        return 'Dial-bg--shortBreak'
      }
    }
  },

  methods: {
    mounted () {
      // this.dialAnimation(this.timeWork)
      EventBus.$on('timer-started', () => {
        this.dial.play()
      })
      EventBus.$on('timer-paused', () => {
        this.dial.pause()
      })
      EventBus.$on('timer-resumed', () => {
        this.dial.play()
      })
      EventBus.$on('timer-reset', () => {
        this.dial.pause()
        this.dial.seek(this.dial.duration)
      })
      EventBus.$on('timer-init', () => {
        this.dial.pause()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.Dial-wrapper {
  display: flex;
  position: relative;
  margin-left: 35px;
}

.Dial-label {
  letter-spacing: .1em;
  position: relative;
  top: 100px;
  text-transform: uppercase;
  font-size: 11px;
  margin-left: 19px;
}

.Dial-bg {
  stroke: $colorBlueGrey;
}

.Dial-bg--work{
  stroke: $colorBlueGrey;
}

.Dial-bg--shortBreak{
  stroke: $colorGreen;
}

.Dial-fill {
  position: relative;
  transform-origin: center;
  -webkit-app-region: no-drag;
}


</style>