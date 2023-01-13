# TEAM OWNSIZE
🔔 서비스명 : 온사이즈

🔔 서비스 한줄소개 : 사이즈 실측 입력을 바탕으로 온라인 쇼핑몰에서 사이즈를 추천하고 의류 정보 아카이빙을 제공한다

🔔 서비스 가치제안 : 

🔔 서비스 문제정의 : 

🔔 서비스 타겟정의 : 

<br/>

### ⚒️ Used Stacks
 ![Typescript](https://img.shields.io/badge/Typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
 ![NodeJS](https://img.shields.io/badge/Node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
 ![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)

<br/>

### 👥 Contributors
|김동재| |조하얀|

<br/>

### 기능 설명

![1](https://user-images.githubusercontent.com/87058086/212251691-04f91c31-bdd2-40c0-bea2-32983c35986a.jpg)
![18](https://user-images.githubusercontent.com/87058086/212251542-20700706-0fba-4136-8ee0-d6681d3af792.jpg)
![19](https://user-images.githubusercontent.com/87058086/212251546-83836007-ac36-4bd8-9b63-e51ee3f2dbf9.jpg)
![20](https://user-images.githubusercontent.com/87058086/212251550-557f5122-d548-4f49-9503-4643be625248.jpg)
![21](https://user-images.githubusercontent.com/87058086/212251551-281b002a-97ae-46dd-b034-58c6dd8a31d2.jpg)
![22](https://user-images.githubusercontent.com/87058086/212251552-9930de87-3a8e-4c31-9eab-7da7c64fd245.jpg)
![24](https://user-images.githubusercontent.com/87058086/212251554-542a53f5-a620-4c54-bc12-255426d296f7.jpg)
![26](https://user-images.githubusercontent.com/87058086/212251324-cbb37ad9-1ba1-4531-be1b-4e87d86204ad.jpg)
![27](https://user-images.githubusercontent.com/87058086/212251370-440775da-f4ae-48e4-9467-ec79a5ccd10b.jpg)
![29](https://user-images.githubusercontent.com/87058086/212251400-008115f9-ef46-4dc8-824e-182e85ccca3b.jpg)
![30](https://user-images.githubusercontent.com/87058086/212251429-f4099461-2968-41e2-b4ef-94a23f29c375.jpg)

<br/>

### 💻 Roles
|기능명|엔드포인트|담당|구현 진척도|
| :---: | :---: | :---: | :---: |

|회원가입 및 로그인|[POST] /auth/login|`조하얀`| o |

|전체 옷장 조회|[GET] /allCloset|`김동재`| o |

|전체 옷장 의류 정보 수정|[PUT] /allCloset/:productId|`김동재`| o |

|전체 옷장 의류 삭제|[DELETE] /allCloset/:productId|`김동재`| o |

|포함된 카테고리 id 조회|[GET] /allCloset/:productId|`김동재`| o |

|카테고리에 의류 추가|[POST] /allCloset/toCategory|`김동재`| o |

|카테고리 전체 조회|[GET] /category|`김동재`| o |

|카테고리 생성|[POST] /category/createCategory|`김동재`| o |

|카테고리 삭제|[DELETE] /category/:categoryId|`김동재`| o |

|카테고리 수정|[PUT] /category/:categoryId|`김동재`| o |

|카테고리 상세 조회|[GET] /category/:categoryId|`김동재`| o |

|카테고리 내 의류 핀 고정/해제 |[PUT] /category/:categoryId/:productId|`김동재`| o |

|카테고리 내 의류 삭제|[DELETE] /category/:categoryId/:inClothId|`김동재`| o |

|마이사이즈 조회|[GET] /mysize|'조하얀'| o |

|내 상의 사이즈 정보 입력|[POST] /mysize/topSize|'조하얀'| o |

|내 하의 사이즈 정보 입력|[POST] /mysize/bottomSize|'조하얀'| o |

|마이페이지 조회|[GET] /mypage|'조하얀`| o |

|사이즈 추천 기록 조회|[GET] /mypage/history|`조하얀`| o |

|전체 옷장에 저장|[POST] /extesion/toAllCloset|'김동재'| o |

|크롤링한 사이즈표 저장|[POST] /extesion/saveCrawling|'김동재'| o |

|사이즈 추천 결과 저장|[POST] /extension/saveBest|'김동재'| o |

|비교 사이즈 수동 입력|[POST] /extension/inputSize|'김동재'| o |



<br/>

### ERD (수정중)
![diagram](https://user-images.githubusercontent.com/87058086/210496676-54e17fcd-cc64-4a32-9311-a2e0b5bc5622.png)




<br/>

### 🧑‍💻 Code Convention

<details>
<summary>변수명</summary>   
<div markdown="1">       

 1. Camel Case 사용
 2. 함수의 경우 동사+명사 사용 ( ex) getUser() )
 3. 약어는 되도록 사용하지 않음
 
</div>
</details>

<details>
<summary>주석</summary>   
<div markdown="1">       

 1. 한 줄 주석 사용 //
 2. 함수 주석
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

이 외 ESLint 라이브러리 문법을 따른다.

<br/>

### 🎋 Branch Convention
|Branch 이름|용도|
| :--: | :--: |
|main|초기 세팅|
|develop|배포 branch (api 로직 구현 완료)|
|feature/#이슈번호|이슈별 api 로직 구현|

- feature -> development : Pull Request (코드 리뷰 없이 merge 불가)

<br/>

### ⬆️ Commit Convention
```
[브랜치 이름] 기능 (또는 변경사항) 간략 설명 (70자)

- 보충 설명이 필요한 경우
- Head에 한칸을 띄어서 작성

issue tracker: 이슈 번호 (option)
```

<br/>

### 📂 Folder Constructor
```
3-Layer Architecture 기반

📁 src
|_ 📁 constants
|_ 📁 controller
|_ 📁 interfaces
|_ 📁 middlewares
|_ 📁 modules
|_ 📁 router
|_ 📁 service
|_ 📁 test
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
<summary> <h3> 🔶 package.json (dependencies module)</h3></summary>   
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

### 📌 Server Architecture
- 개발 환경 : Typescript, Express(Node.js)
- 데이터베이스 : PostgreSQL, AWS S3
- 서버 환경 : AWS EC2, PM2
