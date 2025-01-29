### `app.METHOD(path, callback [, callback...])`

특정 경로(path)로 HTTP 요청이 들어왔을 때, 지정된 콜백 함수를 실행

`path`: 미들웨어 함수가 호출되는 경로, default: `/`

`callback`: 미들웨어 함수, 미들웨어 함수 여러개 가능 (리스트 또는 쉼표로 분리)

HTTP 요청 종류에 따라, 다른 METHOD를 사용할 수도 있음
- `app.get()`
- `app.post()`
- `app.put()`
- `app.delete()`
- `app.all()`: 모든 종류의 HTTP 요청 처리

### `app.use([path,], callback [, callback...])`

특정 경로와 미들웨어 함수를 마운트 시킴. 지정된 경로로 요청이 들어왔을 때, 지정된 미들웨어 함수를 실행

지정된 경로에 대한 모든 요청(GET, POST, PUT, DELETE 등) 을 처리

### `app.all()` vs `app.use()`

- 용도

app.all(): HTTP 요청을 라우팅하는 용도로 주로 사용. 실질적인 데이터 송수신이 이루어짐
app.use(): 미들웨어 함수를 마운트시키는 용도로 주로 사용. 특정 미들웨어 기능 (로그인, 인증)을 사용하기 위함.

- 경로

app.all(): 지정된 경로에만 적용됨
app.use(): 지정된 경로로 시작하는 모든 경로에 적용

```
// 예시

app.all('/users') // `/users`에만 적용
app.use('/users') // `/users`로 시작하는 모든 경로 (/users/ID, /users/login ...)에 적용

```