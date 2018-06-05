import { createLocalStore } from '@/utils/local-store'

const localStore = createLocalStore()

const state = {
  round: 1,
  workRounds: parseInt(localStore.get('workRounds')),
  timeShortBreak: parseInt(localStore.get('timeShortBreak')),
  timeWork: parseInt(localStore.get('timeWork')),
  currentRound: 'work', // work, short-break, long-break
  isMuted: false
}

const getters = {
  round () {
    return state.round
  },
  workRounds () {
    return state.workRounds
  },
  timeWork () {
    return state.timeWork
  },
  timeShortBreak () {
    return state.timeShortBreak
  },
  currentRound () {
    return state.currentRound
  },
  isMuted () {
    return state.isMuted
  }
}

const mutations = {

  SET_CURRENT_ROUND (state, payload) {
    state.currentRound = payload
  },

  RESET_ROUND (state) {
    state.round = 1
  },

  SET_TIME_WORK (state, payload) {
    state.timeWork = payload
  },

  SET_TIME_SHORT_BREAK (state, payload) {
    state.timeShortBreak = payload
  },

  SET_WORK_ROUNDS (state, payload) {
    state.workRounds = payload
  },

  TOGGLE_MUTE (state) {
    state.isMuted = !state.isMuted
  }
}

const actions = {
  incrementRound ({ commit }) {
    commit('INCREMENT_ROUND')
  },

  resetRound ({ commit }) {
    commit('RESET_ROUND')
  },

  setCurrentRound ({ commit }, payload) {
    commit('SET_CURRENT_ROUND', payload)
  },

  setTimeWork ({ commit }, payload) {
    commit('SET_TIME_WORK', payload)
    localStore.set('timeWork', payload)
  },

  setTimeShortBreak ({ commit }, payload) {
    commit('SET_TIME_SHORT_BREAK', payload)
    localStore.set('timeShortBreak', payload)
  },

  setWorkRounds ({ commit }, payload) {
    commit('SET_WORK_ROUNDS', payload)
    localStore.set('workRounds', payload)
  },

  toggleMute ({ commit }) {
    commit('TOGGLE_MUTE')
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
