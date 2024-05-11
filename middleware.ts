import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { ROUTERS } from "./emun/routers";

const isPublicRoute = createRouteMatcher([
  ROUTERS.Login,
  ROUTERS.Register,
  ROUTERS.Home,
  // "/api/webhooks(.*)"
  "/api/uploadthing(.*)"
])
 
const isAuthUserRoute = createRouteMatcher([
  ROUTERS.Search,
]);

export default clerkMiddleware((auth, req) => {
  // Restrict auth routes to users with specific permissions
  if (isAuthUserRoute(req)) auth().protect()
  // Restrict organization routes to signed in users
  // if (isPublicRoute(req)) auth().protect();
});

export const config = {
  matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};