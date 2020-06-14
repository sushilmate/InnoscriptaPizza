import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {
  ngOnInit(): void {
    const cc = window as any;
    cc.cookieconsent.initialise({
      palette: {
        popup: {
          background: "#000000",
          opacity:"0.9"
        },
        button: {
          background: "#ffe000",
          text: "#164969"
        }
      },
      theme: "classic",
      content: {
        message: "Our Websites use Cookies to ensure that we give our visitors the best possible experience by providing you personalized information, remembering your marketing and product preferences, and helping you to obtain the right information",
        dismiss: "Accept",
      }
    });
  }

  title = 'app';

  ngOnDestroy(): void {
    localStorage.clear();
  }
}
