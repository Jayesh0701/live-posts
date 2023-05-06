import { Component,Input,OnInit } from '@angular/core';
import { Post } from '../post.model';
import { PostService } from '../post.service';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
@Input() post? :Post;
@Input() index:number=0;
constructor(private postService:PostService,private router:Router,public authService:AuthenticationService){
  this.authService.loginEvent.subscribe((isLoggedIn: boolean) => {
    this.authService.isLoggedIn = isLoggedIn;
  });
}
ngOnInit(): void {
  
}

onDelete(){
this.postService.deletePost(this.index);
}
onEdit(){
  this.router.navigate(["/post-edit",this.index]);
}
onLikePost(){
  this.postService.likePost(this.index);
}
}
