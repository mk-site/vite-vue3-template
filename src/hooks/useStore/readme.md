### 用法

1、访问state, dispatch, getters, commit均有提示
2、封装的useStore 集成自vuex的useStore

```jsx
import useStore from 'hooks/useStore';

const { state, dispatch, getters, commit } = useStore();
```