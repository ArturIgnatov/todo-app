import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { ITodo } from "../../models/todo";
import { filter, ReplaySubject } from "rxjs";
import { StoreService } from "../../services/store.service";
import { BaseComponent} from "../base.component";
import { MatDialog } from "@angular/material/dialog";
import { ModalComponent, ModalComponentData } from "../modal/modal.component";

@Component({
  selector: 'app-todo',
  templateUrl: './app-todo.component.html',
  styleUrls: ['./app-todo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppTodoComponent extends BaseComponent {
  public todo$ = new ReplaySubject<ITodo>(1);
  constructor(private readonly  storeService: StoreService, private dialog: MatDialog) {
    super(AppTodoComponent.name)
  }

  @Input() set todo(value: ITodo) {
    this.todo$.next(value)
  }

  public setChecked(id: string, completed: boolean) {
    this.storeService.updateTodo({ id, completed })
  }

  public removeToDo(todo: ITodo) {
    this.storeService.removeTodo(todo.id, todo.category_id)
  }

  public editTodo(todo: ITodo) {
    const dialogRef = this.dialog.open<ModalComponent, ModalComponentData>(ModalComponent, {
      data: {
        title: 'Update todo',
        value: todo.title,
        description: 'Please enter new name',
        placeholder: 'Title',
        buttonText: 'Update todo'
      }
    })

    dialogRef.afterClosed().pipe(filter((value) => value?.length)).subscribe(value => {
      this.storeService.updateTodo({ id: todo.id, title: value })
    })
  }
}
