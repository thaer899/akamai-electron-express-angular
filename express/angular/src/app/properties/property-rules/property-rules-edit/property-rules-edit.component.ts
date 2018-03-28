import { Component, OnInit,ViewEncapsulation,ViewChild, Injector,Input, Output, EventEmitter, ElementRef, TemplateRef  } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ActivatedRoute,Router } from '@angular/router';      // Add this
import { ModalDirective } from 'ngx-bootstrap';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { propertyRules,RulesEntity } from '../../../models/propertyRules';
import { PutPropertyActivationService } from '../../../services/properties/put_property_rules.service';
import { GetPropertyRulesService } from '../../../services/properties/get_property_rules.service';
import { GetCloudletsService } from '../../../services/cloudlets/get_cloudlets.service';
import { GetCpcodesService } from '../../../services/get_cpcodes.service';
import { propertyVersionPost } from '../../../models/propertyVersionPost';
import { hostname } from '../../../models/hostname';
import { cloudletGroupsInfo } from '../../../models/cloudletGroupsInfo';
import { cpcode } from '../../../models/cpcode';
import { t1Properties } from '../../../models/t1Properties';
import { GetPropertyVersionsService } from '../../../services/properties/get_property_versions.service';
import { propertyVersion } from '../../../models/propertyVersion';

@Component({
  selector: 'property-rules-edit',
  templateUrl: './property-rules-edit.component.html',
  styleUrls: [ './property-rules-edit.component.css' ],
  providers: [GetPropertyVersionsService,PutPropertyActivationService,GetPropertyRulesService,GetCloudletsService,GetCpcodesService]
})
export class PropertyRulesEditComponent implements OnInit {

  @ViewChild('propertyRulesEditModal') modal: ModalDirective;
  @ViewChild('modalContent') modalContent: ElementRef;

  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
  @Input() data:any;
  @Input() cloudlet:any;
  @Input() cpcode:cpcode;
  @Input() propertyVersion:propertyVersion;
  public searchcloudlet: string;
  public searchcpcodes: string;

  active: boolean = false;
  public propertyRules:any;
  public post:any;
  public contract:string;
  public cloudlets:cloudletGroupsInfo[];
  public cpcodes:cpcode[];
  public propertyVersions:any[];
  public group:string;
  modalRef: BsModalRef;
  public versionPost:propertyVersionPost;
  public propDataCopied:any;
  constructor(private getPropertyVersionsService:GetPropertyVersionsService,private getCpcodesService: GetCpcodesService,private getCloudletsService: GetCloudletsService,private modalService: BsModalService,private getPropertyRulesService:GetPropertyRulesService,private putPropertyActivationService:PutPropertyActivationService,private route: ActivatedRoute,private router:Router) {
    this.searchcloudlet='';
    this.searchcpcodes='';
    this.propertyRules=[];
    this.post=this.data;
    this.cloudlets=[];
    this.cpcodes=[];
    this.propertyVersions=[];
    this.contract="ctr_1-23JXD1";
   }
   ngOnInit() {

    }
  openModal(template: TemplateRef<any>) {
    this.getCpcodesService.getCpcodes(this.data.groupId,this.contract);
    this.getCpcodesService.getCpcodesSubject.subscribe(
      res=>{
        this.cpcodes = res;
      });
    this.getPropertyVersionsService.getPropertyVersions(this.data.propertyId,this.data.groupId,this.contract);
    this.getPropertyVersionsService.getPropertyVersionsSubject.subscribe(
      res=>{
        this.propertyVersions = res;

      });
    this.getCloudletsService.getCloudlets(this.data.groupId.slice(4,this.data.groupId.length));
    this.getCloudletsService.getCloudletsSubject.subscribe(
      res=>{
        this.cloudlets = res;
      });

      this.searchcloudlet=this.data.erCloudletName;
      this.searchcpcodes=this.data.cpcodeName;
    this.modalRef = this.modalService.show(template);
  }

  updateRules(){
    this.propDataCopied = JSON.parse(this.post);
           // this.rules.behaviors.
           let i :number= 0;
           while(i< this.propDataCopied.rules.behaviors.length) {
            if(this.propDataCopied.rules.behaviors[i].name.toUpperCase()=="ORIGIN"){
              break;
            }
            i=i+1;
           }
           let j :number= 0;
           while(j< this.propDataCopied.rules.behaviors.length) {
            if(this.propDataCopied.rules.behaviors[j].name.toUpperCase()=="CPCODE"){
              break;
            }
            j=j+1;
           }
           let k :number= 0;
           while(k< this.propDataCopied.rules.children.length) {
            if(this.propDataCopied.rules.children[k].name.toUpperCase()=="CLOUDLET" || this.propDataCopied.rules.children[k].name.toUpperCase()=="CLOUDLETS"){
              break;
            }
            k=k+1;
           }
           this.propDataCopied.contractId = this.contract;
           this.propDataCopied.groupId = this.data.groupId;
           this.propDataCopied.propertyId = this.data.propertyId;
           this.propDataCopied.propertyName = this.data.propertyName;
           this.propDataCopied.propertyVersion = this.propertyVersion;
           this.propDataCopied.rules.behaviors[j].options.value.id = +this.cpcode.cpcodeId.slice(4,this.cpcode.cpcodeId.length);
           this.propDataCopied.rules.behaviors[j].options.value.name = this.cpcode.cpcodeName;
           this.propDataCopied.rules.behaviors[j].options.value.description = this.cpcode.cpcodeName;
           this.propDataCopied.rules.children[k].children[0].behaviors[0].options.cloudletPolicy.id = +this.cloudlet.policyId;
           this.propDataCopied.rules.children[k].children[0].behaviors[0].options.cloudletPolicy.name = this.cloudlet.name;

           if (!this.data.rules) {

            this.propDataCopied.rules.behaviors[i].options.hostname = this.data.origin;

           } else {
            this.propDataCopied.rules.behaviors[i].options.hostname = this.data.rules.behaviors[i].options.hostname;
           }

           this.putPropertyActivationService.putPropertyRules(this.data.propertyId,this.propertyVersion,this.data.groupId,this.contract,this.propDataCopied);
           this.putPropertyActivationService.putPropertyRulesSubject.subscribe(
             res=>{
               this.propertyRules = res;

             });
  }
  clickCpcode(cpcode){
    this.cpcode = cpcode;
  }
  clickPropertyVersion(propertyVersion){
    this.propertyVersion = propertyVersion;
  }
  clickCloudlet(cloudlet){
    this.cloudlet = cloudlet;
  }
}
