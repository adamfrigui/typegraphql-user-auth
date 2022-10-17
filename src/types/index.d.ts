// ./src/typings/express-session/index.d.ts
import "express-session"; // don't forget to import the original module

declare module "express-session" {
    interface session {
        userId: string // whatever property you like
    }
}