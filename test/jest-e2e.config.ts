import supertest from 'supertest'
import server from '../src/config/server'

export const jestE2E = supertest(server)