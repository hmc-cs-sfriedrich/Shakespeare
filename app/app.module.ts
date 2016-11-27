import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule }  from '@angular/http';
import { ChangeRunPipe } from './changerun.pipe';
import { RunCharsPipe } from './runchars.pipe';

import { AppComponent }  from './app.component';

@NgModule({
  imports:      [ 
                  BrowserModule, 
                  FormsModule, 
                  HttpModule, 
                  JsonpModule
                ],
  declarations: [ AppComponent, ChangeRunPipe, RunCharsPipe ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
