import { Component, OnInit, Input } from '@angular/core';
import { translatedUrl } from '../../models/translatedUrl';
import { GetTranslatedUrlService } from '../../services/diagnostic-tools/get_translatedUrl.service';


@Component({
  selector: 'app-diagnostic-tools-translated-url',
  templateUrl: './translated-url.component.html',
  styleUrls: [ './translated-url.component.css' ],
  providers: [GetTranslatedUrlService]
})
export class TranslatedUrlComponent implements OnInit {

  public url: string;
  public search: string;
  public translatedUrl: any;
  constructor(private getTranslatedUrlService: GetTranslatedUrlService) {
    this.search = '';
    this.translatedUrl = {};
    this.url = '';
   }

  ngOnInit() {
  }

  getTranslatedUrl(){
    this.getTranslatedUrlService.getTranslatedUrl(this.url);
    this.getTranslatedUrlService.getTranslatedUrlSubject.subscribe(
      res => {
        this.translatedUrl = res;
      });
  }

}
