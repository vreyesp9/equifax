import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'server/guard/auth.guard';
import { PrincipalComponent } from './components/principal/principal.component';


const routes: Routes = [


    {
        path: 'auth',
        loadChildren: () => import('./components/auth/auth.module').then(m => m.AuthModule),
    },
    {
        path: '',
        loadChildren: () => import('./components/auth/auth.module').then(m => m.AuthModule),
    },
    {
        path: 'main-layout',
        loadChildren: () => import('./components/main-layout/main-layout.module').then(m => m.MainLayoutModule),
    },
    {

        path: 'ticket',
        loadChildren: () => import('./components/ticket/ticket.module').then(m => m.TicketModule),
    },

    {
        path: 'home',
        component: PrincipalComponent,
        // children: [
        //     {




        //         // path: 'ticket',
        //         // loadChildren: () => import('./components/ticket/ticket.module').then(m => m.TicketModule),


        //     }


        // ],
        canActivate: [AuthGuard]
    },



];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
