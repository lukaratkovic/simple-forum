import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'withUsername'
})
export class WithUsernamePipe implements PipeTransform {

  transform(posts: any[], users: any[]): any[] {
    posts.forEach((post) => {
      let username = "Unknown user";
      users.forEach((user) => {
        if(user.userId == post.userId){
          username = user.username;
          post['username'] = user.username;
        }
      })
    });
    return posts;
  }

}
