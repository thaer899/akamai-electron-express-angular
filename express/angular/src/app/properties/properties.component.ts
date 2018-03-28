import { Component, OnInit, ViewEncapsulation, TemplateRef, Input, Output } from '@angular/core';
import { GetPropertiesService } from '../services/properties/get_properties.service';
import { PostPropertyActivationService } from '../services/properties/post_property_activation.service';
import { property } from '../models/property';
import { group } from '../models/group';
import { activationData } from '../models/activationData';
import { HttpParams } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';      // Add this
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { GetPropertyHostnamesService } from '../services/properties/get_property_hostnames.service';
import { GetPropertyVersionsService } from '../services/properties/get_property_versions.service';
import { hostname } from '../models/hostname';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: [ './properties.component.css' ],
  providers: [GetPropertyVersionsService,GetPropertiesService,PostPropertyActivationService,GetPropertyHostnamesService]
})
export class PropertiesComponent implements OnInit {

  @Output() data;

  public search:string;
  public property:string;
  public properties:property[];
  public propertyHostnames:hostname[];
  public contract:string;
  public group:string;
  public post:activationData;
  modalRef: BsModalRef;


  constructor(private modalService: BsModalService,private getPropertyVersionsService:GetPropertyVersionsService,private getPropertyHostnamesService: GetPropertyHostnamesService,private getPropertiesService: GetPropertiesService,private postPropertyActivationService: PostPropertyActivationService,private route: ActivatedRoute) {
    this.properties=[];
    this.post={
      propertyVersion :0,
      network :'STAGING',
      note :'Initial config',
      notifyEmails :['thaer.saidi@electrolux.com'],
      acknowledgeWarnings :["msg_eac797d55da505d7f40dcd3857d003c83ba8d7c1"],
      useFastFallback:false};

    this.search='';
    this.property = this.route.snapshot.url[0].path;
    this.group = this.route.snapshot.url[1].path;
    this.contract = this.route.snapshot.url[2].path;
    this.getPropertiesService.getProperties(this.group,this.contract);
    this.getPropertiesService.getPropertiesSubject.subscribe(
      res=>{
        this.properties = res;
        let mape = new Map();
        let mylist = ["T1_AEG.FI","T1_AEG.CZ","T1_AEG_UA","T1_AEG_RU","T1_AEG.LU","T1_AEG.NO","T1_AEG.DE","T1_AEG_BG","T1_AEG.IT","T1_AEG.CH","T1_AEG.SE","T1_AEG.SK","T1_AEG.PL","T1_AEG.PT","T1_AEG.BE","T1_AEG_ZA","T1_AEG.ES","T1_AEG.NL","T1_AEG.AT","T1_AEG.DK","T1_AEG_HU","T1_AEG_IE","T1_AEG_GR","T1_AEG_TR","T1_AEG_HR","T1_AEG_LT","T1_AEG.FR","T1_AEG.CO.UK","T1_AEG_LV","T1_AEG_RO","T1_AEG_EE","T1_AEG_SI","T1_ELECTROLUX_LU","T1_ELECTROLUX_PT","T1_ELECTROLUX_AL","T1_ELECTROLUX_GR","T1_ELECTROLUX_HR","T1_ELECTROLUX_SI","T1_ELECTROLUX_IE","T1_ELECTROLUX_NO","T1_ELECTROLUX_EE","T1_ELECTROLUX_DK","T1_ELECTROLUX_RU","T1_ELECTROLUX_FI","T1_ELECTROLUX_SE","T1_ELECTROLUX_HU","T1_ELECTROLUX_LV","T1_ELECTROLUX_UK","T1_ELECTROLUX.PL","T1_ELECTROLUX.CH","T1_ELECTROLUX_LT","T1_ELECTROLUX_TR","T1_ELECTROLUX_ES","T1_ELECTROLUX_BG","T1_ELECTROLUX_RO","T1_ELECTROLUX_UA","T1_ELECTROLUX_SK","T1_ELECTROLUX_BE","T1_ELECTROLUX_RS","T1_ELECTROLUX_CZ","T1_ELECTROLUX.FR","T1_ELECTROLUX_NL","T1_ELECTROLUX.IT","T1_ZANUSSI_LU","T1_ZANUSSI_DK","T1_ZANUSSI_SK","T1_ZANUSSI.HU","T1_Zanussi_TR","T1_ZANUSSI_NO","T1_ZANUSSI_CZ","T1_ZANUSSI_RU","T1_ZANUSSI_PT","T1_ZANUSSI_UK","T1_ZANUSSI_CH","T1_ZANUSSI_PL","T1_ZANUSSI_BE","T1_ZANUSSI_DE","T1_ZANUSSI_NL","T1_ZANUSSI_ES","T1_ZANUSSI_EG","T1_ZANUSSI_IE","T1_ZANUSSI_AT","T1_ZANUSSI_UA","T1_ZANUSSI_GR","T1_ZANUSSI_RO","T1_CENTRALABYGG.COM","T1_FAURE_COM","T1_Husqvarna_electrolux_SE","T1_JUNO_DE","T1_leonard_hausgeraete_DE","T1_Progress_hausgeraete_DE","T1_ROSENLEW_FI","T1_TORNADO_FR","T1_VOLTA_DK","T1_VOLTA_FI","T1_VOLTA_NO","T1_VOLTA_SE","T1_VOSS_DK","T1_ZANKER_DE"];
        for (let list of mylist) {
          for (let prop of this.properties) {
            if (prop.propertyName.replace(/[\/\(\)\#\*/\&.\s]/g, '').includes(list.replace(/[\/\(\)\#\*/\&.\s]/g, ''))) {
            mape.set(prop.propertyId,list);
          }
        }
      }
      });
      this.route.params.subscribe(
      );
      this.route.params.subscribe(params => {
        this.properties=[];
        this.search='';
        this.property = this.route.snapshot.url[0].path;
        this.group = this.route.snapshot.url[1].path;
        this.contract = this.route.snapshot.url[2].path;
        this.getPropertiesService.getProperties(this.group,this.contract);

      });
   }
   ngOnInit() {
      this.getPropertiesService.getProperties(this.group,this.contract);
    }

    propertyActivate(propertyId:string){
      this.postPropertyActivationService.postPropertyActivationRules(propertyId,this.group,this.contract,this.post);
      this.postPropertyActivationService.postPropertyActivationSubject.subscribe(
        res=>{
          if (res) {
            for (let i = 0; i < res.length; i++) {
              this.post.acknowledgeWarnings.push(res[i].messageId);
            }
            alert(JSON.stringify(res));

            this.postPropertyActivationService.postPropertyActivationRules(propertyId,this.group,this.contract,this.post);

          }
        });

    }

    updatePostNetwork(network){
      this.post.network = network;
    }
}
