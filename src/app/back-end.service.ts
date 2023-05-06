import { Injectable } from '@angular/core';
import { PostService } from './post.service';
import { Post } from './post.model';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { SignUp } from './sign-up.model';
import { throwError } from 'rxjs';

/**
 * Create Firebase realTime Database for testing purpose, So that we can have an idea that how we can connect with RestAPI
 * Database Path:-Firebase
 * https://live-posts-ea8eb-default-rtdb.firebaseio.com
 */

@Injectable({
  providedIn: 'root',
})
export class BackEndService {
  users: SignUp[]=[];
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
        if(allPost!==null){
        this.postService.setPost(allPost);
        }
      })
    ).subscribe();
  }
  async addUserInDB(userData:SignUp){
    let allUserAccount: SignUp[]=await this.getAllUsers();
    let isValid;
    if(allUserAccount!==null)
    {
      console.log(allUserAccount.find(item=>item.UserName===userData.UserName && item.EmailAddress===userData.EmailAddress));
      isValid=allUserAccount.find(item=>item.UserName===userData.UserName && item.EmailAddress===userData.EmailAddress);
      allUserAccount.forEach(item=>this.users.push(item));
    }
    if(isValid)
    {
      return true;
    }
    else{
    this.users.push(userData);
    await this.http
      .put(
        'https://live-posts-ea8eb-default-rtdb.firebaseio.com/UserDetails.json',
        this.users
      )
      .subscribe((res)=>{
        console.log(res);
      });
      return false;
    }
  }

  async loginWithUser(username:string,password:string){
    let allUserAccount: SignUp[]=await this.getAllUsers();
    let isValid;
    if(allUserAccount!==null)
    {
      console.log(allUserAccount.find(item=>item.UserName===username && item.Password===password));
      isValid=allUserAccount.find(item=>item.UserName===username && item.Password===password);
    }
    else{
      isValid=false;
    }
    return isValid;
  }
  async getAllUsers(): Promise<SignUp[]> {
    return new Promise<SignUp[]>((resolve, reject) => {
      let allUsersAccount: SignUp[] = [];
  
      this.http
        .get<SignUp[]>(
          'https://live-posts-ea8eb-default-rtdb.firebaseio.com/UserDetails.json'
        )
        .pipe(
          tap((allUsers: SignUp[]) => {
            console.log(allUsers);
            if (allUsers !== null) {
              allUsers.forEach((item) => allUsersAccount.push(item));
            }
            resolve(allUsersAccount);
          }),
          catchError((error) => {
            reject(error);
            return throwError(error);
          })
        )
        .subscribe();
    });
  }
}
