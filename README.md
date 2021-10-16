## 웹팩이란?
웹팩이란 최신 프런트엔드 프레임워크에서 가장 많이 사용되는 모듈 번들러(Module Bundler)입니다. 모듈 번들러란 웹 애플리케이션을 구성하는 자원(HTML, CSS, Javscript, Images 등)을 모두 각각의 모듈로 보고 이를 조합해서 병합된 하나의 결과물을 만드는 도구를 의미합니다

## 모듈이란?
모듈이란 프로그래밍 관점에서 특정 기능을 갖는 작은 코드 단위를 의미합니다. 자바스크립트로 치면 아래와 같은 코드가 모듈입니다.

```javascript

// math.js
function sum(a, b) {
  return a + b;
}

function substract(a, b) {
  return a - b;
}

const pi = 3.14;

export { sum, substract, pi }
```

- 이 math.js 파일은 아래와 같이 3가지 기능을 갖고 있는 모듈입니다.

1. 두 숫자의 합을 구하는 ``sum()`` 함수
2. 두 숫자의 차를 구하는 ``subtract()`` 함수
3. 원주율 값을 갖는 ``pi`` 상수


### 웹팩에서의 모듈
웹팩에서 지칭하는 모듈이라는 개념은 위와 같이 자바스크립트 모듈에만 국한되지 않고 웹 애플리케이션을 구성하는 모든 자원을 의미합니다. 웹 애플리케이션을 제작하려면 HTML, CSS, Javascript, Images, Font 등 많은 파일들이 필요하죠. 이 파일 하나하나가 모두 모듈입니다.

## 모듈 번들링

아래 그림과 같이 웹 애플리케이션을 구성하는 몇십, 몇백개의 자원들을 하나의 파일로 병합 및 압축 해주는 동작을 모듈 번들링이라고 합니다.

![webpack-bundling e79747a1](https://user-images.githubusercontent.com/63832678/137429623-72360e6d-ae25-425d-920d-63bbeff959db.png)


## 웹팩의 등장 배경

1. 파일 단위의 자바스크립트 모듈 관리의 필요성
2. 웹 개발 작어 자동화 도구 (Web Task Manager)
3. 웹 어플리케이션의 빠른 로딩 속도와 높은 성능
(웹팩은 기본적으로 필요한 자원은 미리 로딩하는게 아니라 그 때 그 때 요청하자는 철학을 갖고 있습니다.)


## 웹팩으로 해결하려는 문제

- 자바스크립트 변수 유효 범위
  - 웹팩은 변수 유효 범위의 문제점을 ES6의 Modules 문법과 웹팩의 모듈 번들링으로 해결합니다.


- 브라우저별 HTTP 요청 숫자의 제약
  - TCP 스펙에 따라 브라우저에서 한 번에 서버로 보낼 수 있는 HTTP 요청 숫자는 제약되어 있습니다. 아래의 표는 최신 브라우저 별 최대 HTTP 요청 횟수입니다.

| 브라우저 | 최대 연결 횟수 |
| ------ | -------- |
| 익스플로러 7      | 2     |
| 익스플로러 8 ~ 9      | 6     |
| 익스플로러 10, 11      | 8, 13     |
| 크롬      | 6     |
| 사파리      | 6     |
| 파이어폭스      | 6     |
| 오페라      | 6     |
| 안드로이드, iOS      | 6     |

``
따라서, HTTP 요청 숫자를 줄이는 것이 웹 애플리케이션의 성능을 높여줄 뿐만 아니라 사용자가 사이트를 조작하는 시간을 앞당겨 줄 수 있죠.
``

``
웹팩을 이용해 여러 개의 파일을 하나로 합치면 위와 같은 브라우저별 HTTP 요청 숫자 제약을 피할 수 있습니다
``

- 사용하지 않는 코드의 관리


- Dynamic Loading & Lazy Loading 미지원
  - Require.js와 같은 라이브러리를 쓰지 않으면 동적으로 원하는 순간에 모듈을 로딩하는 것이 불가능 했습니다. 그러나 이젠 웹팩의 **Code Splitting** 기능을 이용하여 원하는 모듈을 원하는 타이밍에 로딩할 수 있습니다.


  ## Entry

  `entry` 속성은 웹팩에서 웹 자원을 변환하기 위해 필요한 최초 진입점이자 자바스크립트 파일 경로입니다.


```javascript

// webpack.config.js
module.exports = {
  entry: './src/index.js'
}
```
위 코드는 웹팩을 실행했을 때 src 폴더 밑의 index.js 을 대상으로 웹팩이 빌드를 수행하는 코드입니다.

## Entry 파일에는 어떤 내용이 들어가야 하나?

`entry` 속성에 지정된 파일에는 웹 애플리케이션의 전반적인 구조와 내용이 담겨져 있어야 합니다. 웹팩이 해당 파일을 가지고 웹 애플리케이션에서 사용되는 모듈들의 연관 관계를 이해하고 분석하기 때문에 애플리케이션을 동작시킬 수 있는 내용들이 담겨져 있어야 합니다.

예를 들어, 블로그 서비스를 웹팩으로 빌드한다고 했을 때 코드의 모양은 아래와 같을 수 있습니다.
```javascript
// index.js
import LoginView from './LoginView.js';
import HomeView from './HomeView.js';
import PostView from './PostView.js';

function initApp() {
  LoginView.init();
  HomeView.init();
  PostView.init();
}

initApp();
```

위 코드는 해당 서비스가 **싱글 페이지 애플리케이션**이라고 가정하고 작성한 코드입니다. 사용자의 **로그인 화면**, 로그인 후 진입하는 **메인 화면**, 그리고 **게시글을 작성하는 화면** 등 웹 서비스에 필요한 화면들이 모두 index.js 파일에서 불려져 사용되고 있기 때문에 웹팩을 실행하면 해당 파일들의 내용까지 해석하여 파일을 빌드해줄 것입니다.

<img width="740" alt="webpack-entry 90e26197" src="https://user-images.githubusercontent.com/63832678/137592478-53830a62-0706-461f-9563-218d75160dca.png">

- 디펜던시 그래프(dependency graph): 위 사진과 같이 모듈간의 의존 관계가 생기는 구조를 말한다.

### Entry 유형

앞에서 살펴본 것처럼 엔트리 포인트는 1개가 될 수도 있지만 아래와 같이 여러 개가 될 수도 있습니다.

```javascript
entry: {
  login: './src/LoginView.js',
  main: './src/MainView.js'
}

```

위와 같이 엔트리 포인트를 분리하는 경우는 **싱글 페이지 애플리케이션 SPA**이 아닌 특정 페이지로 진입했을 때 서버에서 해당 정보를 내려주는 형태의 **멀티 페이지 애플리케이션 MPA**에 적합합니다.


## Output
`output` 속성은 웹팩을 돌리고 난 결과물의 파일 경로를 의미
```javascript
// webpack.config.js
module.exports = {
  output: {
    filename: 'bundle.js'
  }
}
```
`entry` 속성과 다르게 **객체형태**로 옵션들을 추가해야 합니다.



## Output 속성 옵션 형태
최소한 `filename`은 지정해줘야 하며 일반적으로 아래와 같이 `path` 속성을 함께 정의합니다.

```javascript
// webpack.config.js
var path = require('path');

module.exports = {
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist')
  }
}
```

여기서 `filename` 속성은 웹팩으로 빌드한 파일의 이름을 의미하고, `path` 속성은 해당 파일의 경로를 의미합니다. 그리고 `path` 속성에서 사용된 `path.resolve()` 코드는 인자로 넘어온 경로들을 조합하여 유효한 파일 경로를 만들어주는 Node.js API입니다.

이 API가 하는 역할을 좀 더 이해하기 쉽게 표현하면 아래와 같습니다.

```javascript
output: './dist/bundle.js'
```

`path` 라이브러리 참고 : https://nodejs.org/api/path.html