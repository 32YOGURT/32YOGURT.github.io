# Express 웹의 기본 구조
![Express 웹의 기본 구조](./assets/img/post/post4/mvc_express.png)

## HTML Request -> Routes
라우트는 사용자의 요청을 경로와 요청의 종류에 따라 특정 컨트롤러로 전달하는 역할을 수행한다.

라우트는 다음과 같은 구조를 갖는다.

`app.METHOD(PATH, HANDLER)`

- app: express의 인스턴스
- METHOD: HTTP 요청 메소드
- PATH: 서버에서의 경로
- HANDLER: 라우트가 일치할 때 실행되는 함수

서버에 특정 경로(path)와 특정 메소드(METHOD)로 HTTP 요청이 들어왔을 때, 지정된 HANDLER 함수를 실행한다.

### METHOD
`METHOD`는 HTTP 메소드에서 파생되며, HTTP 요청 종류에 따라 다른 METHOD를 사용할 수도 있다.

- `app.get()`
- `app.post()`
- `app.put()`
- `app.delete()`
- `app.all()`: 모든 종류의 HTTP 요청 처리

### PATH
`path`: 미들웨어 함수가 호출되는 경로, default: `/`

path는 문자열, 문자열 패턴, 또는 정규식을 사용할 수 있다.

```javascript
app.get('/about', HANDLER); // /about

app.get('/ab?cd', HANDLER); // /abcd 또는 /acd

app.get('/ab*cd', HANDLER); // /abcd, /abxcd, /abRANDOMcd, /abHELLOcd 등등

app.get(/a/, HANDLER); // a가 포함된 모든 경로
```

### HANDLER
`HANDLER`: 미들웨어 함수, 미들웨어 함수 여러개 가능 (리스트 또는 쉼표로 분리)

하나의 HANDLER가 하나의 라우트를 처리할 수도 있고, 2개 이상의 HANDLER가 `next()`를 통해 하나의 라우트를 처리할 수도 있다.

```javascript
app.get('/example/b', function (req, res, next) {
  console.log('the response will be sent by the next function ...');
  next();
}, function (req, res) {
  res.send('Hello from B!');
});
```

### express.Router()

### `app.METHOD(path, callback [, callback...])`





#### `app.use([path,], callback [, callback...])`

특정 경로와 미들웨어 함수를 마운트 시킴. 지정된 경로로 요청이 들어왔을 때, 지정된 미들웨어 함수를 실행

지정된 경로에 대한 모든 요청(GET, POST, PUT, DELETE 등) 을 처리

#### `app.all()` vs `app.use()`

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