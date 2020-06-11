import { Component, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnDestroy {
  
  title = 'app';

  ngOnDestroy(): void {
    localStorage.clear();
  }
}
