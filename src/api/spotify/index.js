import request from './request'

export default {
  async fetchPlayback () {
    const res = await request().get('/me/player')
    return res.status === 200 ? res.data : {}
  },
  async fetchUser () {
    const res = await request().get('/me')
    return res.status === 200 ? res.data : {}
  },
  async play () {
    const res = await request().put('/me/player/play')
    return res.status === 200 ? res.data : {}
  },
  async pause () {
    const res = await request().put('/me/player/pause')
    return res.status === 200 ? res.data : {}
  },
  async playTrack (uri) {
    const res = await request().put('/me/player/play', {
      uris: [ uri ],
    })
    return res.status === 200 ? res.data : {}
  },
}
