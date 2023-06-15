import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { ICategory } from "../../models/category";
import { filter, map, ReplaySubject, takeUntil } from "rxjs";
import { BaseComponent } from "../base.component";
import { ITodo} from "../../models/todo";
import { StoreService } from "../../services/store.service";
import { MatDialog } from "@angular/material/dialog";
import { ModalComponent, ModalComponentData } from "../modal/modal.component";

@Component({
  selector: 'app-category',
  templateUrl: './app-category.component.html',
  styleUrls: ['./app-category.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppCategoryComponent extends BaseComponent {
  public category$ = new  ReplaySubject<ICategory>(1)
  public completed$ = this.category$.pipe(map((value) => value.todos.filter(el => el.completed).length), takeUntil(this.destroyed$))

  @Input() set category(v: ICategory) {
    this.category$.next(v)
  }

  constructor(private storeService: StoreService,  public dialog: MatDialog) {
    super(AppCategoryComponent.name);
  }

  public todoTrackBy(_:any, value: ITodo) {
    return value.id
  }

  public removeCategory(id: string) {
    this.storeService.removeCategory(id)
  }

  public createTodo(categoryId: string) {
    const dialogRef = this.dialog.open<ModalComponent, ModalComponentData>(ModalComponent, {
      data: {
        title: 'Create todo',
        description: 'Enter name for new todo',
        value: '',
        buttonText: 'Create todo'
      }
    })

    dialogRef.afterClosed().pipe(filter(val => val?.length)).subscribe(value => {
      this.storeService.createTodo(categoryId, value)
    })
  }

  public editCategory(id: string, value: string) {
    const dialogRef = this.dialog.open<ModalComponent, ModalComponentData>(ModalComponent, {
      data: {
        title: 'Update name',
        description: 'Enter new name for category',
        value,
        buttonText: 'Update'
      }
    })

    dialogRef.afterClosed().pipe(filter((value) => value?.length)).subscribe(value => {
      this.storeService.updateCategory(id, { name: value  })
    })
  }
}
