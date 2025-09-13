export function isValidIndianPincode(pincode: string) {
  return /^[1-9][0-9]{5}$/.test(pincode.trim());
}

export function isValidPhone(phone: string) {
  // basic Indian mobile check: 10 digits starting 6-9
  return /^[6-9][0-9]{9}$/.test(phone.trim());
}

export function required(v?: string | null) {
  return Boolean(v && v.trim().length > 0);
}
