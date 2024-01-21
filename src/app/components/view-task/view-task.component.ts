import { Component, OnInit } from '@angular/core';
import { ProviderService } from '../../services/provider.service';
import { Task } from '../../models/Task.model';
import { Route, Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.scss']
})
export class ViewTaskComponent implements OnInit{

  viewTask!: Task;
  id: any;
  constructor(private providerService: ProviderService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.id = this.route.snapshot.params['taskId'];
    this.getTaskById();
  }

  getTaskById() {
    this.providerService.getById(this.id).subscribe({
      next: (task: any) => {
        this.viewTask = task;
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

}
