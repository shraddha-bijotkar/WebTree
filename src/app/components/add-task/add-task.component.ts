import { Component, OnInit } from '@angular/core';
import { ProviderService } from 'src/app/services/provider.service';
import { Task, Status } from 'src/app/models/Task.model';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as uuid from 'uuid';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit{

  addedTask!: Task;
  taskForm!: FormGroup;
  isSubmitted = false;
  controls!: any;
  inComplete = Status.InComplete;
  completed = Status.Completed;

  constructor(private providerService: ProviderService, private router: Router, private fb: FormBuilder) {}

  ngOnInit() {
    this.taskForm = this.fb.group({
      id: [uuid.v4()],
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(5)]],
      dueDate: [Validators.required],
      status: [Status.InComplete],
    });
  }

  get f() {
    return this.taskForm.controls;
  }  

  addTask(form: FormGroup) {
    console.log(form.value);
    //if(this.taskForm.invalid) return;
    
    this.isSubmitted = true;
    console.log(this.f['dueDate'], 'errors');

    // stop here if form is invalid
    if (form.invalid) {
      return;
    }
    //this.controls = form.controls;
    this.providerService.post(form.value).subscribe({
      next: (task: Task) => {
        console.log(task);
        this.addedTask = task;
        window.alert('Task : ' + `${task.title}` + ' has been added successfully!');
        this.router.navigate(['Home']);
      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }

}
