import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

import { User } from '../../authorization/models/user';

@Pipe({ name: 'fullName' })
export class FullNamePipe implements PipeTransform {
  transform(user: User): string {
    const {
      firstName = '',
      lastName = '',
      middleName = '',
    } = user;

    return `${lastName} ${firstName} ${middleName}`;
  }
}
