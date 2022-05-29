import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserModel } from '../user.model';


@Injectable()
export class JwtStratagy extends PassportStrategy(Strategy) {
    constructor(private readonly configeService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: true,
            secretOrKey: configeService.get('JWT_SECRET')
        });
    }

    async validate({ email }: Pick<UserModel, 'email'>) {
        return email;
    }
}