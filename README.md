# TEAM OWNSIZE
๐ ์๋น์ค๋ช : ์จ์ฌ์ด์ฆ

๐ ์๋น์ค ํ์ค์๊ฐ : ์ฌ์ด์ฆ ์ค์ธก ์๋ ฅ์ ๋ฐํ์ผ๋ก ์จ๋ผ์ธ ์ผํ๋ชฐ์์ ์ฌ์ด์ฆ๋ฅผ ์ถ์ฒํ๊ณ  ์๋ฅ ์ ๋ณด ์์นด์ด๋น์ ์ ๊ณตํ๋ค

๐ ์๋น์ค ๊ฐ์น์ ์ : 

๐ ์๋น์ค ๋ฌธ์ ์ ์ : 

๐ ์๋น์ค ํ๊ฒ์ ์ : 

<br/>

### โ๏ธ Used Stacks
 ![Typescript](https://img.shields.io/badge/Typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
 ![NodeJS](https://img.shields.io/badge/Node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
 ![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)

<br/>

### ๐ฅ Contributors
|๊น๋์ฌ| |์กฐํ์|


<br/>

### ๐ป Roles
|๊ธฐ๋ฅ๋ช|์๋ํฌ์ธํธ|๋ด๋น|๊ตฌํ ์ง์ฒ๋|
| :---: | :---: | :---: | :---: |

|์์ ๋ก๊ทธ์ธ|[POST] /auth/login|`์กฐํ์`| |

|ํ์๊ฐ์|[POST] /auth/register|`์กฐํ์`| |

|์ ์ฒด ์ท์ฅ ์กฐํ|[GET] /allCloset|`๊น๋์ฌ`| o |

|์ ์ฒด ์ท์ฅ ์๋ฅ ์ ๋ณด ์์ |[PUT] /allCloset/:productId|`๊น๋์ฌ`| o |

|์ ์ฒด ์ท์ฅ ์๋ฅ ์ญ์ |[DELETE] /allCloset/:productId|`๊น๋์ฌ`| o |

|์นดํ๊ณ ๋ฆฌ ์ ์ฒด ์กฐํ|[GET] /category|`๊น๋์ฌ`| o |

|์นดํ๊ณ ๋ฆฌ ์์ฑ|[POST] /category/plusCategory|`๊น๋์ฌ`| o |

|์นดํ๊ณ ๋ฆฌ ์ญ์ |[DELETE] /category/:categoryId|`๊น๋์ฌ`| |

|์นดํ๊ณ ๋ฆฌ ์์ธ ์กฐํ|[GET] /category/:categoryId|`๊น๋์ฌ`| |

|์นดํ๊ณ ๋ฆฌ ๋ด ์๋ฅ ์ ๋ณด ์์ |[PUT] /category/:categoryId/:inClothId|`๊น๋์ฌ`| |

|์นดํ๊ณ ๋ฆฌ ๋ด ์๋ฅ ์ญ์ |[DELETE] /category/:categoryId/:inClothId|`๊น๋์ฌ`| |

|๋ง์ด์ฌ์ด์ฆ ์กฐํ|[GET] /mysize|'์กฐํ์'| |

|๋ด ์์ ์ฌ์ด์ฆ ์ ๋ณด ์๋ ฅ|[POST] /mysize/topSize|'์กฐํ์'| o |

|๋ด ํ์ ์ฌ์ด์ฆ ์ ๋ณด ์๋ ฅ|[POST] /mysize/bottomSize|'์กฐํ์'| |

|๋ง์ดํ์ด์ง ์กฐํ|[GET] /mypage|'์กฐํ์`| |

|์ฌ์ด์ฆ ์ถ์ฒ ๊ธฐ๋ก ์กฐํ|[GET] /mypage|`์กฐํ์`| |

|ํ์ฌ ์ท ์ข๋ฅ ์ ํ|[PUT] /extension/:userId/topOrBottom|'๊น๋์ฌ'| |

|์ฌ์ด์ฆ ๋น๊ต ๊ฒฐ๊ณผ ์กฐํ|[GET] /extension/bestSize|'๊น๋์ฌ'| |

|์ ์ฒด ์ท์ฅ์ ์ ์ฅ|[POST] /extesion/plusCloset|'๊น๋์ฌ'| |

|๋น๊ต ์ฌ์ด์ฆ ์๋ ์๋ ฅ|[POST] /extension/inputSize|'๊น๋์ฌ'| |



<br/>

### ERD (์์ ์ค)
![diagram](https://user-images.githubusercontent.com/87058086/210496676-54e17fcd-cc64-4a32-9311-a2e0b5bc5622.png)




<br/>

### ๐งโ๐ป Code Convention

<details>
<summary>๋ณ์๋ช</summary>   
<div markdown="1">       

 1. Camel Case ์ฌ์ฉ
 2. ํจ์์ ๊ฒฝ์ฐ ๋์ฌ+๋ช์ฌ ์ฌ์ฉ ( ex) getUser() )
 3. ์ฝ์ด๋ ๋๋๋ก ์ฌ์ฉํ์ง ์์
 
</div>
</details>

<details>
<summary>์ฃผ์</summary>   
<div markdown="1">       

 1. ํ ์ค ์ฃผ์ ์ฌ์ฉ //
 2. ํจ์ ์ฃผ์
 ```
 /**
 * @route
 * @desc
 * @access
 **/
 getUser()
 ```
 
</div>
</details>

์ด ์ธ ESLint ๋ผ์ด๋ธ๋ฌ๋ฆฌ ๋ฌธ๋ฒ์ ๋ฐ๋ฅธ๋ค.

<br/>

### ๐ Branch Convention
|Branch ์ด๋ฆ|์ฉ๋|
| :--: | :--: |
|main|์ด๊ธฐ ์ธํ|
|develop|๋ฐฐํฌ branch (api ๋ก์ง ๊ตฌํ ์๋ฃ)|
|feature/#์ด์๋ฒํธ|์ด์๋ณ api ๋ก์ง ๊ตฌํ|

- feature -> development : Pull Request (์ฝ๋ ๋ฆฌ๋ทฐ ์์ด merge ๋ถ๊ฐ)

<br/>

### โฌ๏ธ Commit Convention
```
[๋ธ๋์น ์ด๋ฆ] ๊ธฐ๋ฅ (๋๋ ๋ณ๊ฒฝ์ฌํญ) ๊ฐ๋ต ์ค๋ช (70์)

- ๋ณด์ถฉ ์ค๋ช์ด ํ์ํ ๊ฒฝ์ฐ
- Head์ ํ์นธ์ ๋์ด์ ์์ฑ

issue tracker: ์ด์ ๋ฒํธ (option)
```

<br/>

### ๐ Folder Constructor
```
3-Layer Architecture ๊ธฐ๋ฐ

๐ src
|_ ๐ constants
|_ ๐ controller
|_ ๐ interfaces
|_ ๐ middlewares
|_ ๐ modules
|_ ๐ router
|_ ๐ service
|_ ๐ test
|_ index.ts
```
<details>
<summary> <h3> schema.prisma </h3></summary>   
<div markdown="1">   

```
{
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        Int         @id(map: "user_pk") @unique(map: "user_id_uindex") @default(autoincrement())
  name      String?     @db.VarChar(10)
  email     String?     @db.VarChar(50)
  AllCloset AllCloset[]
}
```
</div>
</details>

<br/>

<details>
<summary> <h3> ๐ถ package.json (dependencies module)</h3></summary>   
<div markdown="1">   

```
{
  "name": "Server",
  "version": "1.0.0",
  "main": "index.js",
  "repository": "https://github.com/OWN-SIZE/Server.git",
  "author": "ehdwoKIM <kinbell19@gmail.com>",
  "license": "MIT",
  "scripts": {
    "dev": "nodemon",
    "build": "tsc && node dist",
    "db:pull": "npx prisma db pull",
    "db:push": "npx prisma db push",
    "generate": "npx prisma generate"
  },
  "dependencies": {
    "@prisma/client": "^4.6.1",
    "bcryptjs": "^2.4.3",
    "express": "^4.18.2",
    "express-validator": "^6.14.2",
    "prisma": "^4.6.1",
    "typescript": "^4.9.3"
  },
  "devDependencies": {
    "@types/bcryptjs": "^2.4.2",
    "@types/express": "^4.17.14",
    "@types/express-validator": "^3.0.0",
    "@types/node": "^18.11.9",
    "nodemon": "^2.0.20",
    "ts-node": "^10.9.1"
  }    
}
```
</div>
</details>
 
<br/>

### ๐ Server Architecture
- ๊ฐ๋ฐ ํ๊ฒฝ : Typescript, Express(Node.js)
- ๋ฐ์ดํฐ๋ฒ ์ด์ค : PostgreSQL, AWS S3
- ์๋ฒ ํ๊ฒฝ : AWS EC2, PM2
