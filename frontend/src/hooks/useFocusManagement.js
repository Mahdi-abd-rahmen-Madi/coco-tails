import { useEffect, useRef, useCallback } from 'react';

/**
 * Custom hook for managing focus in accessible components
 * @param {Object} options - Configuration options
 * @param {boolean} [options.trapFocus=false] - Whether to trap focus within the component
 * @param {boolean} [options.returnFocus=true] - Whether to return focus to the previously focused element on unmount
 * @param {boolean} [options.autoFocus=true] - Whether to focus the first focusable element when mounted
 * @returns {Object} - Refs and focus management functions
 */
const useFocusManagement = ({
  trapFocus = false,
  returnFocus = true,
  autoFocus = true,
} = {}) => {
  const containerRef = useRef(null);
  const previousFocus = useRef(document.activeElement);
  const focusTrapCleanup = useRef(null);

  // Function to focus the first focusable element in the container
  const focusFirstFocusable = useCallback(() => {
    if (!containerRef.current) return null;

    const focusableElements = containerRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    const firstFocusable = Array.from(focusableElements).find(
      (el) => !el.disabled && el.offsetParent !== null
    );

    if (firstFocusable) {
      firstFocusable.focus();
      return firstFocusable;
    }

    return null;
  }, []);

  // Function to trap focus within the container
  const setupFocusTrap = useCallback(() => {
    if (!containerRef.current || !trapFocus) return () => {};

    const handleKeyDown = (e) => {
      if (e.key !== 'Tab') return;

      const focusableElements = containerRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [trapFocus]);

  // Set up focus management when the component mounts
  useEffect(() => {
    // Store the currently focused element
    previousFocus.current = document.activeElement;

    // Set up focus trap if enabled
    if (trapFocus) {
      focusTrapCleanup.current = setupFocusTrap();
    }

    // Auto-focus the first focusable element if enabled
    if (autoFocus) {
      // Use setTimeout to ensure the component is fully mounted
      const timer = setTimeout(() => {
        focusFirstFocusable();
      }, 0);
      return () => clearTimeout(timer);
    }

    // Cleanup function to restore focus and remove event listeners
    return () => {
      if (returnFocus && previousFocus.current && previousFocus.current.focus) {
        previousFocus.current.focus();
      }
      if (focusTrapCleanup.current) {
        focusTrapCleanup.current();
      }
    };
  }, [autoFocus, returnFocus, trapFocus, focusFirstFocusable, setupFocusTrap]);

  return {
    containerRef,
    focusFirstFocusable,
  };
};

export default useFocusManagement;
