import _ from 'lodash';
import './task.css';

export function printTask() {
  console.log('I am task module!', _.join(['Hello', 'webpack'], ' '));
}