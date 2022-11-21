function calculateSubnet() {
  const ip = document.getElementById('ip').value
  const mask = document.getElementById('mask').value
  const binary_ip = document.getElementById('binary_ip')
  const binary_mask = document.getElementById('binary_mask')
  const subnet = document.getElementById('subnet')
  const broadcast = document.getElementById('broadcast')

  // split the input ip and mask into an array based on the "."
  const input_ip_array = ip.split('.')
  const input_mask_array = mask.split('.')
  console.log(input_ip_array)
  console.log(input_mask_array)

  let numeric_ip_array = []
  let numeric_mask_array = []
  let binary_ip_array = []
  let binary_mask_array = []

  // parse the input ip address to an array of numbers
  for (let octet = 0; octet < input_ip_array.length; octet++) {
    let current_octet = parseInt(input_ip_array[octet])
    numeric_ip_array.push(current_octet)
  }

  // parse the input mask to an array of numbers
  for (let octet = 0; octet < input_mask_array.length; octet++) {
    let current_octet = parseInt(input_mask_array[octet])
    numeric_mask_array.push(current_octet)
  }

  // parse the numeric ip address array to an array of binary equivalents
  for (let octet = 0; octet < numeric_ip_array.length; octet++) {
    let current_octet = numeric_ip_array[octet].toString(2)
    if (current_octet.length < 8) {
      const offset = 8 - current_octet.length
      let add_on_zeroes_list = []
      for (let index = 0; index < offset; index++) {
        add_on_zeroes_list.push(0)
        console.log(add_on_zeroes_list)
      }
      add_on_zeroes_string = add_on_zeroes_list.toString().split(',').join('')
      console.log(add_on_zeroes_string)
      current_octet = add_on_zeroes_string + current_octet
    }
    binary_ip_array.push(current_octet)
  }

  // parse the numeric mask array to an array of binary equivalents
  for (let octet = 0; octet < numeric_mask_array.length; octet++) {
    let current_octet = numeric_mask_array[octet].toString(2)
    binary_mask_array.push(current_octet)
  }

  // console.log the real values for diagnostics
  console.log(numeric_ip_array)
  console.log(numeric_mask_array)
  console.log(binary_ip_array.join())
  console.log(binary_mask_array)

  // display the values to the webpage output (will be used for final calculation...eventually)
  binary_ip.value = binary_ip_array.toString().split(',').join('')
  binary_mask.value = binary_mask_array.toString().split(',').join('')
  subnet.value = numeric_ip_array
  broadcast.value = numeric_mask_array
}
