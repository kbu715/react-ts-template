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
2. 웹 개발 작업 자동화 도구 (Web Task Manager)
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



## Loader

로더(Loader)는 웹팩이 웹 애플리케이션을 해석할 때 자바스크립트 파일이 아닌 웹 자원(HTML, CSS, Images, 폰트 등)들을 변환할 수 있도록 도와주는 속성입니다.

```javascript
// webpack.config.js
module.exports = {
  module: {
    rules: []
  }
}
```
엔트리나 아웃풋 속성과는 다르게 `module`라는 이름을 사용합니다.

## CSS Loader 적용하기

```sh
npm i css-loader -D
```

```javascript
// webpack.config.js
module.exports = {
  entry: './app.js',
  output: {
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['css-loader']
      }
    ]
  }
}
```

위의 module 쪽 코드를 보면 rules 배열에 객체 한 쌍을 추가했습니다. 그리고 그 객체에는 2개의 속성이 들어가 있는데 각각 아래와 같은 역할을 합니다.

- `test` : 로더를 적용할 파일 유형 (일반적으로 정규 표현식 사용)

- `use` : 해당 파일에 적용할 로더의 이름


## 자주 사용되는 로더 종류

- [Babel Loader](https://webpack.js.org/loaders/babel-loader/#root)

- [Sass Loader](https://webpack.js.org/loaders/sass-loader/#root)

- [File Loader](https://v4.webpack.js.org/loaders/file-loader/)

- [TS Loader](https://webpack.js.org/guides/typescript/#loader)

## 로더 적용 순서

특정 파일에 대해 여러 개의 로더를 사용하는 경우 로더가 적용되는 순서에 주의해야 합니다. 로더는 기본적으로 **오른쪽에서 왼쪽 순**으로 적용됩니다.


```javascript
module: {
  rules: [
    {
      test: /\.scss$/,
      use: ['css-loader', 'sass-loader']
    }
  ]
}
```

위 코드는 scss 파일에 대해 먼저 Sass 로더로 전처리(scss 파일을 css 파일로 변환)를 한 다음 웹팩에서 CSS 파일을 인식할 수 있게 CSS 로더를 적용하는 코드입니다.

만약 웹팩으로 빌드한 자원으로 실행했을 때 해당 CSS 파일이 웹 애플리케이션에 인라인 스타일 태그로 추가되는 것을 원한다면 아래와 같이 `style 로더`도 추가할 수 있습니다.

```javascript
{
  test: /\.scss$/,
  use: ['style-loader', 'css-loader', 'sass-loader']
}
```

## Plugin

플러그인(plugin)은 웹팩의 기본적인 동작에 추가적인 기능을 제공하는 속성입니다. 로더랑 비교하면 로더는 파일을 해석하고 변환하는 과정에 관여하는 반면, 플러그인은 해당 결과물의 형태를 바꾸는 역할을 한다고 보면 됩니다.

```javascript
// webpack.config.js
module.exports = {
  plugins: []
}
```

플러그인의 배열에는 생성자 함수로 생성한 객체 인스턴스만 추가될 수 있습니다. 예를들어

```javascript
// webpack.config.js
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  plugins: [
    new HtmlWebpackPlugin(),
    new webpack.ProgressPlugin()
  ]
}
```

위의 두 플러그인은 각각 아래와 같은 역할을 합니다.

- [HtmlWebpackPlugin](https://webpack.js.org/plugins/html-webpack-plugin/) : 웹팩으로 빌드한 결과물로 HTML 파일을 생성해주는 플러그인
- [ProgressPlugin](https://webpack.js.org/plugins/progress-plugin/#root) : 웹팩의 빌드 진행율을 표시해주는 플러그인

## 자주 사용하는 플러그인

- [split-chunks-plugin](https://webpack.js.org/plugins/split-chunks-plugin/)
- [clean-webpack-plugin](https://www.npmjs.com/package/clean-webpack-plugin)
- [image-webpack-loader](https://github.com/tcoopman/image-webpack-loader)
- [webpack-bundle-analyzer-plugin](https://github.com/webpack-contrib/webpack-bundle-analyzer)

## Review (정리)

![webpack-process](https://user-images.githubusercontent.com/63832678/137695385-46d6d202-a8f2-4bfb-9ed0-f57bdc4b1ebb.png)

위 도식을 보면서 지금까지 배운 내용을 종합해보겠습니다.

1. **Entry** 속성은 웹팩을 실행할 대상 파일. 진입점
2. **Output** 속성은 웹팩의 결과물에 대한 정보를 입력하는 속성. 일반적으로 filename과 path를 정의
3. **Loader** 속성은 CSS, 이미지와 같은 비 자바스크립트 파일을 웹팩이 인식할 수 있게 추가하는 속성. 로더는 오른쪽에서 왼쪽 순으로 적용
4. **Plugin** 속성은 웹팩으로 변환한 파일에 추가적인 기능을 더하고 싶을 때 사용하는 속성. 웹팩 변환 과정 전반에 대한 제어권을 갖고 있음

> 이 속성 외에도 [resolve](https://webpack.js.org/configuration/resolve/#root), [devServer](https://webpack.js.org/configuration/dev-server/#root), [devtool](https://webpack.js.org/configuration/devtool/#devtool) 속성에 대해 알고 있으면 좋습니다.

# Webpack Dev Server


웹팩 데브 서버는 웹 애플리케이션을 개발하는 과정에서 유용하게 쓰이는 도구입니다. 웹팩의 빌드 대상 파일이 변경 되었을 때 매번 웹팩 명령어를 실행하지 않아도 코드만 변경하고 저장하면 웹팩으로 빌드한 후 브라우저를 새로고침 해줍니다.

매번 명령어를 치는 시간과 브라우저를 새로 고침하는 시간 뿐만 아니라 웹팩 빌드 시간 또한 줄여주기 때문에 웹팩 기반의 웹 애플리케이션 개발에 필수로 사용됩니다.

## 웹팩 데브 서버의 특징

웹팩 데브 서버는 일반 웹팩 빌드와 다른점이 있습니다. 먼저 명령어를 보겠습니다.

```javascript
"scripts": {
  "dev": "webpack serve",
  "build": "webpack"
}
```

웹팩 데브 서버를 실행하여 웹팩 빌드를 하는 경우에는 빌드한 결과물이 파일 탐색기나 프로젝트 폴더에서 보이지 않습니다. 좀 더 구체적으로 얘기하자면 웹팩 데브 서버로 빌드한 결과물은 메모리에 저장되고 파일로 생성하지는 않기 때문에 컴퓨터 내부적으로는 접근할 수 있지만 사람이 직접 눈으로 보고 파일을 조작할 순 없습니다.

따라서, 웹팩 데브 서버는 개발할 때만 사용하다가 개발이 완료되면 웹팩 명령어를 이용해 결과물을 파일로 생성해야 합니다.

> 컴퓨터 구조 관점에서 파일 입출력보다 메모리 입출력이 더 빠르고 컴퓨터 자원이 덜 소모됩니다 😄



## 프록시(Proxy) 설정
프록시 설정은 실무에서 가장 흔하게 사용하는 속성입니다. 아래와 같이 선언합니다.

```javascript
// webpack.config.js
module.exports = {
  devServer: {
    proxy: {
      '/api': 'http://localhost:3000'
    }
  }
};
```
위와 같이 설정하고 나면 로컬 웹팩 데브 서버에서 발생하는 API 요청에 변화가 생깁니다. 그림으로 살펴보겠습니다. 먼저 프록시를 쓰지 않았을 때의 기본적인 웹팩 데브 서버와 API 서버의 통신 구조입니다.

![proxy](https://user-images.githubusercontent.com/63832678/137696011-7cc4510d-6428-4f4c-918e-4881beb0add1.png)

여기서 [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)라는 용어가 나옵니다. 이 용어는 브라우저 보안과 관계가 있는데요. 쉽게 얘기하면 다른 도메인 간에는 자바스크립트로 자원을 요청할 수 없다는 의미입니다. 위 그림에서도 서버에 로그인 관련 API 요청을 했는데 CORS 오류가 나는 걸 볼 수 있습니다.

뷰, 리액트와 같은 프런트엔드 프레임워크를 쓰면 개발 편의상 로컬에 웹팩 데브 서버를 띄워놓고 개발하는 경우가 많습니다. 이 때, 이러한 문제를 해결하기 위해서 아래와 같이 프록시 속성을 설정하면 서버에서 해당 요청을 받아줍니다.

```javascript
module.exports = {
  devServer: {
    proxy: {
      '/api': 'domain.com'
    }
  }
};
```

![proxy_setting](https://user-images.githubusercontent.com/63832678/137700172-9789e667-b0bb-4a39-b5e1-dfb5fc5b3c4e.png)


CORS가 브라우저 보안과 관련있기 때문에 브라우저에서 벗어나 서버에서 서버로 요청합니다. 실제로 브라우저에서는 `localhost:8080/api/login` 으로 요청했지만 중간에 프록시 서버의 활약으로 domain.com 서버에서는 같은 도메인(domain.com)에서 온 요청으로 인식하여 CORS 에러가 나지 않습니다.

> 위 프록시 설정은 최대한 간단히 설명하기 위해 옵션을 하나 뺐습니다. 위와 같이 도메인 이름이 IP 주소가 아니라 가상 이름(domain.com)으로 되어 있는 경우 아래 옵션을 추가해 주셔야 합니다.

```javascript
module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'domain.com',
        changeOrigin: true
      }
    }
  }
};
```


## HMR(Hot Module Replacement)
HMR은 브라우저를 새로 고치지 않아도 웹팩으로 빌드한 결과물이 웹 애플리케이션에 실시간으로 반영될 수 있게 도와주는 설정입니다. 브라우저 새로 고침을 위한 LiveReload 대신에 사용할 수 있으며 웹팩 데브 서버와 함께 사용할 수도 있습니다.

## HMR 설정하기

리액트, 앵귤러, 뷰와 같이 대부분의 프레임워크에서 이미 HMR을 사용할 수 있는 로더들을 지원하고 있지만 만약 개별적으로 설정하고 싶다면 아래와 같은 방식으로 설정할 수 있습니다.

```javascript
module.exports = {
  devServer: {
    hot: true
  }
}
```
데브 서버에 옵션으로 hot:true를 추가하고 자바스크립트나 CSS 스타일시트를 변경하면 해당 모듈이 바로 업데이트가 됩니다. 그리고 화면에서는 브라우저가 다시 로딩되지 않고도 변경된 내용을 확인할 수 있습니다.


## Source Map

소스 맵(Source Map)이란 배포용으로 빌드한 파일과 원본 파일을 서로 연결시켜주는 기능입니다. 보통 서버에 배포를 할 때 성능 최적화를 위해 HTML, CSS, JS와 같은 웹 자원들을 압축합니다. 그런데 만약 압축하여 배포한 파일에서 에러가 난다면 어떻게 디버깅을 할 수 있을까요?

정답은 바로 소스 맵을 이용해 배포용 파일의 특정 부분이 원본 소스의 어떤 부분인지 확인하는 것입니다. 이러한 편의성을 제공하는 것이 소스 맵입니다.

웹팩에서 소스 맵을 설정하는 방법은 아래와 같습니다.


```javascript
// webpack.config.js
module.exports = {
  devtool: 'cheap-eval-source-map'
}
```

`devtool` 속성을 추가하고 소스 맵 설정 옵션 중 하나를 선택해 지정해주면 됩니다.

위에서 정의한 소스 맵 설정 옵션 이외에도 많은 옵션들이 있습니다. 자세한 옵션 속성과 비교는 다음 링크로 확인하세요.

[소스맵 설정 옵션 비교표](https://webpack.js.org/configuration/devtool/#devtool)


## 웹팩 실행 모드 - mode

```javascript
module.exports = {
  mode: 'none',
  entry: '',
  // ...
}
```

웹팩 설정을 정의할 때 위와 같이 mode라는 속성을 정의하면 웹팩의 실행 모드가 설정됩니다. 웹팩의 실행 모드에는 다음 3가지가 있습니다.

- `none` : 모드 설정 안함
- `development` : 개발 모드
- `production` : 배포 모드

각 실행 모드에 따라 웹팩의 결과물 모습이 달라집니다. 개발 모드인 경우에는 개발자들이 좀 더 보기 편하게 웹팩 로그나 결과물이 보여지고, 배포 모드인 경우에는 성능 최적화를 위해 기본적인 파일 압축 등의 빌드 과정이 추가됩니다.

> 모드의 기본 값을 설정하지 않으면 `production` 모드로 자동 설정됩니다.


## 실행 모드에 따라 웹팩 설정 달리하기

웹팩으로 실제 웹 애플리케이션을 개발할 때는 보통 아래와 같이 2가지 케이스로 구분하여 작업해야 합니다.

- 개발할 때 사용할 웹팩 설정
- 개발이 끝나고 배포할 때 사용할 웹팩 설정

웹팩 설정 파일이 1개인 상태에서 실행 모드에 따라 특정 설정을 적용하는 방법은 다음과 같습니다.

```javascript
// webpack.config.js
module.exports = (env) => {
  let entryPath = env.mode === 'production'
    ? './public/index.js'
    : './src/index.js';

  return {
    entry: entryPath,
    output: {},
    // ...
  }
}
```

```json
// package.json
{
  "build": "webpack",
  "development": "npm run build -- --env.mode=development",
  "production": "npm run build -- --env.mode=production"
}
```

위 코드를 보면 먼저 웹팩 설정 파일의 방식은 객체에서 함수 형식으로 바뀌었습니다.

```javascript
// 기존
module.exports = {};
// 현재
module.exports = () => {};
```

그리고 함수에 넘겨준 env 인자는 환경 변수를 의미하며 웹팩을 실행할 때 실행 옵션으로 넘겨줄 수 있습니다.

```sh
webpack --env.a=10
```

## Webpack Merge

웹팩 머지는 단어 그대로 여러 개의 웹팩 설정 파일을 하나로 병합해주는 라이브러리입니다. 실행 모드에 따라 웹팩 설정하기에서도 언급했지만 일반적으로 웹 애플리케이션을 제작할 떄는 웹팩 설정을 개발(Development)용과 배포(Production)용으로 나누어 적용합니다.

앞에서 배운 것처럼 실행 모드에 따라 조건 문으로 설정을 구분할 수 있으나 실제로 파일을 아예 나눠놓는 게 더 권장하는 방식입니다. 웹팩 머지는 이러한 상황에서 더 빛을 발휘할 수 있습니다.

## 웹팩 설정 파일 구분 전략

웹팩 머지를 효율적으로 사용하는 방법은 개발용과 배포용 설정 파일에서 공통으로 쓰이는 부분을 먼저 분리하는 것입니다. 파일 체계는 아래와 같은 형식으로 구성합니다.


- webpack.common.js
- webpack.dev.js
- webpack.prod.js

각 파일의 모습은 이렇습니다.

```javascript
// webpack.common.js
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js'
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin(),
  ],
}
```
공통 설정 파일에는 **엔트리**, **아웃풋**, **플러그인**과 같이 실행 모드에 관계 없이 항상 들어가야 하는 코드를 추가합니다.

```javascript
// webpack.dev.js
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: { contentBase: './dist' }
});
```

개발용 설정 파일에는 개발자 도구나 웹팩 데브 서버와 같은 설정을 추가합니다. 그리고 webpack-merge 라이브러리를 설치 및 로딩하고 나서 웹팩 공통 설정 파일인 webpack.common.js 파일을 로딩해서 같이 병합해줍니다.

```javascript
// webpack.prod.js
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production'
});
```

배포용 설정 파일에는 배포하기 전 웹 리소스 최적화를 위한 설정들을 추가해줍니다.


> 참고사이트

- [webpack-merge 깃헙 repo](https://github.com/survivejs/webpack-merge)
- [배포를 위한 웹팩 설정 가이드](https://webpack.js.org/guides/production/)