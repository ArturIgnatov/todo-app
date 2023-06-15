import {Inject, Injectable, OnChanges, OnDestroy, SimpleChanges} from "@angular/core";
import {Subject} from "rxjs";

@Injectable()
export  class BaseComponent implements OnDestroy, OnChanges {
  public destroyed$ = new Subject<void>();
  constructor(@Inject('name') private name: string) {}

  public ngOnChanges(changes: SimpleChanges) {
    console.warn(this.name + ' CHANGED', changes)
  }

  public ngOnDestroy() {
    this.destroyed$.next()
    this.destroyed$.complete()
  }
}
