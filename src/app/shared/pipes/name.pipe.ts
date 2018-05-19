import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

import { User } from '../../authorization/models/user';

@Pipe({ name: 'name' })
export class NamePipe implements PipeTransform {
  transform(user: User, option = 'shortName'): string {
    const {
      firstName = '',
      lastName = '',
      middleName = '',
    } = user;
    const optionMap = {
      shortName: `${lastName} ${firstName}`,
      fullName: `${lastName} ${firstName} ${middleName}`,
    };

    return optionMap[option];
  }
}
