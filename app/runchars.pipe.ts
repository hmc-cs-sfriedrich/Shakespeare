import { Pipe, PipeTransform } from '@angular/core';

// Splits a string into an array of characters
@Pipe({name: 'runChars'})
export class RunCharsPipe implements PipeTransform {
  transform(run: string): string[] {
    return run.split("");
  }
}