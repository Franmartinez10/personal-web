import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-device-check',
  templateUrl: './device-check.component.html',
  styleUrls: ['./device-check.component.scss'],
})
export class DeviceCheckComponent implements OnInit {
  isDesktop: boolean;

  constructor(
    private deviceService: DeviceDetectorService,
    private router: Router,
  ) {
    this.isDesktop = this.deviceService.isDesktop();

    // if (window.screen.width < 1000) {
    //   this.router.navigate(['mobile']);
    // }
    // if (window.screen.width > 1000) {
    //   this.router.navigate(['index']);
    // }
    // window.addEventListener('resize', () => {
    //   if (window.innerWidth < 1000) {
    //     this.router.navigate(['mobile']);
    //   }
    //   if (window.innerWidth > 1000) {
    //     this.router.navigate(['index']);
    //   }
    // });
    // window.addEventListener('resize', () => {
    //   if (window.innerWidth < 1000) {
    //     this.router.navigate(['mobile']);
    //   }
    //   if (window.innerWidth > 1000) {
    //     this.router.navigate(['index']);
    //   }
    // });
  }
  //   if (window.screen.width < 1000) {
  //     this.router.navigate(['mobile']);
  //   }
  //   if (window.screen.width > 1000) {
  //     this.router.navigate(['index']);
  //   }
  //   window.addEventListener('resize', () => {
  //     if (window.innerWidth < 1000) {
  //       this.router.navigate(['mobile']);
  //     }
  //     if (window.innerWidth > 1000) {
  //       this.router.navigate(['index']);
  //     }
  //   });

  //   window.addEventListener('resize', () => {
  //     if (window.innerWidth < 1000) {
  //       this.router.navigate(['mobile']);
  //     }
  //     if (window.innerWidth > 1000) {
  //       this.router.navigate(['index']);
  //     }
  //   });
  // }
  ngOnInit(): void {
    if (window.screen.width < 1000) {
      this.router.navigate(['mobile']);
    }
    if (window.screen.width > 1000) {
      this.router.navigate(['']);
    }
  }
}
