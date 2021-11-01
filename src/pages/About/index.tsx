import { defineComponent, reactive } from 'vue';
import Counter from 'component/Counter';
import useStore from 'hooks/useStore';
import './index.less';

const About = defineComponent({
    setup() {
        const { state, dispatch, getters, commit } = useStore();
        const clickTest = () => {
            console.log('点击');
            // 以下方式都具备友好提示
            // commit('common/set_loading', false);
            // dispatch('common/get_data', false);
            // dispatch({
            //     type: 'common/get_data',
            //     payload: false,
            // });
            // getters['common/isLogin'];
            // commit('common/set_obj', {
            //     a: 2,
            //     b: ''
            // });
        };
        return () => (
            <div>
                about页面2 - {String(state.common.loading)}
                <div class="test" onClick={clickTest}>测试</div>
                <Counter></Counter>
            </div>
        );
    }
});
export default About;