import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  searchResult;

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }

  onGetRecepies(res) {
    this.searchResult = res.results;
  }

}
