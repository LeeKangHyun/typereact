describe('Basic Types', () => {
  test('Enum#number', () => {
    enum Color {Red, Green, Blue}
    let c: Color = Color.Green
    expect(c).toBe(1)
  })

  test('Enum#name', () => {
    enum Color {Red = 1, Green, Blue}
    let colorName: string = Color[2]
    expect(colorName).toBe('Green')
  })
})