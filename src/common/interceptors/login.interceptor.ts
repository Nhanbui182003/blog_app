import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, tap } from "rxjs";

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    constructor(){}

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any>{
        const call$ = next.handle();
        const request = context.switchToHttp().getRequest<Request>();
        const content = request.method + ' -> ' + request.url;
        const now = Date.now()
        
        return call$.pipe(tap(() => console.debug('--- res：', content, `${Date.now() - now}ms`)));
    }
}