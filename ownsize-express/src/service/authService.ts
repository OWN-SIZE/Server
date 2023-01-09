import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const { OAuth2Client } = require("google-auth-library");
require("dotenv").config();

const jwt = require("jsonwebtoken");

/*
const JWT_SECRET =
  "8f386f672542e4c095dae727aa6f1314b690b0529805daae0bcb67119346b8df38e7478dd25afc80cb837a28e9c5e3ea2e8fbdb903100ca4fb5cdda40ae529e7";
*/

//* 회원가입 및 로그인
const register = async (code: string) => {
  // 구글 클라이언트 id
  const client = new OAuth2Client(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    "postmessage"
  );
  console.log("!!!!********");
  const tokens = client.getToken(code); // code 받아서 idToken과 access token 얻음
  //여기 그냥 await 또는 await Promise.resolve 쓰면 GaxiosError: invalid_grant 오류남
  //await안쓰면 여긴 넘어가고 Token: Promise { <pending> }, idToken: undefined
  console.log("********");
  console.log("********Token:", tokens);
  const idToken = tokens.id_token;
  console.log("********idToken:", idToken);

  // Google 라이브러리를 통해서 유저를 verify
  const ticket = await client.verifyIdToken({ idToken });
  console.log("ticket: ", ticket);
  const payload = ticket.getPayload();
  const userId = payload["sub"]; //21자리의 Google 회원 id 번호

  // 유저 verify 되지 않으면 에러 (idToken 제대로 안된 상황? 이땐 우짜지..)
  if (!ticket) {
    console.log("user not verified");
    return null;
  }

  // jwt토큰 생성 (jwt.sign의 파라미터: payload, secret key)
  const token = jwt.sign(
    {
      id: payload.sub,
      name: payload.name,
      email: payload.name,
    },
    process.env.JWT_SECRET
  );

  // DB에 저장된 사람이라면 DB에 JWT token만 업데이트를 해주고,
  // DB에 없다면 JWT 토큰을 만들어주고 돌려준다.
  const user = await prisma.user.upsert({
    where: { id: userId },
    update: { token: token }, //있으면 업데이트
    create: {
      id: userId,
      name: payload.name,
      email: payload.name,
      token: token,
    }, //없으면 만듦
  });

  if (!user) {
    console.log("user error");
    return null;
  }

  // 생성된 토큰 data를 리턴
  return token;
};

const authService = {
  register,
};

export default authService;
