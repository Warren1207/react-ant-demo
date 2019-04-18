import {observable, action} from 'mobx'

class AppStore {
  @observable token ="";
  
  @action getToken(){
    return this.token;
  }
}

export default new AppStore()