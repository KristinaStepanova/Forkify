import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from "@angular/fire/firestore";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class SearchService {
  private apiUrl = environment.apiUrlFork;
  private apiKey = environment.apiKeyFork;
  private searchHistory: AngularFirestoreCollection;

  constructor(private http: HttpClient, private firestore: AngularFirestore) {
    this.searchHistory = this.firestore.collection("search_history");
  }

  getSearchHistory() {
    return this.searchHistory.snapshotChanges().pipe(
      map((actions) => {
        return actions.map((item) => {
          const data = item.payload.doc.data();
          const id = item.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  searchRecipe(value: string) {
    return this.http.get(`${this.apiUrl}?apiKey=${this.apiKey}&query=${value}`);
  }

  saveSearchHistory(value) {
    return this.searchHistory.add({ name: value, date: Date.now() });
  }
}
