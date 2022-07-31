export default {
  methods: {
    numberOnly($event) {
      const keyCode = $event.keyCode ? $event.keyCode : $event.which
      if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
        $event.preventDefault()
      }
    },
    formatMoney(amount, decimalCount = 2, decimal = ',', thousands = '.') {
      try {
        decimalCount = Math.abs(decimalCount)
        decimalCount = isNaN(decimalCount) ? 2 : decimalCount

        const negativeSign = amount < 0 ? '-' : ''

        const i = parseInt(
          (amount = Math.abs(Number(amount) || 0).toFixed(decimalCount))
        ).toString()
        const j = i.length > 3 ? i.length % 3 : 0

        return (
          negativeSign +
          (j ? i.substr(0, j) + thousands : '') +
          i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousands) +
          (decimalCount
            ? decimal +
              Math.abs(amount - i)
                .toFixed(decimalCount)
                .slice(2)
            : '')
        )
      } catch (e) {}
    },
  },
}
