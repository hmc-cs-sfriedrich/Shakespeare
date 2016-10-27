import { bootstrap } from 'angular2/platform/browser';
import { HTTP_PROVIDERS } from 'angular2/http';
import {HttpSample} from "./environment_app.component"

bootstrap(HttpSample, [HTTP_PROVIDERS]);