import { EventEmitter, Injectable } from "@angular/core";
import { Post } from "./post.model";
//@Injectable tells that this is not a normal class.Consider this class as Service in Angular
@Injectable({
    providedIn:'root',
}) 
export class PostService{
  listChanged: EventEmitter<Post[]>=new EventEmitter();
    listOfPosts: Post[] = [];

      //Facility1 To get all content from list
      getPosts()
      {
        return this.listOfPosts;
      }

      //Facility2 To delete one element from list
      deletePost(index:number)
      {
        this.listOfPosts.splice(index,1);
      }

      //facility 3 To add new post
      addPost(post:Post)
      {
        this.listOfPosts.push(post);
      }
      //facility 4 To update existing post
      updatePost(index:number,post:Post)
      {
        this.listOfPosts[index]=post;
      }
      //facility 5 To get post by ID
      getPost(index:number){
        return this.listOfPosts[index];
      }
      likePost(index:number){
        this.listOfPosts[index].numberOfLikes+=1;
      }
      setPost(allPost:Post[]){
        this.listOfPosts=allPost;
        this.listChanged.emit(allPost);
      }
}