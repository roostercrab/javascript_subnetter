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
  //console.log(input_ip_array)
  //console.log(input_mask_array)

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
    // handle binary that isn't 8 bits
    if (current_octet.length < 8) {
      const offset = 8 - current_octet.length
      let add_on_zeroes_list = []
      for (let index = 0; index < offset; index++) {
        add_on_zeroes_list.push(0)
      }
      add_on_zeroes_string = add_on_zeroes_list.toString().split(',').join('')
      current_octet = add_on_zeroes_string + current_octet
    }
    binary_ip_array.push(current_octet)
  }

  // parse the numeric mask array to an array of binary equivalents
  for (let octet = 0; octet < numeric_mask_array.length; octet++) {
    let current_octet = numeric_mask_array[octet].toString(2)
    // handle binary that isn't 8 bits
    if (current_octet.length < 8) {
      const offset = 8 - current_octet.length
      let add_on_zeroes_list = []
      for (let index = 0; index < offset; index++) {
        add_on_zeroes_list.push(0)
      }
      add_on_zeroes_string = add_on_zeroes_list.toString().split(',').join('')
      current_octet = add_on_zeroes_string + current_octet
    }
    binary_mask_array.push(current_octet)
  }

  // calculate the subnet value
  binary_ip_string = binary_ip_array.toString().split(',').join('')
  binary_mask_string = binary_mask_array.toString().split(',').join('')
  decimal_ip_number = parseInt(binary_ip_string, 2)
  decimal_mask_number = parseInt(binary_mask_string, 2)
  decimal_subnet_number = decimal_ip_number & decimal_mask_number
  binary_subnet_number = decimal_subnet_number.toString(2)

  // console log the real values for diagnostics
  console.log(binary_ip_string)
  console.log(binary_mask_string)
  console.log(decimal_ip_number)
  console.log(decimal_mask_number)
  console.log(decimal_subnet_number)
  console.log(binary_subnet_number)

  // display the values to the webpage output (will be used for final calculation...eventually)
  subnet.value = 0
  broadcast.value = 0
  binary_ip.value = binary_ip_string
  binary_mask.value = binary_mask_string
}
