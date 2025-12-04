import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import * as ReplaySDK from '@malleon/replay';
import type { ReplayUserData, ReplayTag, TagType } from '@malleon/replay';

@Injectable({
  providedIn: 'root'
})
export class ReplayService {
  private initialized = false;

  constructor() {
    this.initializeSDK();
  }

  private initializeSDK(): void {
    if (this.initialized) {
      return;
    }

    try {
      // Initialize with the app ID from environment
      const appId = environment.replayAppId;
      
      if (!appId || appId === 'YOUR_APP_ID_HERE') {
        console.warn('⚠️ Malleon Replay SDK: Please set your App ID in src/environments/environment.ts');
        return;
      }

      ReplaySDK.initReplay(appId);
      this.initialized = true;
      console.log('✅ Malleon Replay SDK initialized with App ID:', appId);
    } catch (error) {
      console.error('❌ Failed to initialize Malleon Replay SDK:', error);
    }
  }

  /**
   * Update user data for the current replay session
   * This includes username, tenantId, and other user metadata
   */
  async updateUserData(userData: ReplayUserData): Promise<void> {
    if (!this.initialized) {
      console.warn('Replay SDK not initialized yet');
      return;
    }

    try {
      await ReplaySDK.updateReplayUserData(userData);
      console.log('✅ Updated replay user data:', userData);
    } catch (error) {
      console.error('❌ Failed to update replay user data:', error);
    }
  }

  /**
   * Add a single tag to the current replay
   */
  async addTag(name: string, value: string | number | boolean | Date, type: TagType): Promise<void> {
    if (!this.initialized) {
      console.warn('Replay SDK not initialized yet');
      return;
    }

    try {
      await ReplaySDK.addTagToReplay(name, value, type);
      console.log(`✅ Added tag: ${name} = ${value} (${type})`);
    } catch (error) {
      console.error('❌ Failed to add tag:', error);
    }
  }

  /**
   * Add multiple tags to the current replay
   */
  async addTags(tags: ReplayTag[]): Promise<void> {
    if (!this.initialized) {
      console.warn('Replay SDK not initialized yet');
      return;
    }

    try {
      await ReplaySDK.addTagsToReplay(tags);
      console.log(`✅ Added ${tags.length} tags`);
    } catch (error) {
      console.error('❌ Failed to add tags:', error);
    }
  }

  /**
   * Track a state transition in your application
   */
  async trackStateTransition(stateName: string): Promise<void> {
    if (!this.initialized) {
      console.warn('Replay SDK not initialized yet');
      return;
    }

    try {
      ReplaySDK.trackStateTransition('', stateName, 'user-action');
      console.log(`✅ Tracked state transition: ${stateName}`);
    } catch (error) {
      console.error('❌ Failed to track state transition:', error);
    }
  }

  /**
   * Check if the SDK is initialized
   */
  isInitialized(): boolean {
    return this.initialized;
  }
}

