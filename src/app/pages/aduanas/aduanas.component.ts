import { Component, OnInit } from '@angular/core';
import { Aduana } from 'src/app/interfaces/aduana';
import { SimpleResponse } from 'src/app/interfaces/simple-response';
import { AduanasService } from 'src/app/services/aduanas.service';

@Component({
  selector: 'app-aduanas',
  templateUrl: './aduanas.component.html',
  styleUrls: ['./aduanas.component.css']
})
export class AduanasComponent implements OnInit {

  aduanas: Aduana[] = [];
  
  constructor( private aduanasService: AduanasService) { }

  ngOnInit(): void {
    /*this.aduanasService.listaAduanas()
      .subscribe( (resp: SimpleResponse) => {
        this.aduanas = resp.content;
      });*/
  }

}
