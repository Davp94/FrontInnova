import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  version: string;
  date = new Date();
  
  constructor() { 
    this.version = environment.version;
  }

  ngOnInit(): void {
  }

}
