import { Component, OnInit } from '@angular/core';
import { filter, map } from "rxjs";
import { StoreService } from "../../services/store.service";
import { MatDialog } from "@angular/material/dialog";
import { ICategory } from "../../models/category";
import { ModalComponent, ModalComponentData } from "../../components/modal/modal.component";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  public categories$ = this.storeService.categories$.pipe(map(el => Array.from(el.values())))

  constructor(
    public readonly storeService: StoreService,
    public readonly dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.storeService.loadCategories()
  }


  public trackBy(_: any, value: ICategory) {
    return value.id;
  }

  public openModal() {
    const dialogRef = this.dialog.open<ModalComponent, ModalComponentData>(ModalComponent, {
      data: {
        title: 'Create category',
        description: 'For create category please enter name',
        buttonText: 'Create',
        value: '',
      }
    })

    dialogRef.afterClosed().pipe(filter((val) => val?.length)).subscribe(category => {
      this.storeService.createCategory({ name: category })
    });
  }
}
