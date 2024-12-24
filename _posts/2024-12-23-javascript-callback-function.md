---
title: 콜백 함수 (callback function)
date: 2024-12-23 22:30:00 +0900
categories: [JAVASCRIPT]
tags: [javascript, callback]     # TAG names should always be lowercase
description: 자바스크립트의 콜백 함수 & 비동기 함수의 개념
---

## callback 함수란?
콜백 함수는 **전달인자로 다른 함수에 전달되는 함수**를 말한다.  

콜백 함수는 함수를 순차적으로 실행시키고 싶을 때 주로 사용한다. 이를 쉽게 이해하기 위해, `call back`의 뜻을 짚어볼 필요가 있다.

## call back
`call back`은 `회신하다`, `다시 전화를 하다` 라는 의미로 사용된다. 

일상 생활에서 급한 일을 처리하는 도중에 전화가 왔을 때 "나중에 전화할게" (혹은 "콜백할게")라고 이야기하곤 한다.
이때 "콜백한다"는 말은 '이 일을 끝내자마자 전화할게'라는 말과 같다.

콜백 함수도 비슷한 상황에서 사용된다. 어떤 함수의 동작이 끝나자마자 다른 함수를 실행하고 싶을 때, 콜백 함수를 사용할 수 있다.

```javascript
function urgentMatter(matter) {
    console.log(`${matter} 하는 중`);
    console.log(`급한 일 끝`);
}

function callBack() {
    console.log('전화 걸기');
}
```

함수 `urgentMatter`와 `callBack`이 존재하고, 우리는 `urgentMatter`의 실행이 끝나자마자 `callBack`을 실행하고 싶다고 가정해보자.

콜백 함수를 사용하면 다음과 같이 표현할 수 있다.

```javascript
function urgentMatter(matter, callback) {
    console.log(`${matter} 하는 중`);
    console.log('급한 일 끝');
    callback();
}

function callBack() {
    console.log('전화 걸기');
}

urgentMatter('밥 먹기', callBack);
```

```
// 출력

밥 먹기 하는 중
급한 일 끝
전화 걸기
```

이때, `callBack` 함수와 같이 `urgentMatter` 함수의 매개변수(파라미터)로 전달되어 특정 시점에 실행되는 함수를 콜백 함수라고 부른다.

## 콜백 함수의 용도

그런데 굳이 복잡하게 콜백 함수를 사용하지 않고, 두 함수를 순차적으로 실행해도 되지 않을까?

```javascript
function urgentMatter(matter) {
    console.log(`${matter} 하는 중`);
    console.log(`급한 일 끝`);
}

function callBack() {
    console.log('전화 걸기');
}

urgentMatter('밥 먹기');
callBack();
```

이 코드도 콜백 함수를 활용한 코드와 동일한 결과를 출력한다. 

사실 앞선 사례와 같은 경우에는 콜백 함수를 반드시 사용해야 할 이유가 뚜렷하지 않을 수 있다. 

그러나 비동기 처리에서는 콜백 함수가 유용하게 활용될 수 있다.

## 동기적 함수 vs 비동기적 함수
동기적 함수는 한 번에 하나의 작업을 작성된 순서대로 순차적으로 실행하는 함수를 말한다.

비동기적 함수는 다른 작업을 병행하면서도 진행 중인 작업의 결과를 나중에 처리할 수 있는 함수를 말한다.

비동기적 함수는 왜 필요한 것이며, 정확히 무엇일까?

동기적 함수로 5초 타이머를 구현하는 경우를 생각해보자. 

```javascript
function timer(timeSet) {
    console.log('타이머 시작');
    for (let i = timeSet; i >= 0; i--) {
        console.log(`${i} 초`);
    }

    console.log('타이머 종료');
}

console.log('동기적 타이머 실행');
timer(5);
console.log('다른 작업 진행 중...');
```

```
// 출력

동기적 타이머 실행
타이머 시작
5 초
4 초
3 초
2 초
1 초
0 초
타이머 종료
다른 작업 진행 중...
```

이때 타이머가 작동되는 시간 동안 다른 작업들은 모두 차단되고, 사용자는 버튼 클릭이나 스크롤 등의 기능을 사용할 수 없다는 문제가 발생한다. 

실제로 앞선 코드에서도 `timer(5)`가 실행된 이후 종료될 때까지 다른 함수는 실행되지 않았고, 다 종료된 후에야 `다른 작업 진행 중...`을 출력했다.

타이머가 작동하는 동안 어떠한 기능도 사용할 수 없는 프로그램을 원하지는 않을 것이다. 

이런 문제를 해결하기 위해, javaScript는 `setTimeout`과 같은 비동기적 함수를 지원한다. 

```javascript
function asyncTimer(timeSet, callback) {
  console.log("타이머 시작");  

  // 1초 마다 출력
  let i = timeSet+1;
  let nInterval = setInterval(() => {
      i --;
      console.log(`${i}초`);
  }, 1000);

  // 5초가 지나면 setInterval 종료
  setTimeout(() => {
      clearInterval(nInterval);
      callback();
  }, 1000 * (timeSet+1));
}

function timeOver() {
    console.log('타이머 종료');
}

console.log("비동기적 타이머 실행");
asyncTimer(5, timeOver);
console.log("다른 작업 진행 중...");
```

```
// 출력

비동기적 타이머 실행
타이머 시작
다른 작업 진행 중...
5초
4초
3초
2초
1초
타이머 종료
```

동기적으로 구현한 타이머와 다르게, 타이머가 실행되는 도중에도 다른 작업을 진행할 수 있다.  

이러한 특성 덕분에, 비동기적 함수는 네트워크 요청이나 파일 입출력 등 시간이 오래 걸리는 작업에서 사용된다.

## 함수 표현식

콜백 함수는 인자로 다른 함수에 전달되기에 약식 표현을 활용해 간략하게 표현될 때가 많다.

다음의 함수들은 모두 같은 기능을 수행한다.

```javascript
const greet = function greetFuc(name) {
    return `Hello, ${name}!`;
}
```

```javascript
// 함수 이름 생략
const greet = function(name) {
    return `Hello, ${name}!`;
}
```

화살표 함수를 활용해 `() {return x; }`를 `() => x`과 같이 간략하게 표현할 수도 있다.

```javascript
// 화살표 함수
const greet = (name) => `Hello, ${name}!`;
```

매개변수가 1개일 때는 ()도 생략할 수 있다.

```javascript
const greet = name => `Hello, ${name}!`;
```

## 콜백 함수의 한계
콜백 함수는 javascript에서 비동기 함수를 구현하는 주요 방식이었다. 

하지만 복잡한 비동기 처리를 구현하기 위해서는 여러 콜백 함수를 중첩시킬 필요가 있는데, 이렇게 중첩된 콜백 함수들은 가독성도 떨어지고 오류를 처리하기도 어렵다는 단점이 있다. 

예를 들어, 데이터를 가져오고, 가져온 데이터를 처리하고, 데이터를 저장한 뒤, 화면에 출력하는 과정을 콜백 함수를 통해 구현한다고 생각해보자. 

```javascript
// 콜백 지옥
fetchData(url, (userData) => {
    processData(userData, (processedData) => {
        saveData(processedData, (savedData) => {
            displayResult(savedData);
        });
    });
});
```
여러개의 콜백 함수가 중첩되면, 코드가 복잡해져 작업의 흐름을 이해하기 어려울 수 있다.

이렇게 콜백 함수가 중첩되어 코드의 가독성이 떨어지고 유지보수가 어려워지는 상황을 콜백 지옥이라 부르기도 한다.

이런 문제를 해결하기 위해, 복잡한 비동기 작업에서는 콜백 함수 대신 javascript의 promise를 활용해 콜백 지옥에서 벗어날 수 있다.