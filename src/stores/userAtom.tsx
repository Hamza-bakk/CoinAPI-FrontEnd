import { atom } from 'jotai';

type User = {
  id: string;
  first_name: string;
  last_name: string,
  email: string;
  isAuth: boolean;
}

export const userAtom = atom<User>({
  id: '',
  first_name: '',
  last_name: '',
  email: '',
  isAuth: false,
});