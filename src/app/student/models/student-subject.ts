import { User } from '../../authorization/models/user';

export interface StudentSubject {
  title: string;
  hours: number;
  semester: number;
  controlType: string;
  mark: number;
  passIdentificator: boolean;
  teachers: User[];
}
