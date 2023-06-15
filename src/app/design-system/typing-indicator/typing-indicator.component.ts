import { Component } from '@angular/core';
import { interval, repeat, take, takeUntil } from "rxjs";
import { BaseComponent } from "../../components/base.component";

@Component({
  selector: 'app-typing-indicator',
  templateUrl: './typing-indicator.component.html',
  styleUrls: ['./typing-indicator.component.scss']
})
export class TypingIndicatorComponent extends BaseComponent {
  public dots = new Array(3).fill('')
  public current_index$ = interval(300)
    .pipe(
      take(this.dots.length + 1),
      repeat({ delay: 500 }),
      takeUntil(this.destroyed$)
    )

  constructor() {
    super(TypingIndicatorComponent.name);
  }
}
