import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { GetPropertyRulesService } from '../../services/properties/get_property_rules.service';
import { property } from '../../models/property';
import { propertyRules, RulesEntity } from '../../models/propertyRules';
import { propertyRulesProxy } from '../../models/propertyRulesProxy';
import { group } from '../../models/group';
import { HttpParams } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';      // Add this
import { GetPropertyHostnamesService } from '../../services/properties/get_property_hostnames.service';
import { hostname } from '../../models/hostname';
@Component({
  selector: 'app-property-rules',
  templateUrl: './property-rules.component.html',
  styleUrls: [ './property-rules.component.css' ],
  providers: [GetPropertyRulesService,GetPropertyHostnamesService]
})
export class PropertyRulesComponent implements OnInit {

  public properties:property[];
  public propertyRules:any;
  public propertyHostnames:hostname[];
  public rules:RulesEntity[];
  public property:string;
  public contract:string;
  public group:string;
  public version:string;
  public post:any;
  public search: string;
  isCopied1: boolean = false;
  isCopied2: boolean = false;
  public copyData:any;

  constructor(private getPropertyHostnamesService: GetPropertyHostnamesService,private getPropertyRulesService: GetPropertyRulesService,private route: ActivatedRoute) {
    this.properties=[];
    this.post='';
    this.rules=[];
    this.search='';
    this.copyData={};

    this.propertyHostnames=[];
    this.group = this.route.snapshot.url[1].path;
    this.contract = this.route.snapshot.url[2].path;
    this.property = this.route.snapshot.url[3].path;
    this.version = this.route.snapshot.url[4].path;



    this.getPropertyRulesService.getPropertyRules(this.property,this.version,this.group,this.contract);
    this.getPropertyRulesService.getPropertyRulesSubject.subscribe(
      res=>{

        this.rules = res.rules


        this.propertyRules=new propertyRulesProxy(res);
        let propertyRules = this.propertyRules;
        this.copyData = JSON.stringify(this.propertyRules);
        this.getPropertyHostnamesService.getPropertyHostnames(this.property,this.version,this.group,this.contract);
        this.getPropertyHostnamesService.getPropertyHostnamesSubject.subscribe(
          res=>{

            this.propertyHostnames = res.hostnames.items;
          });

      });
      this.route.params.subscribe(
        res => {
        this.group = res.groupId;
        this.contract =  res.contractId;
        this.property = res.propertyId;
        this.version =  res.propertyVersion;
        this.getPropertyRulesService.getPropertyRules(this.property,this.version,this.group,this.contract);

        });

   }
   ngOnInit() {
    //  this.getTokenService.getToken();
      this.getPropertyRulesService.getPropertyRules(this.property,this.version,this.group,this.contract);
    }

}
