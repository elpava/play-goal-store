const crypto = require('crypto')

const salt = 'play-goal' // Generate a random salt
const iterations = 10000 // Number of iterations (higher is more secure)
const keylen = 13 // Desired key length
const digest = 'sha512' // Hashing algorithm

export default function encryptPassword(password) {
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(
      password,
      salt,
      iterations,
      keylen,
      digest,
      (error, derivedKey) => {
        if (error) {
          reject(error)
        }

        resolve(derivedKey.toString('hex'))
      },
    )
  })
}
