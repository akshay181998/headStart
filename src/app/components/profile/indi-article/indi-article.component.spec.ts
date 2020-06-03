import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndiArticleComponent } from './indi-article.component';

describe('IndiArticleComponent', () => {
  let component: IndiArticleComponent;
  let fixture: ComponentFixture<IndiArticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndiArticleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndiArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
