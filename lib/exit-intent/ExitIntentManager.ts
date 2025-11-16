/**
 * Exit Intent Manager
 * 
 * Handles exit-intent detection and frequency capping
 * Strategy:
 * - Show only to users who haven't converted (haven't used features)
 * - Show max 2 times per session
 * - Don't show if already submitted feedback
 * - Don't show if dismissed within last 24 hours
 * - Track user engagement to determine if they're "at risk"
 */

export interface ExitIntentConfig {
  enabled: boolean;
  maxShowsPerSession: number; // Default: 2
  dismissalCooldown: number; // ms, default: 24 hours
  minTimeOnPage: number; // ms before eligible, default: 10 seconds
  targetSegments: ('new-users' | 'inactive-users' | 'all')[];
}

export interface ExitIntentState {
  showsThisSession: number;
  lastDismissal: number | null;
  lastSubmission: number | null;
  timeOnPage: number;
  hasInteracted: boolean;
}

const STORAGE_KEY = 'exit_intent_state';
const CONFIG_KEY = 'exit_intent_config';

export class ExitIntentManager {
  private static config: ExitIntentConfig = {
    enabled: true,
    maxShowsPerSession: 2,
    dismissalCooldown: 24 * 60 * 60 * 1000, // 24 hours
    minTimeOnPage: 10000, // 10 seconds
    targetSegments: ['new-users', 'inactive-users'],
  };

  private static state: ExitIntentState = {
    showsThisSession: 0,
    lastDismissal: null,
    lastSubmission: null,
    timeOnPage: 0,
    hasInteracted: false,
  };

  private static pageStartTime: number = 0;
  private static mouseLeaveListener: ((e: MouseEvent) => void) | null = null;

  /**
   * Initialize exit intent manager
   */
  static init(customConfig?: Partial<ExitIntentConfig>): void {
    if (typeof window === 'undefined') return;

    // Load config
    const storedConfig = localStorage.getItem(CONFIG_KEY);
    if (storedConfig) {
      this.config = { ...this.config, ...JSON.parse(storedConfig) };
    }
    if (customConfig) {
      this.config = { ...this.config, ...customConfig };
    }

    // Load state
    const storedState = sessionStorage.getItem(STORAGE_KEY);
    if (storedState) {
      this.state = { ...this.state, ...JSON.parse(storedState) };
    }

    this.pageStartTime = Date.now();

    // Setup exit detection
    this.setupExitDetection();

    // Track user interactions
    this.setupInteractionTracking();

    console.log('📍 Exit Intent Manager initialized');
  }

  /**
   * Setup mouse leave detection
   */
  private static setupExitDetection(): void {
    if (typeof window === 'undefined' || !this.config.enabled) return;

    this.mouseLeaveListener = (e: MouseEvent) => {
      // Detect when mouse leaves the window (moving to browser chrome or another tab)
      if (e.clientY <= 0) {
        this.handleExitIntent();
      }
    };

    document.addEventListener('mouseleave', this.mouseLeaveListener);
  }

  /**
   * Track user interactions to determine engagement
   */
  private static setupInteractionTracking(): void {
    if (typeof window === 'undefined') return;

    const trackInteraction = () => {
      this.state.hasInteracted = true;
      this.saveState();
    };

    // Track clicks, form inputs, etc.
    document.addEventListener('click', trackInteraction, { once: true });
    document.addEventListener('input', trackInteraction, { once: true });
    document.addEventListener('change', trackInteraction, { once: true });
  }

  /**
   * Check if we should show the exit intent dialog
   */
  private static shouldShow(): boolean {
    // Check if enabled
    if (!this.config.enabled) {
      console.log('❌ Exit intent disabled');
      return false;
    }

    // Check if already shown max times this session
    if (this.state.showsThisSession >= this.config.maxShowsPerSession) {
      console.log('❌ Max shows reached this session');
      return false;
    }

    // Check if already submitted feedback
    if (this.state.lastSubmission) {
      console.log('❌ Already submitted feedback');
      return false;
    }

    // Check dismissal cooldown
    if (this.state.lastDismissal) {
      const timeSinceDismissal = Date.now() - this.state.lastDismissal;
      if (timeSinceDismissal < this.config.dismissalCooldown) {
        console.log('❌ Still in dismissal cooldown');
        return false;
      }
    }

    // Check minimum time on page
    this.state.timeOnPage = Date.now() - this.pageStartTime;
    if (this.state.timeOnPage < this.config.minTimeOnPage) {
      console.log('❌ Not enough time on page');
      return false;
    }

    console.log('✅ Should show exit intent');
    return true;
  }

  /**
   * Handle exit intent trigger
   */
  private static handleExitIntent(): void {
    if (!this.shouldShow()) return;

    // Dispatch event for UI to show dialog
    window.dispatchEvent(
      new CustomEvent('exit-intent:trigger', {
        detail: {
          segment: this.getSegment(),
          timeOnPage: this.state.timeOnPage,
        },
      })
    );

    // Increment counter
    this.state.showsThisSession++;
    this.saveState();
  }

  /**
   * Determine user segment
   */
  private static getSegment(): 'new-users' | 'inactive-users' {
    // Check if user is new (first visit)
    const visitCount = parseInt(sessionStorage.getItem('visit_count') || '0');
    if (visitCount === 0) {
      return 'new-users';
    }

    // Check if user is inactive (no interactions)
    if (!this.state.hasInteracted) {
      return 'inactive-users';
    }

    return 'inactive-users';
  }

  /**
   * Record feedback submission
   */
  static recordSubmission(): void {
    this.state.lastSubmission = Date.now();
    this.saveState();
    console.log('✅ Feedback submitted');
  }

  /**
   * Record dismissal
   */
  static recordDismissal(): void {
    this.state.lastDismissal = Date.now();
    this.saveState();
    console.log('✅ Dialog dismissed');
  }

  /**
   * Save state to storage
   */
  private static saveState(): void {
    if (typeof window === 'undefined') return;
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
  }

  /**
   * Cleanup
   */
  static destroy(): void {
    if (typeof window === 'undefined') return;

    if (this.mouseLeaveListener) {
      document.removeEventListener('mouseleave', this.mouseLeaveListener);
    }

    console.log('🗑️ Exit Intent Manager destroyed');
  }

  /**
   * Get current state (for debugging)
   */
  static getState(): ExitIntentState {
    return { ...this.state };
  }

  /**
   * Get current config
   */
  static getConfig(): ExitIntentConfig {
    return { ...this.config };
  }
}
