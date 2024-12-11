---
title: CSS의 계단식(Cascade) 구조와 !important
date: 2024-11-24 22:00:00 +0900
categories: [CSS]
tags: [css, cascade]     # TAG names should always be lowercase
description: 우선 순위와 !important의 역할
---

## 계단식(Cascade) 구조 

CSS는 Cascading Style Sheet의 약자로, CSS를 이해하는 데 있어 계단식 구조를 이해할 필요가 있다. 기존의 CSS 파일을 내가 원하는 형태로 다시 작성하거나 부모 요소에게서 상속을 받을 때, 동일한 요소에 2가지 이상의 규칙이 중복되어 적용될 때가 있다.

```css
h1 {
    background-color: pink;
}

h1 {
    background-color: blue;
}
```

이러한 경우에, CSS는 다음과 같은 계단식의 알고리즘에 따라 어떤 규칙을 적용할 지를 결정한다. 

(우선 순위 기준 내림차순, 밑으로 갈수록 우선 순위는 낮아짐)
1. Relevance
2. Origin & Importance
3. Cascade Layer
4. Selector Specificity
5. Order of Appearance

## Relevance
CSS는 가장 먼저 모든 규칙들을 필터링해, 적절한 미디어 규칙(`@media`)에 속하는 규칙을 찾아낸다.

```css
@media screen {
    h1 {
        color: red;
    }
}

@media print {
    h1 {
        color: blue;
    }
}
```

인쇄하는 상황이 아니므로, `@media print`는 무시되고 h1의 색깔은 `red`가 된다.
   
## Origin & Importance
CSS에는 3개의 기본적인 Origin이 존재한다. <br>

(우선 순위 기준 내림차순, 밑으로 갈수록 우선순위는 낮아짐)
1. author (웹 개발자)
2. user
3. user-agent (브라우저)  

기본적으로는 브라우저가 가장 낮은 우선순위를 가지고, 그 위에는 유저, 그리고 웹 개발자가 가장 높은 우선순위를 가지게 된다. 하지만 몇몇 경우에 브라우저와 유저는 웹 개발자보다 우선해서 자신의 변경사항을 적용할 필요가 있고, 이때 `!important`가 그러한 역할을 수행한다. <br>

`!important`를 사용하면 단순히 우선순위가 높아진다고 생각할 수 있지만, 사실은 그렇지 않다. `!important`는 기존의 계단식 구조를 거꾸로 뒤집는 역할을 수행한다. 따라서 `!important`가 존재하는 상황에서의 우선순위는 다음과 같다.

(우선 순위 기준 내림차순)
1. `!important` user-agent
2. `!important` user
3. `!important` author
4. author
5. user
6. user-agent

`!important`를 사용해서 브라우저는 몇몇의 중요한 규칙들을 웹 개발자가 변경할 수 없도록 설정하고, 유저는 인터페이스 설정과 같은 자신의 커스텀 스타일을 웹 개발자가 변경할 수 없도록 설정할 수 있다.

## Cascade Layer
`@layer`는 여러 스타일을 담아두고, 레이어 간의 우선순위를 설정하는 데 사용한다. 먼저 선언된 layer가 낮은 우선순위를 가지고, 나중에 선언될 수록 높은 우선순위를 가진다.

```css
@layer firstLayer, secondLayer; /* 레이어 선언 */

h1 {
    color: red;
    font-size: 10px !important;
}

@layer firstLayer {
    h1 {
        color: blue;
        font-size: 5px !important;
    }
}

@layer secondLayer {
    h1 {
        color: green;
        font-size: 15px !important;
    }
}
```

이때 레이어의 우선순위는 일반 스타일, `secondLayer`, `firstLayer` 순으로 적용되고, 우선순위에 따라 `h1`의 색은 `red`가 적용된다. <br>
`!important`는 이때도 같은 역할을 수행한다. 따라서 `!important`가 포함된 레이어의 우선순위는 다음과 같다.
1. `!important firstLayer`
2. `!important secondLayer`
3. `!important` 일반 스타일
4. 일반 스타일
5. `secondLayer`
6. `firstLayer`

따라서 `h1`의 폰트 사이즈는 `5px`이 적용된다.

## Selector Specificity
선택자가 더 구체적일 수록, 우선순위는 높아진다. 선택자의 구체성은 4개의 단위를 사용하여 측정되는데, 이는 각각 1, 10, 100, 1000의 자릿수로 이해할 수 있다. 

- Thousands: 선언이 style 속성 안에 있다면, 우선순위는 1000이 된다.
- Hundreds: ID 선택자의 개수에 따라 100점을 얻는다.
- Tens: Class, pseudo-class, 속성 선택자의 개수에 따라 10점을 얻는다.
- Ones: 요소 선택자, 선택자 내에 포함된 pseudo-element의 개수에 따라 1점을 얻는다.

<table>
    <thead>
        <tr>
            <th> 선택자 </th>
            <th> Thousands </th>
            <th> Hundreds </th>
            <th> Tens </th>
            <th> Ones </th>
            <th> Specificity </th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td> <code>h1</code> </td>
            <td> 0 </td>
            <td> 0 </td>
            <td> 0 </td>
            <td> 1 </td>
            <td> 0001 </td>
        </tr>
        <tr>
            <td> <code>h1 + h1::after</code> </td>
            <td> 0 </td>
            <td> 0 </td>
            <td> 0 </td>
            <td> 3 </td>
            <td> 0003 </td>
        </tr>
        <tr>
            <td> <code>.class1:hover p</code> </td>
            <td> 0 </td>
            <td> 0 </td>
            <td> 2 </td>
            <td> 1 </td>
            <td> 0021 </td>
        </tr>
        <tr>
            <td> <code>#ID1 .class1[data-archive="True"]</code> </td>
            <td> 0 </td>
            <td> 1 </td>
            <td> 2 </td>
            <td> 0 </td>
            <td> 0120 </td>
        </tr>
    </tbody>
</table>


## Order of Appearance
나중에 등장하는 규칙이 더 높은 우선순위를 갖는다.

```CSS
h1 {
    background-color: red;
}

h1 {
    background-color: blue;
}
```

나중에 등장한 규칙이 적용되어, h1의 배경색은 `blue`가 된다.

## Example
```html
<h1 id="specificityID"> This is the heading. </h1>
```

```css
@layer firstLayer, secondLayer;

h1 {
    color: red;
    background-color: blue !important;
    border-style: dotted !important;
    border-width: 10px !important;
    font-size: 5px;
}

h1#specificityID {
    color: blue;
    background-color: green !important;
    border: 5px solid black;
    font-size: 10px !important;
}

@layer firstLayer {
    #specificityID {
        color: white;
        background-color: pink !important;
        border: 5px dashed gray;
        font-size: 15px;
    }
}

@layer secondLayer {
    h1#specificityID {
        color: hotpink;
        background-color: aqua !important;
        border-width: 3px !important;
        font-size: 1em !important; 
    }
}
```

레이어에서의 우선순위는 일반 스타일(unlayered) -> secondLayer -> firstLayer 순이고, 레이어가 동일할 때는 선택자의 명시도(specificity)에 따라 우선순위가 결정된다. `h1`의 명시도는 0-0-0-1이고, `h1#specificityID`의 명시도는 0-1-0-1이다. <br>

따라서 해당 예시에서의 우선순위는 다음과 같다.
1. `!important firstLayer`
2. `!important secondLayer`
3. `!important h1`
4. `!important h1#specificityID`
5. `h1#specificityID`
6. `h1`
7. `secondLayer`
8. `firstLayer`

출력 결과는 다음과 같다.
<table>
    <thead> 
        <tr>
            <th> 속성 </th>
            <th> 값 </th>
            <th> 선택자 </th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td> color </td>
            <td> blue </td>
            <td><code> h1#specificityID </code></td>
        </tr>
        <tr>
            <td>background-color</td>
            <td>pink</td>
            <td><code>firstLayer</code></td>
        </tr>
        <tr>
            <td>border-width</td>
            <td>3px</td>
            <td><code>secondLayer</code></td>
        </tr>
        <tr>
            <td>border-style</td>
            <td>dotted</td>
            <td><code>h1</code></td>
        </tr>
        <tr>
            <td>border-color</td>
            <td>black</td>
            <td><code>h1#specificityId</code></td>
        </tr>
        <tr>
            <td>font-size</td>
            <td>1em</td>
            <td><code>secondLayer</code></td>
        </tr>
    </tbody>
</table>

![결과 이미지](./assets/img/post/post2/css-result.PNG "출력")

## 참고
<https://css-tricks.com/css-cascade-layers/#aa-important-context>
<https://developer.mozilla.org/ko/docs/Learn/CSS/Building_blocks/Cascade_and_inheritance>