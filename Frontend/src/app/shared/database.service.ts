import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs";
import {Post} from "../post.model";

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private http: HttpClient) { }

  getUsers(){
    return this.http.get('http://localhost:8081/api/users');

    // return this.http.get('https://lab5-90585-default-rtdb.europe-west1.firebasedatabase.app/users.json')
    //   .pipe(map(res=>{
    //     const users = [];
    //     for(let key in res){
    //       // @ts-ignore
    //       users.push({...res[key], userId:key});
    //     }
    //     return users;
    //   }));
  }

  getPosts(){

    return this.http.get('http://localhost:8081/api/posts');

    // return this.http.get('https://lab5-90585-default-rtdb.europe-west1.firebasedatabase.app/posts.json')
    //   .pipe(map(res => {
    //     const posts : any = [];
    //     for (let key in res) {
    //       // @ts-ignore
    //       posts.push({...res[key], postId:key});
    //     }
    //     return posts;
    //   }));
  }

  addUser(newUser : any){
    newUser.email = newUser.mail;
    delete newUser.mail;
    console.log(newUser);
    // return this.http.post('https://lab5-90585-default-rtdb.europe-west1.firebasedatabase.app/users.json', newUser);
    return this.http.post('http://localhost:8081/api/users', newUser);
  }

  addComment(comment : any){
    delete comment.timestamp;
    // return this.http.post('https://lab5-90585-default-rtdb.europe-west1.firebasedatabase.app/posts.json', comment);
    return this.http.post('http://localhost:8081/api/posts', comment);
  }

  deleteComment(id : string){
    // return this.http.delete(`https://lab5-90585-default-rtdb.europe-west1.firebasedatabase.app/posts/${id}.json`);
    return this.http.delete(`http://localhost:8081/api/posts/${id}`);
  }

  editComment(id: string, comment: {comment: string, timestamp: Date, userId: string, postId?: string, username?: string}) {
    let newComment = {
      "_id": comment.postId,
      "comment": comment.comment,
      "userId": comment.userId
    }
    // delete comment['postId'];
    // delete comment['username'];
    // return this.http.patch(`https://lab5-90585-default-rtdb.europe-west1.firebasedatabase.app/posts/${id}.json`, comment);
    return this.http.put('http://localhost:8081/api/posts',newComment);
  }
}
