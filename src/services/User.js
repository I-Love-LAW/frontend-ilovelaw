export default function User() {
  return JSON.parse(localStorage.getItem('user'));
}