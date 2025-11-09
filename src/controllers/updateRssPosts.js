import classifyError from '../utils/errorClassifier.js'
import i18nextInstance from '../i18n.js'
import { fetchNewPosts } from '../services/rssService.js'

const updateRssPosts = (state, updateInterval) => {
  if (state.channels.length === 0) {
    setTimeout(() => updateRssPosts(state, updateInterval), updateInterval)
    return
  }

  Promise.allSettled(state.channels.map(fetchNewPosts))
    .then((results) => {
      for (const [index, result] of results.entries()) {
        if (result.status === 'fulfilled') {
          const newPosts = result.value
          if (newPosts.length > 0) {
            state.channels[index].newPosts.push(...newPosts)
            state.channels[index].posts.push(...newPosts)
            state.channels[index].newPosts.length = 0
          }
        }
        else {
          const channel = i18nextInstance.t('channel')
          const channelUrl = state.channels[index].url
          const errorType = i18nextInstance.t(`error.${classifyError(result.reason)}`)

          console.error(`${channel} ${channelUrl} ${i18nextInstance.t('updateFailed')}: ${errorType}`)
        }
      }
    })
    .finally(() => {
      setTimeout(() => updateRssPosts(state, updateInterval), updateInterval)
    })
}

export default updateRssPosts
