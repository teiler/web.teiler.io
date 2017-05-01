import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NavigationService} from '../../../core/service/navigation.service';

@Component({
  selector: 'tylr-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent {
  private readonly NAME = 'GroupComponent';
}
