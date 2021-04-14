import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthConfigModule } from './auth/auth-config.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { playthroughReducer} from './state/playthrough.reducer';
import { EffectsModule } from "@ngrx/effects";
import { PlaythroughEffects } from './state/playthrough.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { NgLetModule } from '@ngrx-utils/store';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthConfigModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot({playthrough: playthroughReducer}),
    EffectsModule.forRoot([PlaythroughEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    RouterModule,
    NgLetModule
  ],
  //providers: [{provide: Client, useValue: }],
  bootstrap: [AppComponent]
})
export class AppModule { }
