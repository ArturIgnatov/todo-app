import {Injectable, TemplateRef} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  public right_controls$ = new BehaviorSubject<TemplateRef<any>>(null)
  public left_controls$ = new BehaviorSubject<TemplateRef<any>>(null)

  constructor() { }
}
