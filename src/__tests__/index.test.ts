describe('Basic Types', () => {
  test('Enum#number', () => {
    enum Color { Red = 1, Green = 2, Blue = 4 }
    let c: Color = Color.Green
    expect(c).toBe(2)
  })

  test('Enum#name', () => {
    enum Color {Red = 1, Green, Blue}
    let colorName: string = Color[2]
    expect(colorName).toBe('Green')
  })
})