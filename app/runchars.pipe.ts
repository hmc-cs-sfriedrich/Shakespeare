import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'runChars'})
export class RunCharsPipe implements PipeTransform {
  transform(run: string): string[] {
    return run.split("");
  }
}