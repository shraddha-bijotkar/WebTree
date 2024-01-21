import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTaskComponent } from './edit-task.component';
import { ProviderService } from '../../services/provider.service';
import { Task, Status } from '../../models/Task.model';
import { ActivatedRoute } from '@angular/router';

const mockTask: Task = 
  {
    "id": "123",
    "title": "Payment feature",
    "description": "Implement Payment feature",
    "dueDate": new Date('22-01-2024'),
    "status": Status.InComplete,
  };
const form = {
  "value": mockTask
}
describe('EditTaskComponent', () => {
  let component: EditTaskComponent;
  let fixture: ComponentFixture<EditTaskComponent>;
  let providerServiceSpy: any; 
  const activatedRouteStub = {
    snapshot: {
      params: {
        taskId: '123'
      }
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditTaskComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: activatedRouteStub
        },
        {
          provide: ProviderService,
          useValue: {
            getById: jest.fn(),
            put: jest.fn(),
          } as unknown as ProviderService,
        },
      ]
    });
    fixture = TestBed.createComponent(EditTaskComponent);
    component = fixture.componentInstance;
    providerServiceSpy = TestBed.inject(ProviderService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check if task to be edited is found by id', () => {
    jest.spyOn(providerServiceSpy, 'getById').mockImplementation(jest.fn());
    component.id = '123';
    fixture.detectChanges();

    expect(providerServiceSpy.getById).toHaveBeenCalledWith('123'); 
  });

  it('should send edited task data to server', () => {
    jest.spyOn(providerServiceSpy, 'put').mockImplementation(jest.fn());
    component.id = '123';
    component.editTask(form);

    expect(providerServiceSpy.put).toHaveBeenCalledWith(mockTask); 
    expect(component.isSubmitted).toBeTruthy();
  });

});
