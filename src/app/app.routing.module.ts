import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth-guard.service';

import { LoginComponent } from './login/login.component';
import { ConversationComponent } from './conversation/conversation.component';

const routes: Routes = [
    {
        path: '',
        component: LoginComponent
      },
      {
      path: 'login',
      component: LoginComponent
    },
    {
        path: 'chat',
        component: ConversationComponent,
        canActivate: [AuthGuard],
    },
    { path: '**', redirectTo: '' }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [AuthGuard],
  })
  export class AppRoutingModule { }