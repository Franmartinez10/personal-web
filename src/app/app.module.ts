import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { BarComponent } from './components/bar/bar.component';
import { PortfolioComponent } from './pages/portfolio/portfolio.component';
import { HomeComponent } from './pages/home/home.component';
import { PortfolioCardsComponent } from './components/portfolio-cards/portfolio-cards.component';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { config } from 'rxjs';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { GuardService } from './services/guard.service';
import { AuthService } from './services/auth.service';
import { RouterModule } from '@angular/router';
import { EditorModule } from '@tinymce/tinymce-angular';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './pages/about/about.component';
import { HomeDesktopComponent } from './pages-desktop/home-desktop/home-desktop.component';
import { YoNuncaComponent } from './pages-desktop/yo-nunca/yo-nunca.component';
import { SplashComponent } from './pages-desktop/splash/splash.component';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { ResumeComponent } from './pages-desktop/resume/resume.component';
import { IndexComponent } from './pages-desktop/index/index.component';
import { DockModule } from 'primeng/dock';
import { MenubarModule } from 'primeng/menubar';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { TreeModule } from 'primeng/tree';
import { TerminalModule } from 'primeng/terminal';
import { GalleriaModule } from 'primeng/galleria';
import { MessagesModule } from 'primeng/messages';
import { MessageService } from 'primeng/api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PhotoService } from './services/photo.service';
import { NodeService } from './services/node.service';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ContextMenuModule } from 'primeng/contextmenu';
import { GoogleComponent } from './components/google/google.component';
import { YoNuncaRevolutionComponent } from './components/yo-nunca-revolution/yo-nunca-revolution.component';
import { DropdownModule } from 'primeng/dropdown';

export function HttpLoadFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BarComponent,
    HomeComponent,
    PortfolioComponent,
    PortfolioCardsComponent,
    LoginComponent,
    SignUpComponent,
    AboutComponent,
    HomeDesktopComponent,
    YoNuncaComponent,
    SplashComponent,
    ResumeComponent,
    IndexComponent,
    GoogleComponent,
    YoNuncaRevolutionComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    EditorModule,
    MenubarModule,
    TreeModule,
    DialogModule,
    DockModule,
    GalleriaModule,
    TerminalModule,
    MessagesModule,
    HttpClientModule,
    ConfirmDialogModule,
    BrowserAnimationsModule,
    ContextMenuModule,
    DropdownModule,
    ToastModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoadFactory,
        deps: [HttpClient],
      },
    }),
    InlineSVGModule.forRoot(),
  ],
  providers: [MessageService, PhotoService, NodeService],
  bootstrap: [AppComponent],
})
export class AppModule {}
