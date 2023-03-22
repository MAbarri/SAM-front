import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConvosComponent } from './convos/convos.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './services/auth-guard.service';
import { TalkComponent } from './talk/talk.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'talk', component: TalkComponent, canActivate: [AuthGuard] },
  { path: 'convs', component: ConvosComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
