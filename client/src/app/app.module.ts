import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { MDBBootstrapModule } from "angular-bootstrap-md";

import { RouterModule, Routes } from "@angular/router";
import { appRoutes } from "./app.routing";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { PrivateareaComponent } from "./privatearea/privatearea.component";

@NgModule({
  declarations: [AppComponent, HomeComponent, PrivateareaComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    MDBBootstrapModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
