import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConvosComponent } from './convos/convos.component';
import { TalkComponent } from './talk/talk.component';

const routes: Routes = [
  { path: '', component: TalkComponent },
  { path: 'talk', component: TalkComponent },
  { path: 'convs', component: ConvosComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
