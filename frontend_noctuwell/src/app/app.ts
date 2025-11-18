import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  readonly currentYear = new Date().getFullYear();

  constructor(
    @Inject(PLATFORM_ID) platformId: object,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer
  ) {
    const icons: Record<string, string> = {
      'brand-night': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 14.5A9 9 0 0 1 9.5 3 7 7 0 1 0 21 14.5Z" fill="currentColor" stroke="none"></path>
        <path d="M15.5 3.5a7 7 0 0 0-7 7" stroke="currentColor" fill="none"></path>
      </svg>`,
      patients: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="8" cy="8" r="3.2"></circle>
        <path d="M3 19c0-3.2 2.8-5.5 5-5.5s5 2.3 5 5.5"></path>
        <circle cx="17" cy="8.5" r="2.5"></circle>
        <path d="M14.5 18.5c0-2 1.6-3.8 3.5-3.8 1 0 2 .3 2.5.9"></path>
      </svg>`,
      specialists: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
        <path d="M7 12.5v-2A4.5 4.5 0 0 1 11.5 6h1A4.5 4.5 0 0 1 17 10.5v2"></path>
        <path d="M5.5 18.5v-2.5c0-1.66 1.34-3 3-3h6.5c1.66 0 3 1.34 3 3v2.5"></path>
        <path d="M12 2.5v4"></path>
        <path d="M10 4.5h4"></path>
      </svg>`,
      plans: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
        <rect x="4" y="5" width="16" height="14" rx="2"></rect>
        <path d="M8 3v4"></path>
        <path d="M16 3v4"></path>
        <path d="M8 11h8"></path>
        <path d="M8 15h5"></path>
      </svg>`,
      types: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
        <path d="M5 9h14"></path>
        <path d="M5 15h14"></path>
        <path d="M9 5v14"></path>
        <path d="M15 5v14"></path>
      </svg>`,
      appointments: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
        <rect x="3.5" y="5" width="17" height="15" rx="2"></rect>
        <path d="M8 3.5v3"></path>
        <path d="M16 3.5v3"></path>
        <path d="M7 11h4"></path>
        <path d="M13 15h4"></path>
      </svg>`,
      calendar: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
        <rect x="4" y="5" width="16" height="15" rx="2"></rect>
        <path d="M4 10h16"></path>
        <path d="M8 2.5v3"></path>
        <path d="M16 2.5v3"></path>
        <circle cx="9" cy="14" r="1"></circle>
        <circle cx="12" cy="14" r="1"></circle>
        <circle cx="15" cy="14" r="1"></circle>
      </svg>`,
      rocket: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
        <path d="M5 15c-1.5 1.5-2 4-2 4s2.5-.5 4-2l10-10a4 4 0 0 0-5.5-5.5Z"></path>
        <path d="M12.5 6.5l5 5"></path>
        <path d="M4 20l3-3"></path>
      </svg>`,
      layers: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 3 3 9l9 6 9-6-9-6Z"></path>
        <path d="M3 15l9 6 9-6"></path>
      </svg>`,
      route: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="6" cy="6" r="2.5"></circle>
        <circle cx="18" cy="18" r="2.5"></circle>
        <path d="M6 8.5v7c0 1.7 1.3 3 3 3h5"></path>
      </svg>`,
      arrow: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
        <path d="M5 12h14"></path>
        <path d="m13 6 6 6-6 6"></path>
      </svg>`
    };

    if (isPlatformBrowser(platformId)) {
      Object.entries(icons).forEach(([name, svg]) => {
        iconRegistry.addSvgIconLiteral(name, sanitizer.bypassSecurityTrustHtml(svg));
      });
    }
  }
}
