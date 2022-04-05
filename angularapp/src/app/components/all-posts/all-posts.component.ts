import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../Services/posts.service';

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.css'],
})
export class AllPostsComponent implements OnInit {
  postHeader: string = '';
  postBody: string = '';
  showForm: Boolean = false;
  isEdit: Boolean = false;
  editId: string = '';
  posts: any = [];

  constructor(private allPosts: PostsService) {
    this.getAllPosts();
  }

  getAllPosts() {
    this.allPosts.getPosts().subscribe((data) => {
      this.posts = data;
    });
  }

  ngOnInit(): void {}

  openForm() {
    this.showForm = !this.showForm;
    if (!this.showForm) {
      this.isEdit = false;
     
    this.postHeader = '';
    this.postBody = '';
    }
  }

  onSubmit(post: string[]) {
    console.log(post);
    
    if (this.isEdit) {
      this.allPosts.editPosts(this.editId, post).subscribe((data) => {
        if (data) {
          this.showForm = false;
          this.isEdit = false;
          this.getAllPosts();
        }
      });
    } else {
      this.allPosts.savePosts(post).subscribe((data) => {
        if (data) {
          this.showForm = false;
          this.getAllPosts();
        }
      });
    }
  }

  deletePost(id: string) {
    this.allPosts.deletePosts(id).subscribe((data) => {
      if (data) {
        this.getAllPosts();
      }
    });
  }
  editPosts(id: string, post: any) {
    this.showForm = true;
    this.isEdit = true;
    this.editId = id;
    this.postHeader = post.postHeader;
    this.postBody = post.postBody;
  }
}
