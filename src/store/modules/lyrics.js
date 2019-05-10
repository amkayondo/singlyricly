import api from '@/api/lyrics'

const state = {
  normal: null,
  synced: null,
  found: true,
}

const getters = {
  getNormal: state => state.lyrics,
  getSynced: state => state.lyrics,
  hasNormal: state => (state.normal),
  hasSynced: state => (state.synced),
}

const mutations = {
  setNormal (state, lyrics) {
    state.normal = lyrics
  },
  setSynced (state, lyrics) {
    state.synced = lyrics
  },
  setFound (state, status) {
    state.found = status
  },
}

const actions = {
  async fetchLyrics ({ commit }, track) {
    const { normal, synced } = await api.fetchLyrics(track)
    commit('setNormal', normal)
    commit('setSynced', synced)
    commit('setFound', (normal || synced))
    return (normal || synced)
  },
}

const module = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}

export default module
