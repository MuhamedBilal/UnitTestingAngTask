import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MyServiceService } from './my-service.service';
import { HttpClient } from '@angular/common/http';
import { of,throwError } from 'rxjs';

describe('AppComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [RouterTestingModule,
       HttpClientTestingModule],
    declarations: [AppComponent]
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should create the app component with an empty users array', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.users).toEqual([]);
  });

  it('should call the getUsers method of the MyServiceService when the component is initialized', () => {
    const myServiceService = TestBed.inject(MyServiceService);
    spyOn(myServiceService, 'getUsers').and.returnValue(of([]));
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    expect(myServiceService.getUsers).toHaveBeenCalled();
  });

  it('should populate the users array with data when the getUsers method of the MyServiceService returns data', () => {
    const myServiceService = TestBed.inject(MyServiceService);
    const testData = [
      { id: 1, name: 'MB', email: 'MB@example.com', phone: '123-456-7890' },
      { id: 2, name: 'KZ', email: 'KZ@example.com', phone: '987-654-3210' }
    ];
    spyOn(myServiceService, 'getUsers').and.returnValue(of(testData));
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    expect(app.users).toEqual(testData);
  });
});
