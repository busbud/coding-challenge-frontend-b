import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchResultDeparturesComponent } from './search-result-departures.component';

describe('SearchResultDeparturesComponent', () => {
  let component: SearchResultDeparturesComponent;
  let fixture: ComponentFixture<SearchResultDeparturesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchResultDeparturesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchResultDeparturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
