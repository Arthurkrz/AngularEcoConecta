import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { EcoCard } from './eco-card';
import { TIPS } from '../../../data/tips';

describe('EcoCard', () => {
  it('deve criar o card com os inputs obrigatórios', async () => {
    await TestBed.configureTestingModule({
      imports: [EcoCard],
      providers: [provideRouter([])],
    }).compileComponents();
    const fixture = TestBed.createComponent(EcoCard);
    fixture.componentRef.setInput('item', TIPS[0]);
    fixture.componentRef.setInput('type', 'tip');
    await fixture.whenStable();
    expect(fixture.componentInstance).toBeTruthy();
    expect((fixture.nativeElement as HTMLElement).textContent).toContain(TIPS[0].title);
  });
});
