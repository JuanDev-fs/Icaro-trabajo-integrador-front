import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMemosComponent } from './create-memos.component';

describe('CreateMemosComponent', () => {
  let component: CreateMemosComponent;
  let fixture: ComponentFixture<CreateMemosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateMemosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateMemosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
