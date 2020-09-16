export enum Gender {
  male = 'male',
  female = 'female'
}

export type Filter = {
  gender?: Gender | undefined;
  minAge: number,
  maxAge?: number,
  location?: string
};