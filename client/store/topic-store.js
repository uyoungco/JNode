import {
  observale,
  // toJs,
  // computed,
  action,
  extendObservable,
} from 'mobx'

import { topicSchema } from '../util/variable-define'
import { get } from '../util/http'

const createTopic = topic => (
  Object.assign({}, topicSchema, topic)
)

class Topic {
  constructor(data) {
    extendObservable(this, data)
  }
  @observale syncing = false
}

class TopicStore {
  @observale topics
  @observale syncing

  constructor({ syncing, topics } = { syncing: false, topics: [] }) {
    this.syncing = syncing
    this.topics = topics.map(topic => new Topic(createTopic(topic)))
  }
  addTopic(topic) {
    this.topics.push(new Topic(createTopic(topic)))
  }

  @action fetchTopics() {
    return new Promise((resolve, reject) => {
      this.syncing = true
      get('/topic', {
        mdrender: false,
      }).then((resp) => {
        if (resp.success) {
          resp.data.forEach((topic) => {
            this.addTopic(topic)
          })
          resolve()
        } else {
          reject()
        }
        this.syncing = false
      }).catch((err) => {
        reject(err)
        this.syncing = false
      })
    })
  }
}

export default TopicStore
