interface HTMLElement {
  webkitRequestFullscreen?: (options?: FullscreenOptions | undefined) => Promise<void>
  mozRequestFullScreen?: (options?: FullscreenOptions | undefined) => Promise<void>
  msRequestFullscreen?: (options?: FullscreenOptions | undefined) => Promise<void>
}

interface Document {
  webkitFullscreenElement?: Element | null
  mozFullScreenElement?: Element | null
  msFullscreenElement?: Element | null
  webkitExitFullscreen?: () => Promise<void>
  mozCancelFullScreen?: () => Promise<void>
  msExitFullscreen?: () => Promise<void>
}
