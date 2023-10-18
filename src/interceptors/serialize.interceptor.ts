import {
  UseInterceptors,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { map, Observable } from 'rxjs';


export class SerializeInterceptor implements NestInterceptor {
constructor (private dto:any) {}


  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    // Run something before request is handled by the request handler
    console.log('Running before the handler', context);

    return next.handle().pipe(
      map((data: any) => {
        // run something before the response is sent out
        console.log('runnning before the response is sentout', data);
        return plainToClass(this.dto, data, {
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}
