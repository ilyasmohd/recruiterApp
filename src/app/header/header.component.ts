import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  private isMobileResolution: boolean;    
  toggleNav:boolean=true;
  toggle:boolean=false;

  constructor() {

  }

  pixelWidth:any;
  ngOnInit() {
    window.scroll(0, 0);
    this.pixelWidth = window.screen.width;
    if (this.pixelWidth > 768) {
      this.toggleNav = true;
    }
    // else {
    //   this.toggleNav = false;
    // }
    $(document).ready(function () {
    $('.navbar-dark .dmenu').hover(function () {
            $(this).find('.sm-menu').first().stop(true, true).slideDown(200);
        }, function () {
            $(this).find('.sm-menu').first().stop(true, true).slideUp(155)
        });
    });
  }

  hideNavbar(){
    this.pixelWidth = window.screen.width;
    if (this.pixelWidth <= 768) {
      this.toggleNav = !this.toggleNav;
    }
  }

  navToggle(){
    this.pixelWidth = window.screen.width;
      this.toggle = !this.toggle;
    }
 

}
