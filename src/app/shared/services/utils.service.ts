import { Injectable } from '@angular/core';
import * as _ from 'lodash';

@Injectable()
export class UtilsService {
  constructor() {}

  trim<T>(entity: T): T {
    return <T>_.mapValues(entity as any, field => _.isString(field) ? field.trim() : field);
  }
}
