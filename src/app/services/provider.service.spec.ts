import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProviderService } from './provider.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { Task, Status } from '../models/Task.model';

const mockTasks: Task[] = 
  [{
    "id": "bea23301-6a9d-4549-90bc-0536f15984d5",
    "title": "Payment feature",
    "description": "Implement Payment feature",
    "dueDate": new Date('22-01-2024'),
    "status": Status.InComplete,
  }];

describe('ProviderService', () => {
  let service: ProviderService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProviderService],
    });
    service = TestBed.inject(ProviderService);
      httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get tasks', () => {
    service.get().subscribe((tasks: any) => {
      expect(tasks).toBeDefined();
    });
  });

  it('should get task by ID', () => {
    const taskId = 'bea23301-6a9d-4549-90bc-0536f15984d5';
    service.getById(taskId).subscribe((task: Task) => {
      expect(task).toEqual(mockTasks[0]);
    });
  });

  it('should post a task', () => {
    const newTask: Task = {
      "id": "bea23301-6a9d-4549-90bc-0536f15984d6",
      "title": "Payment feature",
      "description": "Implement Payment feature",
      "dueDate": new Date('22-01-2024'),
      "status": Status.InComplete,
    };
    service.post(newTask).subscribe((task: Task) => {
      expect(task).toEqual(newTask);
    });
  });

  it('should put a task', () => {
    const updatedTask: Task = {
      "id": "bea23301-6a9d-4549-90bc-0536f15984d5",
      "title": "Payment feature 2.0",
      "description": "Implement Payment feature",
      "dueDate": new Date('22-05-2024'),
      "status": Status.InComplete,
    };
    service.put(updatedTask).subscribe((task: Task) => {
      expect(task).toEqual(updatedTask);
    });
  });

  it('should delete a task', () => {
    const taskId = 'bea23301-6a9d-4549-90bc-0536f15984d5';
    service.delete(taskId).subscribe((response: any) => {
      expect(response).toBeTruthy();
    });
  });

});
