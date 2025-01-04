## 내가 쓰려고 만드는 TODO
매일 앱 들어가서 쓰기 귀찮아서 내가 쓰려고 만드는 TODO 앱

### User Story
- 유저는 회원가입, 로그인을 할 수 있다.
- 로그인을하면 로그아웃버튼으로 바뀐다.
- 유저는 HOME, LOGS 페이지를 이동할 수 있다.
- 홈에서는 오늘 ~ 이번주 까지의 할일을 삽입,조회,수정,삭제 할 수 있다.
- logs 페이지는 모든 스케줄을 월별로 볼 수 있다(사이드바).


### Schema Model
- User : {email, password}
- Schedule : {userId, title, isDone, date}
### Routing
- 로그인 : /user/login POST
- 회원가입 : /user POST
- 스케줄 추가 : /schedule POST
- 스케줄 불러오기 : /schedule GET
- 스케줄 변경 : /schledule PUT
- 스케줄 삭제 : /schedule DELETE
