import { observable, action } from 'mobx'
import { persist } from 'mobx-persist'

import { Gender, User } from 'types/User'

class Location {
  @persist @observable type = '';
  @persist('list') @observable coordinates = [0, 0];
}

class Profile {
  @persist @observable name = '';
  @persist @observable gender: Gender = Gender.male;
  @persist @observable birthday = new Date();
  @persist @observable about = '';
  @persist @observable location = '';
  @persist @observable website = '';
  @persist @observable picture = '';
}

export class UserStore {
  @persist @observable id = '';
  @persist @observable login = '';
  @persist @observable email = '';
  @persist @observable password = '';

  @persist('object') @observable location = new Location();

  @persist('object') @observable profile = new Profile();

  @action
  setUser(user: User) {
    this.id = user.id
    this.login = user.login
    this.email = user.email
    this.password = user.password
    this.location = user.location
    this.profile = user.profile
  }

  @action
  updateAbout(value: string) {
    this.profile.about = value
  }
}