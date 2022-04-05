import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
const url = 'http://localhost:3000/';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private http: HttpClient) {}

  getPosts() {
    return this.http.get(url);
  }

  savePosts(post: string[]) {
    return this.http.post(url, post);
  }

  deletePosts(id: string) {
    return this.http.delete(`${url}${id}`, { responseType: 'text' });
  }

  editPosts(id: string, post: string[]) {
    return this.http.put(`${url}${id}`, post, { responseType: 'text' });
  }
}
