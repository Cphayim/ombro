const ua = navigator.userAgent

export const platform = {
  iPhone: !!ua.match(/(iPhone\sOS)\s([\d_]+)/),
  iPad: !!ua.match(/(iPad).*OS\s([\d_]+)/),
  Android: !!ua.match(/(Android);?[\s/]+([\d.]+)?/) || !!ua.match(/(HarmonyOS);/), // 安卓和鸿蒙都归为安卓
}
