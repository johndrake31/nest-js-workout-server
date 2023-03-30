import { Role } from '../types/role.enum';

export const isInArray = (arr: string[], searchString: Role) => {
  return arr.indexOf(searchString) > -1 ? true : false;
};
