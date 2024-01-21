import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { ProviderService } from '../../services/provider.service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let providerServiceSpy: any; 
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [
        {
          provide: ProviderService,
          useValue: {
            get: jest.fn(),
            delete: jest.fn(),
          } as unknown as ProviderService,
        },
      ]
    });
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    providerServiceSpy = TestBed.inject(ProviderService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call ngOnInit', () => {
    const spy = jest.spyOn(component, 'getAllTasks');
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  });

  it('should fetch all tasks on ngOnInit', () => {
    jest.spyOn(providerServiceSpy, 'get').mockImplementation(jest.fn());

    fixture.detectChanges();

    expect(providerServiceSpy.get).toHaveBeenCalled(); 
    expect(component.allTasks).toBeDefined(); 
  });

  it('should delete task by id', () => {
    jest.spyOn(providerServiceSpy, 'delete').mockImplementation(jest.fn());

    fixture.detectChanges();
    component.deleteTask('bea23301-6a9d-4549-90bc-0536f15984d5');
    expect(providerServiceSpy.delete).toHaveBeenCalledWith('bea23301-6a9d-4549-90bc-0536f15984d5'); 
    expect(component.deletedTask).toBeDefined(); 
  });

});
