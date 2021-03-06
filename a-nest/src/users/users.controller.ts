import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { JoinRequestDto } from './dto/join.request.dto';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserDto } from '../common/dto/user.dto';
import { User } from '../common/decorators/user.decorator';
import { LoggedInGuard } from '../auth/logged-in.guard';
import { NotLoggedInGuard } from '../auth/not-logged-in.guard';
import { LocalAuthGuard } from '../auth/local-auth.guard';

@ApiTags('USER')
@Controller('api/users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @ApiResponse({
    status: 200,
    type: UserDto,
    description: '성공',
  })
  @ApiResponse({
    status: 500,
    description: '서버 에러',
  })
  @ApiOperation({ summary: '내정보 조회' })
  @Get()
  getUsers(@User() user) {
    return user || false;
  }

  @UseGuards(new NotLoggedInGuard())
  @ApiOperation({ summary: '회원가입' })
  @Post()
  async join(@Body() data: JoinRequestDto) {
    await this.usersService.join(data.email, data.nickname, data.password);
  }

  @ApiResponse({
    type: UserDto,
  })
  @ApiOperation({ summary: '로그인' })
  @UseGuards(new LocalAuthGuard())
  @Post('login')
  login(@User() user) {
    return user;
  }

  @UseGuards(new LoggedInGuard())
  @ApiOperation({ summary: '로그아웃' })
  @Post('logout')
  logOut(@Req() req, @Res() res) {
    req.logOut();
    res.clearCookie('connect.sid', { httpOnly: true });
    res.send('ok');
  }
}
