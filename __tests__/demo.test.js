// Simple function to test the testing environment
const add = (a,b) => a + b

describe('testing unit test setup', () => {
  it('should work', () => {
    var sum = add(3,4)
    expect(sum).toBe(7)
  })
})

// Simple function testing puppeteer
describe('testing end-to-end setup', () => {
  it('should be titled "Create Next App"', async () => {
    await page.goto('http://localhost:3000')
    await expect(page.title()).resolves.toMatch('Create Next App')
  })
})
