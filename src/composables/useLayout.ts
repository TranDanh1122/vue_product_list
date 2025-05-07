import { ref } from "vue"
import { DESKTOP_MIN, TABLET_MIN } from "../ults/const"
const initLayout = () => {
    if (window.innerWidth > DESKTOP_MIN) return "desktop"
    if (window.innerWidth > TABLET_MIN && window.innerWidth <= DESKTOP_MIN) return "tablet"
    return "mobile"
}
const layout = ref(initLayout())
let initialized = false
const handleResize = () => {
    const newLayout = initLayout()
    if (newLayout != layout.value)
        layout.value = newLayout
}
if (!initialized) window.addEventListener('resize', handleResize)
export default function useLayout() {
    if (initialized) return layout

    initialized = true

    return layout
}