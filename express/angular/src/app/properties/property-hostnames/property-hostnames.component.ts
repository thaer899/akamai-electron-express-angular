import { Component, OnInit,ViewEncapsulation,ViewChild, Injector,Input, Output, EventEmitter, ElementRef, TemplateRef  } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';      // Add this
import { ModalDirective } from 'ngx-bootstrap';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { property } from '../../models/property';
import { GetPropertiesService } from '../../services/properties/get_properties.service';
import { PostPropertyActivationService } from '../../services/properties/post_property_activation.service';
import { GetPropertyHostnamesService } from '../../services/properties/get_property_hostnames.service';
import { hostname, Hostnames, ItemsEntity } from '../../models/hostname';

@Component({
  selector: 'property-hostnames',
  templateUrl: './property-hostnames.component.html',
  styleUrls: [ './property-hostnames.component.css' ],
  providers: [GetPropertyHostnamesService]
})
export class PropertyHostnamesComponent implements OnInit {

  @ViewChild('propertyHostnamesModal') modal: ModalDirective;
  @ViewChild('modalContent') modalContent: ElementRef;

  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
  @Input() data;

  active: boolean = false;
  public property:string;
  public propertyHostnames:hostname[];
  public contract:string;
  public group:string;
  modalRef: BsModalRef;


  constructor(private modalService: BsModalService,private getPropertyHostnamesService: GetPropertyHostnamesService,private route: ActivatedRoute) {
    this.propertyHostnames=[];
    this.property='';

   }

   ngOnInit() {
    //  this.getTokenService.getToken();

    }
  openModal(template: TemplateRef<any>) {
    this.getPropertyHostnamesService.getPropertyHostnames(this.data.propertyId,this.data.latestVersion,this.data.groupId,this.data.contractId);
    this.getPropertyHostnamesService.getPropertyHostnamesSubject.subscribe(
      res=>{
        this.propertyHostnames = res.hostnames.items;
        this.property =res.propertyName

      });
    this.modalRef = this.modalService.show(template);
  }

}
