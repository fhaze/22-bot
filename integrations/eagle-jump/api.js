const axios = require("axios")
const { EAGLE_JUMP_ROOT_API_KEY } = require('../../secrets')
const { EAGLE_JUMP_API_ENDPOINT } = require('../../config')

const baseUrl = EAGLE_JUMP_API_ENDPOINT ?? "http://localhost:8888/eagle-jump"
const client = new axios.create({baseURL: `${baseUrl}/v1`, headers: { "X-EAGLE-JUMP-KEY": EAGLE_JUMP_ROOT_API_KEY }})

module.exports = {
  user: {
    save: async user => {
      const { data } = await client.post(`users`, user)
      return data
    },
    get: async id => {
      try {
        const { data } = await client.get(`users/${id}`)
        return data
      } catch (err) {
        throw err
      }
    },
    sumMessageCount: async ({id, count}) => {
      return await client.put(`users/${id}/sum-message-count`, { count })
    },
    sumCommandCount: async ({id, count}) => {
      return await client.put(`users/${id}/sum-command-count`, { count })
    }
  }
}
