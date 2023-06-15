import {Component, Input} from "@angular/core";
import {HeaderService} from "../../services/header.service";

@Component({
  selector: 'app-toolbar',
  templateUrl: './app-toolbar.component.html',
  styleUrls: ['./app-toolbar.component.scss'],
})
export class AppToolbarComponent {
  @Input() title: string;
  constructor(public readonly headerService: HeaderService) {}
}
