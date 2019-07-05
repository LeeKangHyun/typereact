### 선언 병합

#### 기본 개념

| 선언 타입 | 네임스페이스 | 타입 | 값 |
| --- |: --- :|: --- :|: --- :|
| 네임 스페이스 | X |  | X |
| 클래스 |  | X | X |
| 열거형 |  | X | X |
| 인터페이스 |  | X |  |
| 타입 별칭 |  | X |  |
| 함수 |  |  | X |
| 변수 |  |  | X |

```typescript
/*
* 가장 일반적인 선언 병합
* 같은 이름의 단일 인터페이스에 Merge 한다
* member 는 고유해야 한다. 만약, 다르다면 같은 타입이어야 한다.
*/ 
interface Box {
  height: number
  width: number
}

interface Box {
  scale: number
}

let box: Box = { height: 5, width: 6, scale: 10 }

/*
* 함수 멤버의 경우는 후에 오는 인터페이스가 우선순위가 더 높다
* 각 그룹의 요소는 같은 순서를 유지하지만 그룹 자체는 나중에 오버로드가 발생한 것이 가장 먼저 병합된다.
*/
type Animal = {}
type Sheep = {}
type Dog = {}
type Cat = {}
interface Cloner {
  clone(animal: Animal): Animal
}

interface Cloner {
  clone(animal: Sheep): Sheep
}

interface Cloner {
  new (name: string)
  clone(animal: Dog): Dog
  clone(animal: Cat): Cat
}

/*
* Specialized Signatures
*/
interface Document {
  createElement(tagName: any): Element
}

interface Document {
  createElement(tagName: "div"): HTMLDivElement
  createElement(tagName: "span"): HTMLSpanElement
}

interface Document {
  createElement(tagName: string): HTMLElement
  createElement(tagName: "canvas"): HTMLCanvasElement
}

// 타입이 단일 문자열 리터럴인 매개 변수가 있는 경우 병합된 오버로드 목록의 맨위로 버블링 된다.
interface Document {
  createElement(tagName: "canvas"): HTMLCanvasElement
  createElement(tagName: "div"): HTMLDivElement
  createElement(tagName: "span"): HTMLSpanElement
  createElement(tagName: string): HTMLElement
  createElement(tagName: any): Element
}

/*
* 네임스페이스 병합
* 지정된 이름의 네임스페이스가 이미 있는 경우 기존 네임스페이스를 가져와
* 두 번째 네임스페이스의 내보낸 멤버를 첫 번째 네임스페이스에 추가
*/
namespace Animals {
  export class Zebra {}
}

namespace Animals {
  export interface Legged { numberOfLegs: number }
  export class Dog {}
}

// 
namespace Animals {
  export interface Legged { numberOfLegs: number }
  
  export class Zebra {}
  export class Dog {}
}

// non-exported 예제
namespace Animal {
  let haveMuscles = true
  
  export function animalsHaveMuscles() {
    return haveMuscles
  }
}

namespace Animal {
  export function doAnimalsHaveMuscles() {
    return haveMuscles // Error
  }
}

// Merging Namespaces with Classes
class Album {
  label: Album.AlbumLabel
}

namespace Album {
  export class AlbumLabel {
    
  }
}

function buildLabel(name: string): string {
  return buildLabel.prefix + name + buildLabel.suffix
}

namespace buildLabel {
  export let suffix = ''
  export let prefix = 'Hello'
}

enum Color {
  red = 1,
  green = 2,
  blue = 4
}

namespace Color {
  export function mixColor(colorName: string) {
    if (colorName === 'yellow') {
      return Color.red + Color.green
    } else if (colorName === 'white') {
      return Color.red + Color.green + Color.blue
    } else if (colorName === 'magenta') {
      return Color.red + Color.blue
    } else if (colorName === 'cyan') {
      return Color.green + Color.blue
    }
  }
}
```
