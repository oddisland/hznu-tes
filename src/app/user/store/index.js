import { observable } from 'mobx'

class Store {
  @observable user = null
  @observable menu = []
}

export default new Store()