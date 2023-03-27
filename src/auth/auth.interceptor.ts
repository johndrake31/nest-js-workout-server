import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, Observable } from 'rxjs';
import { authJwt } from './auth';

@Injectable()
export class AuthInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    // const res = context.switchToHttp().getResponse();
    const token = request.headers['authorization'];
    const isAuthed = authJwt(token);
    console.log({ isAuthed });
    // if (!isAuthed) return 'invalid signature';
    if (isAuthed) {
      return next.handle().pipe(
        catchError((err) => {
          console.log(err);
          return err;
        }),
      );
    }
  }
}

// @Injectable()
// export class AuthInterceptor implements NestInterceptor {
//   constructor(
//     private readonly authService: AuthService,
//     private readonly httpService: HttpService,
//   ) {}

//   intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
//     return next.handle().pipe(
//       catchError((err) => {
//         const {
//           response: { status, config },
//         } = err;

//         // assuming we have a request body
//         const jsonData = JSON.parse(config.data);

//         if (status === HttpStatus.UNAUTHORIZED) {
//           // We can use some data in payload to find user data
//           // here for example the user email
//           if (jsonData?.email) {
//             return;
//             from(this.authService.getByUserEmail(jsonData.email)).pipe(
//               switchMap((user: User) => {
//                 if (user) {
//                   // Ex: we can have stored token info in user entity.
//                   // call function to refresh access token and update user data
//                   // with new tokens
//                   return from(this.authService.refreshToken(user)).pipe(
//                     switchMap((updatedUser: User) => {
//                       // now updatedUser have the new accessToken
//                       const { accessToken } = updatedUser;

//                       // set the new token to config (original request)
//                       config.headers['Authorization'] = `Bearer ${accessToken}`;

//                       // and use the underlying Axios instance created by @nestjs/axios
//                       // to resubmit the original request
//                       return of(this.httpService.axiosRef(config));
//                     }),
//                   );
//                 }
//               }),
//             );
//           } else {
//             return throwError(() => new HttpException(err, Number(err.code)));
//           }
//         } else {
//           return throwError(() => new HttpException(err, Number(err.code)));
//         }
//       }),
//     );
//   }
// }
