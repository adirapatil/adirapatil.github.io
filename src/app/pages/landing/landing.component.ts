import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent {
  features = [
    {
      icon: '🚀',
      title: 'Fast & Reliable',
      description: 'Built with modern technologies for optimal performance'
    },
    {
      icon: '🔒',
      title: 'Secure',
      description: 'Enterprise-grade security to protect your data'
    },
    {
      icon: '📱',
      title: 'Responsive',
      description: 'Works perfectly on all devices and screen sizes'
    },
    {
      icon: '⚡',
      title: 'Scalable',
      description: 'Grows with your business needs'
    }
  ];
}
