import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-lazy-feature',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="lazy-container">
      <div class="card">
        <h2>🚀 Lazy Loaded Feature</h2>
        <p class="description">
          This component was lazy-loaded! The chunk was fetched only when you navigated here.
        </p>
        <p class="e2e-lazy-loaded-indicator">Lazy component loaded successfully!</p>
        <a routerLink="/" class="btn btn-primary e2e-back-btn">Back to Home</a>
      </div>
    </div>
  `,
  styles: [`
    .lazy-container {
      max-width: 900px;
      margin: 0 auto;
      padding: 20px;
    }
    
    .card {
      background: white;
      border-radius: 12px;
      padding: 30px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      text-align: center;
    }
    
    .card h2 {
      color: #1f2937;
      margin-bottom: 15px;
    }
    
    .description {
      color: #6b7280;
      margin-bottom: 20px;
    }
    
    .e2e-lazy-loaded-indicator {
      color: #10b981;
      font-weight: 600;
      margin-bottom: 20px;
    }
    
    .btn {
      display: inline-block;
      padding: 12px 24px;
      border: none;
      border-radius: 6px;
      font-size: 1em;
      font-weight: 500;
      cursor: pointer;
      text-decoration: none;
      transition: all 0.2s;
    }
    
    .btn-primary {
      background-color: #667eea;
      color: white;
    }
    
    .btn-primary:hover {
      background-color: #5568d3;
      transform: translateY(-2px);
    }
  `]
})
export class LazyFeatureComponent {}

