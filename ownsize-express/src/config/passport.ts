import passport, { authorize } from "passport";
import { User } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import googlePassport from "passport-google-oauth2";
import { String } from "aws-sdk/clients/acm";
import config from "./config";
const GoogleStrategy = googlePassport.Strategy;
import { Request } from "express";

//serializeUser : 로그인 / 회원가입 후 1회 실행
passport.serializeUser((user: User, done: (err: any, id?: unknown) => void) => {
  done(null, user);
});

//deserializeUser : 로그인 전환시 마다 실행
passport.deserializeUser(
  (user: User, done: (err: any, id?: unknown) => void) => {
    done(null, user);
  }
);

passport.use(
  new GoogleStrategy(
    {
      clientID: config.GOOGLE_CLIENT_ID as string,
      clientSecret: config.GOOGLE_SECRET as string,
      callbackURL: "/auth/loginCallback",
      passReqToCallback: true,
    },
    async (
      req: Request,
      accessToken: String,
      refreshToken: String,
      profile: any,
      done: googlePassport.VerifyCallback
    ) => {
      try {
        console.log("profile : ", profile);
        var id = profile.id;
        var data = await prisma.user.findUnique({ id: id });
        if (!data) {
          console.log("db에 없음");
          const newUser = await prisma.user.create({
            id: profile.id,
            name: profile.displayName,
            email: profile.email,
          });
          return done(null, newUser.id);
        } else {
          console.log("db에 있음.");
          done(null, data.id);
        }
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

export default passport;
