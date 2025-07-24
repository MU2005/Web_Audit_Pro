import { AuditResult, AuditHistory } from './types';

const STORAGE_KEY = 'webaudit_history';

export class StorageManager {
  private static instance: StorageManager;
  private memoryStorage: AuditHistory = {}; // In-memory storage for server-side

  private constructor() {}

  static getInstance(): StorageManager {
    if (!StorageManager.instance) {
      StorageManager.instance = new StorageManager();
    }
    return StorageManager.instance;
  }

  // Save audit result to localStorage
  saveAuditResult(audit: AuditResult): void {
    try {
      console.log(`Storage: Saving audit ${audit.auditId} to memory...`);
      
      // Save to memory storage (works on server-side)
      this.memoryStorage[audit.auditId] = audit;
      console.log(`Saved audit result to memory: ${audit.auditId}`);
      console.log(`Storage: Memory storage now has keys:`, Object.keys(this.memoryStorage));
      
      // Also save to localStorage if available (client-side)
      if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
        const history = this.getAuditHistory();
        history[audit.auditId] = audit;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
        console.log(`Saved audit result to localStorage: ${audit.auditId}`);
      }
    } catch (error) {
      console.error('Failed to save audit result:', error);
    }
  }

  // Get specific audit result
  getAuditResult(auditId: string): AuditResult | null {
    try {
      console.log(`Storage: Looking for audit ${auditId}`);
      console.log(`Storage: Memory storage keys:`, Object.keys(this.memoryStorage));
      
      // First check memory storage (server-side)
      if (this.memoryStorage[auditId]) {
        console.log(`Found audit in memory: ${auditId}`);
        return this.memoryStorage[auditId];
      }
      
      console.log(`Not found in memory, checking localStorage...`);
      
      // Then check localStorage (client-side)
      const history = this.getAuditHistory();
      console.log(`Storage: localStorage keys:`, Object.keys(history));
      
      const result = history[auditId] || null;
      console.log(`Storage: Found in localStorage:`, result ? 'Yes' : 'No');
      
      return result;
    } catch (error) {
      console.error('Failed to get audit result:', error);
      return null;
    }
  }

  // Get all audit history
  getAuditHistory(): AuditHistory {
    try {
      // Check if we're in a browser environment
      if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
        return {};
      }
      
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return {};
      
      const history = JSON.parse(stored) as AuditHistory;
      return history;
    } catch (error) {
      console.error('Failed to get audit history:', error);
      return {};
    }
  }

  // Get recent audits (last 10)
  getRecentAudits(limit: number = 10): AuditResult[] {
    try {
      // Combine memory storage and localStorage
      const memoryAudits = Object.values(this.memoryStorage);
      const localStorageAudits = Object.values(this.getAuditHistory());
      
      // Combine and remove duplicates
      const allAudits = [...memoryAudits, ...localStorageAudits];
      const uniqueAudits = allAudits.filter((audit, index, self) => 
        index === self.findIndex(a => a.auditId === audit.auditId)
      );
      
      // Sort by timestamp (newest first)
      uniqueAudits.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
      
      return uniqueAudits.slice(0, limit);
    } catch (error) {
      console.error('Failed to get recent audits:', error);
      return [];
    }
  }

  // Check if URL was recently audited (within last hour)
  isRecentlyAudited(url: string, device: string): boolean {
    try {
      // Check if we're in a browser environment
      if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
        return false;
      }
      
      const history = this.getAuditHistory();
      const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
      
      for (const audit of Object.values(history)) {
        if (audit.url === url && audit.device === device) {
          const auditTime = new Date(audit.timestamp);
          if (auditTime > oneHourAgo) {
            return true;
          }
        }
      }
      
      return false;
    } catch (error) {
      console.error('Failed to check recent audit:', error);
      return false;
    }
  }

  // Delete specific audit
  deleteAudit(auditId: string): void {
    try {
      // Remove from memory storage
      delete this.memoryStorage[auditId];
      
      // Also remove from localStorage if available
      if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
        const history = this.getAuditHistory();
        delete history[auditId];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
      }
      
      console.log(`Deleted audit: ${auditId}`);
    } catch (error) {
      console.error('Failed to delete audit:', error);
    }
  }

  // Clear all audit history
  clearHistory(): void {
    try {
      localStorage.removeItem(STORAGE_KEY);
      console.log('Cleared audit history');
    } catch (error) {
      console.error('Failed to clear history:', error);
    }
  }

  // Get storage usage info
  getStorageInfo(): { used: number; total: number; percentage: number } {
    try {
      const history = this.getAuditHistory();
      const used = JSON.stringify(history).length;
      const total = 5 * 1024 * 1024; // 5MB localStorage limit
      const percentage = (used / total) * 100;
      
      return { used, total, percentage };
    } catch (error) {
      console.error('Failed to get storage info:', error);
      return { used: 0, total: 0, percentage: 0 };
    }
  }
}

// Export singleton instance
export const storageManager = StorageManager.getInstance(); 