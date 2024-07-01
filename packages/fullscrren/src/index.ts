/**
 * Find the fullscreen element in the document.
 *
 * @return The fullscreen element or null if none is found.
 */
export function findFullscreenElement() {
  return (
    document.fullscreenElement ||
    document.webkitFullscreenElement ||
    document.mozFullScreenElement ||
    document.msFullscreenElement ||
    null
  )
}

/**
 * Check if the current document is in fullscreen mode.
 *
 * @return Whether the document is in fullscreen mode or not.
 */
export function isFullscreen() {
  return !!findFullscreenElement()
}

/**
 * Enters the fullscreen mode for the specified element or the document if no element is provided.
 *
 * @param element - The element to enter fullscreen mode. If not provided, the document is used.
 * @returns void
 */
export function enterFullscreen(element?: HTMLElement) {
  element = element ?? document.documentElement

  if (element.requestFullscreen) {
    element.requestFullscreen()
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen()
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen()
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen()
  }
}

/**
 * Exits fullscreen mode if it is currently active.
 *
 * @return This function does not return anything.
 */
export function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen()
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen()
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen()
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen()
  }
}

/**
 * Toggles fullscreen mode based on the current state.
 *
 * @param element - The element to toggle fullscreen mode. If not provided, the document is used.
 * @returns void
 */
export function toggleFullscreen(element?: HTMLElement) {
  if (isFullscreen()) {
    exitFullscreen()
  } else {
    enterFullscreen(element)
  }
}
