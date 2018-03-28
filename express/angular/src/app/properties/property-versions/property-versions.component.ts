import { Component, OnInit,ViewEncapsulation,ViewChild, Injector,Input, Output, EventEmitter, ElementRef, TemplateRef  } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ActivatedRoute,Router } from '@angular/router';      // Add this
import { ModalDirective } from 'ngx-bootstrap';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { GetPropertyVersionsService } from '../../services/properties/get_property_versions.service';
import { PostPropertyVersionService } from '../../services/properties/post_property_version.service';
import { propertyVersion } from '../../models/propertyVersion';
import { property } from '../../models/property';
import { propertyVersionPost } from '../../models/propertyVersionPost';
import { GetPropertyRulesService } from '../../services/properties/get_property_rules.service';
import { locations } from '../../models/ghostLocations';
import { item } from '../../models/propertyEdit';

@Component({
  selector: 'property-versions',
  templateUrl: './property-versions.component.html',
  styleUrls: [ './property-versions.component.css' ],
  providers: [GetPropertyVersionsService,GetPropertyRulesService,PostPropertyVersionService]
})
export class PropertyVersionsComponent implements OnInit {

  @ViewChild('propertyVersionsModal') modal: ModalDirective;
  @ViewChild('modalContent') modalContent: ElementRef;

  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
  @Input() data;

  active: boolean = false;
  public propertyVersion:number;
  public propertyVersions:item[];
  public contract:string;
  public group:string;
  modalRef: BsModalRef;
  public versionPost:propertyVersionPost;

  constructor(private modalService: BsModalService,private getPropertyRulesService:GetPropertyRulesService,private postPropertyVersionService:PostPropertyVersionService,private getPropertyVersionsService: GetPropertyVersionsService,private route: ActivatedRoute,private router:Router) {
    this.propertyVersions=[];
    this.propertyVersion=0;
    this.versionPost ={
      createFromVersion:0,
      createFromVersionEtag:""
    }
   }

   ngOnInit() {
    //  this.getTokenService.getToken();

    }
  openModal(template: TemplateRef<any>) {
    this.getPropertyVersionsService.getPropertyVersions(this.data.propertyId,this.data.groupId,this.data.contractId);
    this.getPropertyVersionsService.getPropertyVersionsSubject.subscribe(
      res=>{
        this.propertyVersions = res;

      });
    this.modalRef = this.modalService.show(template);
  }

  cloneVersion(propertyId:string,propertyVersion:propertyVersion){
    this.versionPost.createFromVersion=propertyVersion.propertyVersion;
    this.versionPost.createFromVersionEtag=propertyVersion.etag;
    this.postPropertyVersionService.postPropertVersion(propertyId,this.data.groupId,this.data.contractId,this.versionPost);
    this.postPropertyVersionService.postPropertyVersionSubject.subscribe(
      res=>{
          this.getPropertyRulesService.getLink(res.versionLink);
          this.getPropertyRulesService.getPropertyEditSubject.subscribe(
            res=>{
              this.router.navigate([`propertyRules/${res.groupId}/${res.contractId}/${res.propertyId}/${res.versions.items[0].propertyVersion}/`]);

            });
      });

}

}
