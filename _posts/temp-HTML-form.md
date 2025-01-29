# HTML form
form에서 주로 사용되는 element

## <form> attribute

### action
폼 데이터를 전송할 위치(URL)를 정의
action이 생략되면, 현재 위치로 자동 설정

`<form action="data/my_form_page">`

### method
폼 데이터를 전송할 때의 HTML METHOD를 지정
method는 "get" 또는 "post", 기본값은 "post"

- "get": 폼 데이터를 URL에 포함시켜 전달 (`?key=value` 형태), URL에서 전송된 데이터를 확인 가능 (보안 X)
- "post": 폼 데이터를 HTTP 본문에 포함시켜 전달, URL에서 전송된 데이터 확인 불가 (보안 O)

`<form method='post'>`

### target
데이터 응답이 표시될 위치 지정

- "_blank": 새로운 윈도우/탭에 표시
- "_self": 현재 윈도우/탭에 표시 (기본값)
- "_parent": 부모 프레임(현재 프레임의 상위 프레임)에 표시
- "_top": 윈도우 전체 화면으로 표시
- "framename": 지정된 프레임에 표시

### autocomplete
자동 완성된 값을 기본값으로 가질 수 있는지 정의
(로그인 폼일때는 보통 autocomplete을 비활성화)

- "on": 과거 입력 값에 기반하여 브라우저가 자동으로 값을 채워넣음 (기본값)
- "off": 브라우저가 자동으로 값을 채워넣지 않음

## <input> attribute

###