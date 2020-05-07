import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { EntriesComponent } from "./entries/entries.component";

const routes: Routes = [
  {
    path: "entries",
    pathMatch: "full",
    component: EntriesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
