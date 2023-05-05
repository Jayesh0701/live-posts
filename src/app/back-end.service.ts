import { Injectable } from '@angular/core';
import { PostService } from './post.service';
import { Post } from './post.model';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

/**
 * Create Firebase realTime Database for testing purpose, So that we can have an idea that how we can connect with RestAPI
 * Database Path:-Firebase
 * https://live-posts-ea8eb-default-rtdb.firebaseio.com
 */

@Injectable({
  providedIn: 'root',
})
export class BackEndService {
  constructor(private postService: PostService, private http: HttpClient) {}
  //Functionality 1 save
  saveData() {
    //S1-Get list from post.service
    const allPost: Post[] = this.postService.getPosts();
    //S2-Send list to back-end
    this.http
      .put(
        'https://live-posts-ea8eb-default-rtdb.firebaseio.com/posts.json',
        allPost
      )
      .subscribe((res)=>{
        console.log(res);
      });
  }
  //Functionality 2 fetch
  fetchData(){
    this.http.get<Post[]>(
      'https://live-posts-ea8eb-default-rtdb.firebaseio.com/posts.json'
    ).pipe(
      tap((allPost:Post[])=>{
        console.log(allPost);
        this.postService.setPost(allPost);
      })
    ).subscribe();
  }
}
