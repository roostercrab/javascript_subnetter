function calculateSubnet() {
  const ip = document.getElementById('ip').value
  const mask = document.getElementById('mask').value
  const subnet = document.getElementById('subnet')
  const broadcast = document.getElementById('broadcast')

  const ip_array = ip.split('.')
  const mask_array = mask.split('.')
  console.log(ip_array)
  console.log(mask_array)

  subnet.value = ip_array
  broadcast.value = mask_array
}
