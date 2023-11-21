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

const routes: Routes = [
  {
    path: 'home2',
    component: HomeComponent,
    // canActivate: [accesoGuard],  // Agrega canActivateChild aquí
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' }, // Redirect to login as the default route
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignUpComponent },
      { path: 'about', component: AboutComponent },
      { path: 'portfolio', component: PortfolioComponent },

      // Add other child routes as needed
    ],
  },
  { path: 'login', component: LoginComponent },
  { path: 'home-desktop', component: HomeDesktopComponent },
  { path: 'yo-nunca', component: YoNuncaComponent },
  { path: 'splash', component: SplashComponent },
  { path: 'resume', component: ResumeComponent },
  { path: '', component: IndexComponent },

  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
