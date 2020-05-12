import { startMirage } from 'mirage'

const signIn = async ({ username, password }) => {
  const response = await fetch('api/singin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  })

  return await response.json()
}

describe("homepage", function () {
  let server

  beforeEach(() => {
    server = startMirage({ environment: 'test' })
  })

  afterEach(() => {
    server.shutdown()
  })

  test('Singin user', async () => {
    const { name } = await signIn({ username: 'user', password: '12' })

    expect(name).toBe('User');
  });

  test('Empty body', async () => {
    const { name } = await signIn({})

    expect(name).toBeUndefined();
  });

  test('No such user', async () => {
    const { name } = await signIn({ username: 'test', password: '12' })

    expect(name).toBeUndefined();
  });
})