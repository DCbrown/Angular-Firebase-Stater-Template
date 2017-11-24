import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

interface Post {
  title: string;
  content: string;
}
interface PostId extends Post {
  id: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  postsCol: AngularFirestoreCollection<Post>;
  posts: any;

  title:string;
  content:string;

  constructor(private afs: AngularFirestore) {

  }

  // Retriving Post data and ID from firestore
  ngOnInit() {
    this.postsCol = this.afs.collection('posts');
    this.posts = this.postsCol.snapshotChanges()
      .map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Post;
          const id = a.payload.doc.id;
          return { id, data };
        })
      })
  }

  // Add post to firestore databse
  addPost() {
    this.afs.collection('posts').add({'title': this.title, 'content': this.content});
  }

  // Delete Post data from database
  deletePost(postId) {
    this.afs.doc('posts/'+postId).delete();
  }
}
