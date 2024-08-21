# ub-auth

Unofficial authentication system for Universitas Brawijaya student account.

## Get Started

**Install via NPM**

```sh
npm install @yogarn/ub-auth
```

### Basic Usage

```js
import ub from "@yogarn/ub-auth";

async function authenticate() {
  try {
    const data = await ub.auth({
      username: "23515xxxxxxxxxx",
      password: "password",
    });
    console.log(data);
    // handle successful login
  } catch (error) {
    console.error("Authentication failed:", error);
    // handle failed login
  }
}

authenticate();
```

**Response**  
Upon successful authentication, the following student profile information will be returned:

```json
{
  "data": {
    "nim": "23515xxxxxxxxxx",
    "nama": "JOHN DOE",
    "jenjangFakultas": "S1/Ilmu Komputer",
    "jurusan": "Teknik Informatika",
    "programStudi": "Teknik Informatika",
    "seleksi": "SELEKSI NASIONAL BERDASARKAN PRESTASI Brawijaya - Malang",
    "nomorUjian": "49xxxxxxx"
  }
}
```

By following these steps, you can quickly integrate ub-auth into your project and authenticate Universitas Brawijaya student accounts with ease.

### Get Student Class Schedules

```js
import ub from "@yogarn/ub-auth";

async function getClasses() {
  try {
    const data = await ub.auth({
      username: "23515xxxxxxxxxx",
      password: "password",
      isPendek: 0,
    });
    console.log(data);
    // handle data
  } catch (error) {
    console.error("Error:", error);
    // handle error
  }
}

getClasses();
```

**Response**

```
{
  data: [
    {
      hari: 'Senin',
      jam: '09:30 - 11:59',
      kelas: 'Z',
      kode: 'xxxxxxxxx',
      mataKuliah: 'Statistika dan Teori Peluang',
      tahunKurikulum: '2020',
      dosen: 'xxxxxxxxx',
      ruang: 'xxxxxxxxx',
      jenis: 'Luring'
    },
    {
      hari: 'Senin',
      jam: '12:50 - 14:29',
      kelas: 'Z',
      kode: 'xxxxxxxxx',
      mataKuliah: 'Sistem Operasi',
      tahunKurikulum: '2020',
      dosen: 'xxxxxxxxx',
      ruang: 'xxxxxxxxx',
      jenis: 'Luring'
    }
  ]
}
```

### Get Student Scores

```js
import ub from '@yogarn/ub-auth';

async function getKhs() {
  try {
    const data = await ub.getKhs({
      username: '23515xxxxxxxxxx',
      password: 'password',
      semester: 2,
      isPendek: 1
    });
    console.log(data);
    // handle data
  } catch (error) {
    console.error('Error:', error);
    // handle error
  }
}

getKhs();
```

**Response**

```
{
  data: [
    {
      no: '1',
      kode: 'COM60052',
      mataKuliah: 'Etika Profesi',
      sks: '2',
      nilai: 'A'
    },
    {
      no: '2',
      kode: 'CIF61010',
      mataKuliah: 'Metode Numerik',
      sks: '3',
      nilai: 'A'
    }
  ]
}

```
