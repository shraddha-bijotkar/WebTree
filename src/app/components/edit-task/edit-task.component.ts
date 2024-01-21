import { Component, OnInit } from '@angular/core';
import { Task, Status } from '../../models/Task.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProviderService } from '../../services/provider.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit{

  toBeEdited!: Task;
  taskEditForm!: FormGroup;
  isSubmitted = false;
  controls!: any;
  id: any;
  completed = Status.Completed;
  inComplete = Status.InComplete;

  constructor(private providerService: ProviderService, private router: Router, private fb: FormBuilder, private route: ActivatedRoute) {
    this.taskEditForm = this.fb.group({
      id: [],
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(5)]],
      dueDate: [Validators.required],
      status: [Status.InComplete],
    });
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['taskId'];
    console.log(this.id);
    this.getById();
  }

  get f() {
    return this.taskEditForm.controls;
  } 
  
  getById() {
    this.providerService.getById(this.id).subscribe({
      next: (task: any) => {
        console.log(task, 'toBeEdited');
        if(task) {
          this.taskEditForm.controls['id'].patchValue(task.id);
          this.taskEditForm.controls['title'].patchValue(task.title);
          this.taskEditForm.controls['description'].patchValue(task.description);
          this.taskEditForm.controls['dueDate'].patchValue(task.dueDate);
          this.taskEditForm.controls['status'].patchValue(task.status);
        }
        this.controls = this.taskEditForm.controls;
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }
  
  editTask(form: any) {
    
    this.isSubmitted = true;
    //stop here if form is invalid
    if (form.invalid) {
      return;
    }
    this.controls = form.controls;
    this.providerService.put(form.value).subscribe({
      next: (task: any) => {
        this.router.navigate(['Home']);
      },
      error: (error: any) => {
        console.log(error);
      }
    });
    
    
  }

}

