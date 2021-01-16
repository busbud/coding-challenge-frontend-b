function range(initial: number, end: number): number[] {
  const arr = []
  for (let i = initial; i <= end; i++) {
    arr.push(i)
  }

  return arr
}

function ageOptionFactory(initial: number, end: number) {
  const ages = range(initial, end)
  const lastItem = ages.length - 1
  const options = ages.map((item, i) => {
    let label: string | number = item
    if (i === 0 && item === 0) {
      label = 'under 1'
    }

    if (i === lastItem && item >= 80) {
      label = 'over 80'
    }

    return { label: label, value: item }
  })

  return options
}

export default ageOptionFactory
