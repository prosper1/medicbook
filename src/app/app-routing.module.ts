import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'booking-add',
    loadChildren: () => import('./booking-add/booking-add.module').then(m => m.BookingAddPageModule)
  },
  { path: 'prescription-detail/:id',
    loadChildren: () => import('./prescription-detail/prescription-detail.module').then(m => m.PrescriptionDetailPageModule)
  },
  { path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
