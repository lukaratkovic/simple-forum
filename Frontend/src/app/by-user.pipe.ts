import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'byUser'
})
export class ByUserPipe implements PipeTransform {

  transform(value: any[], userId: string): any[] {
    const newValue : any[] = [];
    value.forEach((post, i) => {
      if(post.userId == userId){
        newValue.push(post);
      }
    });
    return newValue;
  }

}
