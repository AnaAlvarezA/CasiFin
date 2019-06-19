import { Routes } from "@angular/router";

import { PrivateareaComponent } from "./privatearea/privatearea.component";
import { HomeComponent } from "./home/home.component";

export const appRoutes: Routes = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full"
  },

  { path: "privatearea", component: PrivateareaComponent }
];
