import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AppService } from 'src/app.service';
import { AccountToken } from 'src/entities/account-token.entity';

describe('The AuthenticationService', () => {
    let authenticationService: AppService;
    beforeEach(() => {
        authenticationService = new AppService(
            new JwtService({
                secretOrPrivateKey: 'Secret key'
            })
        );
    })
    describe('when creating a token', () => {
        it('should return an object of account token', () => {
            const accountId = 1;
            expect(
                typeof authenticationService.createToken({ accountId })
            ).toEqual(AccountToken)
        })
    })
});