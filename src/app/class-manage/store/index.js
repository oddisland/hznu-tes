import { observable } from 'mobx'

class Store {
  @observable classes = []
  @observable currentStudents = []
}

export default new Store()