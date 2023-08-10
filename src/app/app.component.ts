import { ChangeDetectorRef, Component } from '@angular/core';
import { LoaderService } from './services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'school-management-system';


  constructor(private readonly loaderService: LoaderService, private cdr: ChangeDetectorRef) {

  }


  ngOnInit() {

  }



  show: boolean = false;



  ngAfterViewInit(): void {
    console.debug('AppComponent/ngAfterViewInit');

    this.loaderService.httpProgress().subscribe({
      next: (httpInProgress: boolean) => {
        this.showLoader = httpInProgress;
        this.cdr.detectChanges();
      }
    });
  }


  showLoader = false;
}
