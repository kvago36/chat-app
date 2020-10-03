export enum Gender {
  male = 'male',
  female = 'female'
}

export type User = {
  id: string;
  email: string;
  password: string;
  
  login: string;
  
  location: {
    type: string,
    coordinates: [number]
  },

  profile: {
    name: string;
    gender: Gender;
    birthday: Date,
    location: string;
    about: string;
    website: string;
    picture: string;
  };
};