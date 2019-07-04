### 타입 호환성

```typescript
// y가 적어도 x와 같은 멤버를 가지고 있다면 x는 y와 호환된다.
interface Named {
  name: string
}

let x: Named
// y의 추론된 타입은 { name: string; location: string }
let y = { name: "Alice", location: "Seattle" }
x = y

function greet(n: Named) {
  alert("Hello, " + n.name)
}
greet(y)

// 두 함수 비교
let x = (a: number) => 0
let y = (b: number, s: string) => 0

y = x // 좋아요
x = y // 오류
// x가 y에 할당될 수 있는지 

let x = () => ({ name: "Alice" })
let y = () => ({ name: "Alice", location: "Seattle" })
x = y // 좋아요
y = x // x에 location 프로퍼티가 없기 때문에 오류
```
