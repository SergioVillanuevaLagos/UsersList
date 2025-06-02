import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbard',
  templateUrl: './navbard.component.html',
  styleUrls: ['./navbard.component.css']
})
export class NavbardComponent implements OnInit {

  constructor(private ruta: Router) { }

  ngOnInit(): void {
  }

   ira(url: string):void{
    console.log(url);
    this.ruta.navigate([url]);

    }


}
