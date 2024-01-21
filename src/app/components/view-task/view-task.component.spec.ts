import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTaskComponent } from './view-task.component';
import { ProviderService } from '../../services/provider.service';
import { ActivatedRoute } from '@angular/router';
import { Task, Status } from '../../models/Task.model';

const mockTask: Task = 
  {
    "id": "123",
    "title": "Payment feature",
    "description": "Implement Payment feature",
    "dueDate": new Date('22-01-2024'),
    "status": Status.InComplete,
  };
describe('ViewTaskComponent', () => {
  let component: ViewTaskComponent;
  let fixture: ComponentFixture<ViewTaskComponent>;
  let providerServiceSpy: any;
  beforeEach(() => {
    const activatedRouteStub = {
      snapshot: {
        params: {
          taskId: '123'
        }
      }
    };
    TestBed.configureTestingModule({
      declarations: [ViewTaskComponent],
      providers:  [
        {
          provide: ActivatedRoute,
          useValue: activatedRouteStub
        },
        {
          provide: ProviderService,
          useValue: {
            getById: jest.fn(),
          } as unknown as ProviderService,
        },
      ]
    });
    fixture = TestBed.createComponent(ViewTaskComponent);
    component = fixture.componentInstance;
    providerServiceSpy = TestBed.inject(ProviderService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call ngOnInit', () => {
    const spy = jest.spyOn(component, 'getTaskById');
    fixture.detectChanges();
    expect(component.id).toBeDefined();
    expect(component.id).toEqual('123');
    expect(spy).toHaveBeenCalled();
  });

  it('should fetch task details on ngOnInit', () => {
    jest.spyOn(providerServiceSpy, 'getById').mockImplementation(jest.fn());
    component.id = '123';
    fixture.detectChanges();

    expect(providerServiceSpy.getById).toHaveBeenCalledWith('123'); 
    expect(component.viewTask).toEqual(mockTask); 
  });

});
