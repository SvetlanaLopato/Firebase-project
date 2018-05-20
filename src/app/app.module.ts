import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { CdkTableModule } from '@angular/cdk/table';

import { AppMaterialModule } from './app-material.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { AuthorizationModule } from './authorization/authorization.module';
import { HttpInterceptorService } from './shared/http-interceptor.service';
import { UserModule } from './user/user.module';

@NgModule({
    declarations: [AppComponent],
    imports: [
        RouterModule.forRoot([]),
        BrowserModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        CdkTableModule,
        AppMaterialModule,
        AuthorizationModule,
        UserModule,
        SharedModule,
    ],
    providers: [{
        provide: HTTP_INTERCEPTORS,
        useClass: HttpInterceptorService,
        multi: true,
    }],
    bootstrap: [AppComponent]
})
export class AppModule { }

