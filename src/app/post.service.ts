import { EventEmitter, Injectable } from "@angular/core";
import { Post } from "./post.model";
//@Injectable tells that this is not a normal class.Consider this class as Service in Angular
@Injectable({
    providedIn:'root',
}) 
export class PostService{
  listChanged: EventEmitter<Post[]>=new EventEmitter();
    listOfPosts: Post[] = [
        // new Post(
        //   'Nature',
        //   'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias amet maiores itaque nostrum id rerum ex, soluta incidunt eum quidem, vitae, perferendis eaque quibusdam iure dignissimos sapiente. Ipsa, sit totam. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corrupti doloribus reprehenderit neque exercitationem soluta deserunt nam vero repellat itaque aperiam enim voluptas omnis, ea iste facilis, asperiores doloremque maxime assumenda!',
        //   'https://cdn.pixabay.com/photo/2016/03/08/20/03/flag-1244649__340.jpg',
        //   'Jack Synder',
        //   new Date(),
        //   1
        // ),
        // new Post(
        //   'Hampi',
        //   'Hampi is an ancient village in the south Indian state of Karnataka. It is dotted with numerous ruined temple complexes from the Vijayanagara Empire. On the south bank of the River Tungabhadra is the 7th-century Hindu Virupaksha Temple, near the revived Hampi Bazaar. A carved stone chariot stands in front of the huge Vittala Temple site. Southeast of Hampi, Daroji Bear Sanctuary is home to the Indian sloth bear.',
        //   'https://images.unsplash.com/photo-1574340025134-44ba299d3990?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGhhbXBpfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
        //   'Jack Synder',
        //   new Date(),
        //   1
        // ),
      ];

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