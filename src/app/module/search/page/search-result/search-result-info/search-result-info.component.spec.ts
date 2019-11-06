import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchResultInfoComponent } from './search-result-info.component';

describe('SearchResultInfoComponent', () => {
  let component: SearchResultInfoComponent;
  let fixture: ComponentFixture<SearchResultInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchResultInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchResultInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
