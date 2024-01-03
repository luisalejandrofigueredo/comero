import { trigger, state, style, animate, transition } from '@angular/animations';

export const zoomAnimation = trigger('zoom', [
  state('normal', style({
    transform: 'scale(1)',
  })),
  state('zoomed', style({
    transform: 'scale(1.2)',
  })),
  transition('normal <=> zoomed', animate('0.3s ease')),
]);
