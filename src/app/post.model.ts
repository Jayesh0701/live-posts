export class Post{
    constructor(
        public title:string,
        public description:string, 
        public imagePath:string,
        public author:string,
        public date:Date,
        public numberOfLikes:number)
    {

    }
}