// Type declarations for local replay.es.js file
// This matches the types from @malleon/replay package

export type TagType = 'STR' | 'LARGE_STR' | 'NUM' | 'DATETIME' | 'BOOL';

export interface ReplayTag {
  name: string;
  value: string | number | boolean | Date;
  type: TagType;
}

export interface ReplayUserData {
  appId?: string;
  userId?: string;
  username?: string;
  userEmail?: string;
  userRole?: string;
  userStatus?: string;
  environment?: string;
  tenantId?: string;
  tenantType?: string;
  userType?: string;
}

export declare function initReplay(appId: string): void;
export declare function addTagToReplay(name: string, value: string | number | boolean | Date, type: TagType): Promise<void>;
export declare function addTagsToReplay(tags: ReplayTag[]): Promise<void>;
export declare function updateReplayUserData(userData: ReplayUserData): Promise<void>;
export declare function trackStateTransition(from: string, to: string, trigger: string): void;
export declare function getAppId(): string | null;
export declare function waitForAppIdAndInitReplay(): void;

export type { TagType, ReplayTag, ReplayUserData };

