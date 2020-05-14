export enum Gender {
  male = 'male',
  female = 'female'
}

export type User = {
  email: string;
  password: string;

  location: {
    type: string,
    coordinates: number
  },

  token: string,

  profile: {
    name: string;
    gender: Gender;
    birthday: Date,
    location: string;
    website: string;
    picture: string;
  };
};