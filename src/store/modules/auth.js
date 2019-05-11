import api from '@/api/auth'

const state = {
  accessToken: '',
  refreshToken: '',
  expiryTime: '',
  ttl: '',
  url: '',
}

const getters = {
  getAccessToken: state => state.accessToken,
  getRefreshToken: state => state.refreshToken,
  getExpiryTime: state => state.expiryTime,
  getTtl: state => state.ttl,
  getAuthURL: state => state.authURL,
  isAuthenticated: state => !!state.accessToken,
}

const mutations = {
  setAuthURL (state, url) {
    state.url = url
  },
  setAccessToken (state, token) {
    state.accessToken = token
  },
  setRefreshToken (state, token) {
    state.refreshToken = token
  },
  setExpiryTime (state, time) {
    state.expiryTime = time
  },
  setTtl (state, ttl) {
    state.ttl = ttl
  },
}

const actions = {
  async fetchAuthUrl ({ commit }) {
    try {
      const url = await api.getAuthURL()
      commit('setAuthURL', url)
      return url
    } catch (e) {
      console.log(e)
    }
  },

  async refreshToken ({ commit, dispatch, state }) {
    try {
      if (state.refreshToken) {
        const res = await api.refreshToken(state.refreshToken)
        if (res) {
          commit('setAccessToken', res.access_token)
          commit('setTtl', res.expires_in)
          dispatch('setExpiryTime')
        }
        return res.access_token
      }
    } catch (e) {
      console.log(e)
    }
  },

  logout () {
    window.localStorage.clear()
    window.sessionStorage.clear()
  },

  setAuthURL ({ commit }, url) {
    commit('setAccessToken', url)
  },

  setAccessToken ({ commit }, token) {
    commit('setAccessToken', token)
  },

  setRefreshToken ({ commit }, token) {
    commit('setRefreshToken', token)
  },

  setExpiryTime ({ commit, state }) {
    const expiry = Date.now() + (state.ttl * 1000)
    commit('setExpiryTime', expiry)
  },

  setTtl ({ commit }, ttl) {
    commit('setTtl', ttl)
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
