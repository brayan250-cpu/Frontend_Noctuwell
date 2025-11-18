import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

interface QuickAction {
  title: string;
  description: string;
  icon: string;
  route: string;
  accent: 'indigo' | 'violet' | 'emerald' | 'amber' | 'sky';
}

interface Feature {
  title: string;
  description: string;
  icon: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, MatButtonModule, MatCardModule, MatIconModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent {
  readonly stats = [
    { label: 'Pacientes activos', value: '320+' },
    { label: 'Especialistas conectados', value: '58' },
    { label: 'Citas confirmadas', value: '1.240' }
  ];

  readonly quickActions: QuickAction[] = [
    {
      title: 'Pacientes',
      description: 'Registra historiales, datos de contacto y seguimiento clínico.',
      icon: 'patients',
      route: '/patient-list',
      accent: 'indigo'
    },
    {
      title: 'Especialistas',
      description: 'Coordina a tu equipo médico y asigna tipos de especialista.',
      icon: 'specialists',
      route: '/specialist-list',
      accent: 'emerald'
    },
    {
      title: 'Planes',
      description: 'Diseña planes de acompañamiento y define precios y duración.',
      icon: 'plans',
      route: '/plan-list',
      accent: 'violet'
    },
    {
      title: 'Tipos de especialista',
      description: 'Crea categorías claras para tus profesionales.',
      icon: 'types',
      route: '/type-specialist-list',
      accent: 'amber'
    },
    {
      title: 'Citas',
      description: 'Controla la agenda clínica y confirma disponibilidad.',
      icon: 'appointments',
      route: '/appointment-list',
      accent: 'sky'
    }
  ];

  readonly features: Feature[] = [
    {
      title: 'Landing operativa',
      description:
        'Un punto de entrada claro con accesos directos a cada módulo crítico del sistema.',
      icon: 'rocket'
    },
    {
      title: 'Componentes Material',
      description: 'Construido con tarjetas, botones y tipografía consistente con Angular Material.',
      icon: 'layers'
    },
    {
      title: 'Rutas validadas',
      description: 'Cada enlace navega al CRUD correspondiente sin errores de importación.',
      icon: 'route'
    }
  ];
}
