# ub-auth
Unofficial authentication system for Universitas Brawijaya student account.
## Get Started
1. Install via NPM
```sh
npm install @yogarn/ub-auth
```
2. Usage
Include the package in your code and authenticate a user.
```js
import ub from '@yogarn/ub-auth';

async function authenticate() {
  try {
    const data = await ub.auth({
      username: '23515xxxxxxxxxx',
      password: 'password',
    });
    console.log(data);
    // handle successful login
  } catch (error) {
    console.error('Authentication failed:', error);
    // handle failed login
  }
}

authenticate();
```
3. Response
Upon successful authentication, the following student profile information will be returned:
```json
{
  "nim": "23515xxxxxxxxxx",
  "nama": "JOHN DOE",
  "jenjangFakultas": "S1/Ilmu Komputer",
  "jurusan": "Teknik Informatika",
  "programStudi": "Teknik Informatika",
  "seleksi": "SELEKSI NASIONAL BERDASARKAN PRESTASI Brawijaya - Malang",
  "nomorUjian": "49xxxxxxx"
}
```
By following these steps, you can quickly integrate ub-auth into your project and authenticate Universitas Brawijaya student accounts with ease.
