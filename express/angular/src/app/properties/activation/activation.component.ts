import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { PostPropertyActivationService } from '../../services/properties/post_property_activation.service';
import { HttpParams } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';      // Add this
import { activationData } from '../../models/activationData';

@Component({
  selector: 'app-activation',
  templateUrl: './activation.component.html',
  styleUrls: [ './activation.component.css' ],
  providers: [PostPropertyActivationService]
})
export class ActivationComponent implements OnInit {

  public contract:string;
  public property:string;
  public group:string;
  public post:activationData;
  public search: string;
  public activation:any;
  constructor(private postPropertyActivationService: PostPropertyActivationService,private route: ActivatedRoute) {
    this.search='';

    this.property = this.route.snapshot.url[1].path;
    this.contract = this.route.snapshot.url[2].path;
    this.group = this.route.snapshot.url[3].path;
    this.post = JSON.parse(this.route.snapshot.url[4].path);
    this.postPropertyActivationService.postPropertyActivationRules(this.property,this.group,this.contract,this.post);
    this.postPropertyActivationService.postPropertyActivationSubject.subscribe(
      res=>{
        this.activation = res;
        let activation = this.activation;
      });
    this.route.params.subscribe(
      );

   }
   ngOnInit() {
    this.postPropertyActivationService.postPropertyActivationRules(this.property,this.group,this.contract,this.post);
    }

}
