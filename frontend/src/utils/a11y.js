/**
 * Accessibility Utility Functions
 * 
 * This file contains helper functions to improve the accessibility of the application.
 */

/**
 * Sets focus on the first focusable element within a container
 * @param {HTMLElement} container - The container element to search within
 * @returns {HTMLElement|null} The first focusable element or null if none found
 */
export const focusFirstFocusable = (container) => {
  if (!container) return null;
  
  const focusableElements = container.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  
  const firstFocusable = Array.from(focusableElements).find(el => {
    return !el.disabled && el.offsetParent !== null; // Check if element is visible
  });
  
  if (firstFocusable) {
    firstFocusable.focus();
    return firstFocusable;
  }
  
  return null;
};

/**
 * Traps focus within a container for modal dialogs
 * @param {HTMLElement} container - The container element to trap focus within
 * @returns {Function} A cleanup function to remove event listeners
 */
export const trapFocus = (container) => {
  if (!container) return () => {};
  
  const focusableElements = container.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  
  if (focusableElements.length === 0) return () => {};
  
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];
  
  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  };
  
  document.addEventListener('keydown', handleKeyDown);
  
  // Set initial focus
  firstElement.focus();
  
  // Return cleanup function
  return () => {
    document.removeEventListener('keydown', handleKeyDown);
  };
};

/**
 * Generates a unique ID for ARIA attributes
 * @param {string} prefix - Prefix for the ID
 * @returns {string} A unique ID
 */
export const generateId = (prefix = 'a11y') => {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Checks if an element is visible in the viewport
 * @param {HTMLElement} element - The element to check
 * @returns {boolean} True if the element is in the viewport
 */
export const isInViewport = (element) => {
  if (!element) return false;
  
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

/**
 * Scrolls an element into view if it's not already visible
 * @param {HTMLElement} element - The element to scroll into view
 * @param {Object} options - Scroll options (same as Element.scrollIntoView options)
 */
export const scrollIntoViewIfNeeded = (element, options = { behavior: 'smooth', block: 'nearest' }) => {
  if (!element) return;
  
  if (!isInViewport(element)) {
    element.scrollIntoView(options);
  }
};
