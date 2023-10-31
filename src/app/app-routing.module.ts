import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AudioComponent } from './componets/audio/audio.component';
import { HomeComponent } from './componets/home/home.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'audio/:folder/:text', component: AudioComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
