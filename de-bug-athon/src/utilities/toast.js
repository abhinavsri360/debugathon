import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
toast.configure()

export const _alert = toast
export const error = (msg) => toast(msg, { type: 'error' })
export const info = (msg) => toast(msg, { type: 'info' })
export const success = (msg) => toast(msg, { type: 'success' })
