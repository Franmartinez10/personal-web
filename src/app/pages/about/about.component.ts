import { Component, OnInit } from '@angular/core';
import { About } from 'src/app/modelos/interfaces';
import { StrapiService } from 'src/app/services/strapi.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss','../../../styles/bootstrap.css','../../../styles/style.css','../../../fonts/css/fontawesome-all.min.css']
})
export class AboutComponent implements OnInit {
  datos:any;

  constructor(
    private strapiService:StrapiService,
  ){

  }

  ngOnInit(): void {
    this.strapiService.getAllItems('about?populate=*').then((data:any)=>{
      
      this.datos = new About(data.data.data);
      console.log(this.datos,data.data.data);

    })
  }

}
