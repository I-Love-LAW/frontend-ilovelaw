export function AUTH_BACKEND_URL(url) {
  return "http://localhost:8082/" + url;
}

export function CONVERT_BACKEND_URL(url) {
  return "http://localhost:8080/" + url;
}

export function PAYMENT_BACKEND_URL (url) {
  return (
      "http://localhost:8000/" + url
  )
}

export function NOTIFIER_BACKEND_URL (url) {
  return (
      "http://localhost:8081/" + url
  )
}