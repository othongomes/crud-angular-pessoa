import { Phone } from "./phone";

export interface PersonModel {

  _id: Number;
  genero: String;
  nome: String;
  nascimento: Date;
  email: String;
  cpf: String;
  phones: Phone[];

}

// export const ELEMENT_DATA: PersonModel[] = [
//   {_id: 1, nome: 'Othon', nascimento: new Date(1995, 9, 5), email: 'othon@gmail.com', cpf: '11111111111'},
// ];
