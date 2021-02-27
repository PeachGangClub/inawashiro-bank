// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import { User } from 'path/to/interfaces';

export type MyUser = {
  id: string
  name: string
  image: string
  hyc: number
}

export type User = {
  id: number
  name: string
}

export type Fruit = {
  id: string
  name: string
}
