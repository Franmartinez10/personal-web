import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { LoginComponent } from './pages/login/login.component';
import { accesoGuard } from './services/acceso.guard';
import { AboutComponent } from './pages/about/about.component';
import { PortfolioComponent } from './pages/portfolio/portfolio.component';
import { HomeDesktopComponent } from './pages-desktop/home-desktop/home-desktop.component';
import { YoNuncaComponent } from './pages-desktop/yo-nunca/yo-nunca.component';
import { SplashComponent } from './pages-desktop/splash/splash.component';
import { ResumeComponent } from './pages-desktop/resume/resume.component';
import { IndexComponent } from './pages-desktop/index/index.component';
import { DeviceCheckComponent } from './components/device-check/device-check.component';
import { IphonescreenComponent } from './pages/iphonescreen/iphonescreen.component';
import { IphoneSafariComponent } from './pages/iphone-safari/iphone-safari.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { MobileRouteComponent } from './components/mobile-route/mobile-route.component';
import { DesktopRouteComponent } from './components/desktop-route/desktop-route.component';
import { YoNuncaRevolutionComponent } from './components/yo-nunca-revolution/yo-nunca-revolution.component';
import { GoogleComponent } from './components/google/google.component';
import { RelojComponent } from './components/reloj/reloj.component';

const routes: Routes = [
  {
    path: '',
    component: DeviceCheckComponent,
    children: [
      // {
      //   path: 'home',
      //   component: IphonescreenComponent,
      //   // canActivate: [accesoGuard],  // Agrega canActivateChild aquí
      //   children: [
      //     { path: '', redirectTo: 'index', pathMatch: 'full' }, // Redirect to login as the default route
      //     { path: 'login', component: LoginComponent },
      //     { path: 'signup', component: SignUpComponent },
      //     { path: 'about', component: AboutComponent },
      //     { path: 'portfolio', component: PortfolioComponent },
      //     { path: '**', redirectTo: '', pathMatch: 'full' },

      //     // Add other child routes as needed
      //   ],
      // },
      {
        path: '',
        component: DesktopRouteComponent,
        children: [{ path: '', component: IndexComponent }],
      },
      {
        path: 'mobile',
        component: MobileRouteComponent,
        children: [
          {
            path: 'safari',
            component: IphoneSafariComponent,
            pathMatch: 'full',
          },
          { path: 'home', component: IphonescreenComponent }, // Ruta por defecto de '/mobile'
          { path: 'galeria', component: GalleryComponent }, // Ruta para '/mobile/galeria'
          { path: '', redirectTo: 'home', pathMatch: 'full' },
        ],
      },

      // ... otras rutas
    ],
  },

  // { path: 'login', component: LoginComponent },
  // { path: 'home-desktop', component: HomeDesktopComponent },
  { path: 'yonunca', component: YoNuncaRevolutionComponent },
  // { path: 'splash', component: SplashComponent },
  // { path: 'resume', component: ResumeComponent },
  // { path: '', component: IndexComponent },
  { path: 'safari', component: IphoneSafariComponent },
  { path: 'galeria', component: GalleryComponent },
  { path: 'google', component: GoogleComponent },
  { path: 'reloj', component: RelojComponent },

  { path: '**', component: DeviceCheckComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
