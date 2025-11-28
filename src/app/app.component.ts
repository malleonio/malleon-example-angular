import { Component, OnInit } from '@angular/core';
import { ReplayService } from './replay.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Malleon Replay SDK - Angular Example';
  
  // User data form fields
  username: string = 'demo-user';
  tenantId: string = 'tenant-123';
  userEmail: string = 'demo@example.com';
  userRole: string = 'admin';
  
  // Status messages
  statusMessage: string = '';
  statusType: 'success' | 'error' | 'info' = 'info';

  constructor(private replayService: ReplayService) {}

  ngOnInit(): void {
    // Initialize user data when component loads
    this.updateUserData();
  }

  /**
   * Update user data in the replay session
   */
  async updateUserData(): Promise<void> {
    await this.replayService.updateUserData({
      username: this.username,
      tenantId: this.tenantId,
      userEmail: this.userEmail,
      userRole: this.userRole,
      environment: 'development'
    });
    this.showStatus('User data updated successfully!', 'success');
  }

  /**
   * Generate a console error
   */
  generateError(): void {
    console.error('This is a test error message from the Malleon Replay SDK example');
    this.showStatus('Error logged to console', 'info');
  }

  /**
   * Generate an error with a stack trace (for source map testing)
   */
  generateErrorWithStackTrace(): void {
    try {
      // Create a nested function call to generate a meaningful stack trace
      function innerFunction() {
        function deepFunction() {
          function deepestFunction() {
            throw new Error('This is a test error with stack trace for source map testing');
          }
          deepestFunction();
        }
        deepFunction();
      }
      innerFunction();
    } catch (error) {
      console.error('Error with stack trace:', error);
      this.showStatus('Error with stack trace logged - check Error Analytics!', 'info');
    }
  }

  /**
   * Generate a console warning
   */
  generateWarning(): void {
    console.warn('This is a test warning message from the Malleon Replay SDK example');
    this.showStatus('Warning logged to console', 'info');
  }

  /**
   * Generate a console log
   */
  generateLog(): void {
    console.log('This is a test log message from the Malleon Replay SDK example');
    this.showStatus('Log message logged to console', 'info');
  }

  /**
   * Make a simple API call
   */
  async makeApiCall(): Promise<void> {
    try {
      // Make a call to a public API
      const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
      const data = await response.json();
      console.log('API call successful:', data);
      this.showStatus('API call completed successfully!', 'success');
    } catch (error) {
      console.error('API call failed:', error);
      this.showStatus('API call failed - check console', 'error');
    }
  }

  /**
   * Make an API call that fails
   */
  async makeFailedApiCall(): Promise<void> {
    try {
      // Intentionally make a call to a non-existent endpoint
      const response = await fetch('https://jsonplaceholder.typicode.com/posts/999999999');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('Failed API call:', error);
      this.showStatus('Failed API call logged', 'info');
    }
  }

  /**
   * Add a custom tag to the replay
   */
  async addCustomTag(): Promise<void> {
    await this.replayService.addTag(
      'customEvent',
      'button-clicked',
      'STR'
    );
    this.showStatus('Custom tag added!', 'success');
  }

  /**
   * Add multiple tags at once
   */
  async addMultipleTags(): Promise<void> {
    await this.replayService.addTags([
      { name: 'feature', value: 'demo', type: 'STR' },
      { name: 'version', value: '1.0.0', type: 'STR' },
      { name: 'score', value: 95, type: 'NUM' },
      { name: 'isActive', value: true, type: 'BOOL' },
      { name: 'timestamp', value: new Date(), type: 'DATETIME' }
    ]);
    this.showStatus('Multiple tags added!', 'success');
  }

  /**
   * Track a state transition
   */
  async trackState(): Promise<void> {
    await this.replayService.trackStateTransition('demo-page-viewed');
    this.showStatus('State transition tracked!', 'success');
  }

  /**
   * Show a status message
   */
  private showStatus(message: string, type: 'success' | 'error' | 'info'): void {
    this.statusMessage = message;
    this.statusType = type;
    setTimeout(() => {
      this.statusMessage = '';
    }, 3000);
  }
}

