import { TestBed } from '@angular/core/testing';
import { MyServiceService } from './my-service.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { of,throwError } from 'rxjs';

describe('MyServiceService', () => {
  let service: MyServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
     });
    service = TestBed.inject(MyServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  
  it('should return data from the API when called', () => {
    const httpClient = TestBed.inject(HttpClient);
    const myServiceService = new MyServiceService(httpClient);
    const testData = [
      { id: 1, name: 'MB', email: 'MB@example.com', phone: '123-456-7890' },
      { id: 2, name: 'KZ', email: 'KZ@example.com', phone: '987-654-3210' }
    ];
    spyOn(httpClient, 'get').and.returnValue(of(testData));
    myServiceService.getUsers().subscribe(users => {
      expect(users).toEqual(testData);
    });
  });
  it('should handle errors from the API when called', () => {
    const httpClient = TestBed.inject(HttpClient);
    const myServiceService = new MyServiceService(httpClient);
    const errorMessage = 'Error fetching users from API';
    spyOn(httpClient, 'get').and.returnValue(throwError(errorMessage));
    myServiceService.getUsers().subscribe(
      users => {},
      error => {
        expect(error).toEqual(errorMessage);
      }
    );
  });

});
