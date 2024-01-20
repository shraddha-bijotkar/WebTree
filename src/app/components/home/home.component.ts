import { Component, OnInit } from '@angular/core';
import { ProviderService } from 'src/app/services/provider.service';
import { Task } from 'src/app/models/Task.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  allTasks: Task[] = [];
  deletedTask!: Task;
  constructor(private providerService: ProviderService, private router: Router) {}

  ngOnInit() {
    this.getAllTasks();
  }

  getAllTasks() {
    this.providerService.get().subscribe({
      next: (tasks: Task[]) => {
        console.log(tasks);
        this.allTasks = tasks;
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  deleteTask(taskId: Number) {
    this.providerService.delete(taskId).subscribe({
      next: (task: any) => {
        console.log(task);
        this.deletedTask = task;
        window.alert('Task : ' + `${task.title}` + ' has been deleted successfully!');
        window.location.reload();
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  addTask() {
    this.router.navigate(['AddTask']);
  }

}