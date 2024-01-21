import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTaskComponent } from './add-task.component';
import { ProviderService } from '../../services/provider.service';
import { Status, Task } from '../../models/Task.model';

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
describe('AddTaskComponent', () => {
  let component: AddTaskComponent;
  let fixture: ComponentFixture<AddTaskComponent>;
  let providerServiceSpy: any;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddTaskComponent],
      providers: [
        {
          provide: ProviderService,
          useValue: {
            post: jest.fn(),
          } as unknown as ProviderService,
        },
      ]
    });
    fixture = TestBed.createComponent(AddTaskComponent);
    component = fixture.componentInstance;
    providerServiceSpy = TestBed.inject(ProviderService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should send edited task data to server', () => {
    jest.spyOn(providerServiceSpy, 'post').mockImplementation(jest.fn());
    component.addTask(form);

    expect(providerServiceSpy.post).toHaveBeenCalledWith(mockTask); 
    expect(component.isSubmitted).toBeTruthy();
    expect(component.addedTask).toBeDefined();
  });

});
