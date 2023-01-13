# TEAM OWNSIZE
![1](https://user-images.githubusercontent.com/87058086/212251691-04f91c31-bdd2-40c0-bea2-32983c35986a.jpg)

🔔 서비스명 : 온사이즈

🔔 서비스 한줄소개 : 쉽고 똑똑한 나의 쇼핑 도우미, 온사이즈

🔔 서비스 가치제안 : 
- 단순한 / Simple : 몇 번의 클릭만으로 사이즈를 추천받고 나의 옷장에 저장해요
- 개인화된 / Personalize : 오로지 나만의 기준으로 옷을 추천받고 분류해요
- 똑똑한 / Smart : 익스텐션을 통해 보다 똑똑하게 쇼핑해요

🔔 서비스 문제정의 : 
- 사이즈 실패로 인해 발생하게 될 환불, 교환, 반송에 대한 스트레스
- 정확한 사이즈를 고르고자 다양한 정보를 수집하는 과정 속 번거로움

🔔 서비스 타겟정의 : 
- 패션에 관심이 많아 온라인에서 다양한 의류 및 관련정보를 찾아보며 구매를 결정하는 고객
- 온라인에서의 사이즈 실패 경험으로 인해 오프라인 쇼핑으로 전환한 고객

<br/>

### <strong> 🏃 Used 🏃 </strong>
<br>
<p>
<img alt="TypeScript" src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white"/>
<img alt="PostgreSQL" src="https://img.shields.io/badge/PostgreSQL-4169E1.svg?style=for-the-badge&logo=postgresql&logoColor=white"/>
<img alt="Prisma" src="https://img.shields.io/badge/Prisma-2D3748.svg?style=for-the-badge&logo=Prisma&logoColor=white"/>
<img alt="AWS" src="https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white"/><br>
<img alt="Prettier" src="https://img.shields.io/badge/Prettier-F7B93E.svg?style=for-the-badge&logo=Prettier&logoColor=black"/>
<img alt="ESLint" src="https://img.shields.io/badge/ESLint-4B32C3.svg?style=for-the-badge&logo=ESLint&logoColor=white"/>
</p>

<br/>

### 👥 Contributors
|<img src<"https://user-images.githubusercontent.com/87058086/212255576-b3b9bccc-a8e3-453f-9bb9-be9e6ab018f6.jpeg" width="200">|<img src<"https://user-images.githubusercontent.com/87058086/212256100-1c55311a-06f1-4879-82e1-5501e9b10f1f.jpg" width="200">|
| :-----------------------------------: | :-----------------------------------------------: | 
|                김동재                 |                      조하얀                       |              
| [ ehdwoKIM ](https://github.com/ehdwoKIM) | [ yanh2 ](https://github.com/yanh2) |

<br/>

### 기능 설명

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
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id            Int             @id(map: "user_pk") @unique(map: "user_id_uindex") @default(autoincrement())
  name          String?         @db.VarChar(10)
  email         String          @unique @db.VarChar(50)
  userImage     String?         @db.VarChar(500)
  token         String?         @db.VarChar(500)
  AllCloset     AllCloset[]
  AllSizeBottom AllSizeBottom[]
  AllSizeTop    AllSizeTop[]
  Category      Category[]
  Recommend     Recommend[]
}

model AllCloset {
  id                 Int                  @id(map: "Archive_pkey") @unique(map: "Archive_id_key") @default(autoincrement())
  userId             Int                  @default(autoincrement())
  image              String?              @db.VarChar(500)
  productName        String?              @db.VarChar(36)
  size               String?              @db.VarChar(10)
  memo               String?              @db.VarChar(50)
  isRecommend        Boolean?
  isPin              Boolean              @default(false)
  mallName           String?              @db.VarChar(50)
  productUrl         String?              @db.VarChar(500)
  faviconUrl         String?              @db.VarChar(500)
  createdAt          String?              @db.VarChar(20)
  User               User                 @relation(fields: [userId], references: [id], onDelete: NoAction, onUpdate: NoAction, map: "allcloset_user_id_fk")
  AllCloset_Category AllCloset_Category[]
}

model AllSizeBottom {
  id              Int      @id @unique @default(autoincrement())
  size            String?  @db.VarChar(10)
  bottomLength    Int?
  waist           Int?
  thigh           Int?
  rise            Int?
  hem             Int?
  isWidthOfBottom Boolean?
  isManual        Boolean?
  topOrBottom     Int?
  manualInputNum  Int?
  bottomItemId    Int?
  userId          Int      @default(autoincrement())
  User            User     @relation(fields: [userId], references: [id], onDelete: NoAction, onUpdate: NoAction, map: "allsizebottom_user_id_fk")
}

model AllSizeTop {
  id             Int      @id @unique @default(autoincrement())
  size           String?  @db.VarChar(10)
  topLength      Int?
  shoulder       Int?
  chest          Int?
  isWidthOfTop   Boolean?
  isManual       Boolean?
  topOrBottom    Int?
  manualInputNum Int?
  topItemId      Int?
  userId         Int      @default(autoincrement())
  User           User     @relation(fields: [userId], references: [id], onDelete: NoAction, onUpdate: NoAction, map: "allsizetop_user_id_fk")
}

model MySize {
  id              Int      @id @unique @default(autoincrement())
  userId          Int      @unique @default(autoincrement())
  topLength       Int?
  shoulder        Int?
  chest           Int?
  isWidthOfTop    Boolean?
  bottomLength    Int?
  waist           Int?
  thigh           Int?
  rise            Int?
  hem             Int?
  isWidthOfBottom Boolean?
}

model Category {
  id                 Int                  @id @unique @default(autoincrement())
  categoryName       String?              @db.VarChar(20)
  isPinCategory      Boolean?
  image              String[]             @db.VarChar
  userId             Int                  @default(autoincrement())
  AllCloset_Category AllCloset_Category[]
  User               User                 @relation(fields: [userId], references: [id], onDelete: NoAction, onUpdate: NoAction, map: "category_user_id_fk")
}

model AllCloset_Category {
  id         Int       @id @unique @default(autoincrement())
  productId  Int       @default(autoincrement())
  categoryId Int       @default(autoincrement())
  isInPin    Boolean?
  AllCloset  AllCloset @relation(fields: [productId], references: [id], onDelete: NoAction, onUpdate: NoAction, map: "allcloset_category_allcloset_id_fk")
  Category   Category  @relation(fields: [categoryId], references: [id], onDelete: NoAction, onUpdate: NoAction, map: "allcloset_category_category_id_fk")
}

model Recommend {
  id            Int     @id @unique @default(autoincrement())
  userId        Int     @default(autoincrement())
  url           String? @db.VarChar(200)
  recommendSize String? @db.VarChar(10)
  topItemId     Int?
  bottomItemId  Int?
  User          User    @relation(fields: [userId], references: [id], onDelete: NoAction, onUpdate: NoAction, map: "recommend_user_id_fk")
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
